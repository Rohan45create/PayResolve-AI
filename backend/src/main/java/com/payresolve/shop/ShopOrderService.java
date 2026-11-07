package com.payresolve.shop;

import com.payresolve.common.Money;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

/**
 * Service managing shop orders, payment recording, and idempotent state transitions.
 */
@Service
public class ShopOrderService {

    private static final Logger log = LoggerFactory.getLogger(ShopOrderService.class);

    private final JdbcClient jdbcClient;
    private final Clock clock;

    public ShopOrderService(JdbcClient jdbcClient, Clock clock) {
        this.jdbcClient = jdbcClient;
        this.clock = clock;
    }

    public Optional<ShopOrder> findOrderById(String id) {
        Objects.requireNonNull(id, "Order id must not be null");
        return jdbcClient.sql("""
            SELECT id, paypal_order_id, status, total_minor, currency, customer_label, created_at, updated_at
            FROM shop_orders
            WHERE id = :id
            """)
            .param("id", id)
            .query((rs, rowNum) -> new ShopOrder(
                rs.getString("id"),
                rs.getString("paypal_order_id"),
                rs.getString("status"),
                rs.getLong("total_minor"),
                rs.getString("currency"),
                rs.getString("customer_label"),
                rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toInstant() : null,
                rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toInstant() : null
            ))
            .optional();
    }

    public Optional<PaymentRecord> findPaymentByCaptureId(String captureId) {
        Objects.requireNonNull(captureId, "captureId must not be null");
        return jdbcClient.sql("""
            SELECT id, shop_order_id, paypal_capture_id, amount_minor, currency, status, captured_at
            FROM payments
            WHERE paypal_capture_id = :captureId OR id = :captureId
            """)
            .param("captureId", captureId)
            .query((rs, rowNum) -> new PaymentRecord(
                rs.getString("id"),
                rs.getString("shop_order_id"),
                rs.getString("paypal_capture_id"),
                rs.getLong("amount_minor"),
                rs.getString("currency"),
                rs.getString("status"),
                rs.getTimestamp("captured_at") != null ? rs.getTimestamp("captured_at").toInstant() : null
            ))
            .optional();
    }

    @Transactional
    public void createOrder(String id, String paypalOrderId, Money total, String customerLabel) {
        Instant now = clock.instant();
        jdbcClient.sql("""
            INSERT INTO shop_orders (id, paypal_order_id, status, total_minor, currency, customer_label, created_at, updated_at)
            VALUES (:id, :paypalOrderId, 'PENDING', :totalMinor, :currency, :customerLabel, :createdAt, :updatedAt)
            """)
            .param("id", id)
            .param("paypalOrderId", paypalOrderId)
            .param("totalMinor", total.amountMinor())
            .param("currency", total.currency())
            .param("customerLabel", customerLabel)
            .param("createdAt", java.sql.Timestamp.from(now))
            .param("updatedAt", java.sql.Timestamp.from(now))
            .update();
    }

    /**
     * Applies a completed payment capture to the merchant order idempotently.
     * Guarded by state checks and a unique capture effect check.
     *
     * @return true if the business effect was applied, false if already applied (idempotent no-op).
     */
    @Transactional
    public boolean applyPaymentCapture(String shopOrderId, String captureId, Money amount) {
        Objects.requireNonNull(captureId, "captureId must not be null");
        Objects.requireNonNull(amount, "amount must not be null");

        // Idempotency check 1: Payment with this capture ID already recorded
        if (findPaymentByCaptureId(captureId).isPresent()) {
            log.info("Payment capture {} already recorded. Idempotent no-op.", captureId);
            return false;
        }

        Instant now = clock.instant();
        Optional<ShopOrder> orderOpt = shopOrderId != null ? findOrderById(shopOrderId) : Optional.empty();

        // Idempotency check 2: Order already marked PAID
        if (orderOpt.isPresent() && orderOpt.get().isPaid()) {
            log.info("Shop order {} already in PAID status. Idempotent no-op.", shopOrderId);
            return false;
        }

        String targetOrderId = orderOpt.map(ShopOrder::id).orElse(null);

        // Update shop order status if order exists
        if (targetOrderId != null) {
            int updated = jdbcClient.sql("""
                UPDATE shop_orders
                SET status = 'PAID', updated_at = :now
                WHERE id = :id AND status != 'PAID'
                """)
                .param("now", java.sql.Timestamp.from(now))
                .param("id", targetOrderId)
                .update();

            log.info("Updated shop order {} to PAID (rows affected: {})", targetOrderId, updated);
        } else {
            log.warn("Recording orphan capture {} without matching shop order (shopOrderId={})",
                captureId, shopOrderId);
        }

        // Insert payment record
        jdbcClient.sql("""
            INSERT INTO payments (id, shop_order_id, paypal_capture_id, amount_minor, currency, status, captured_at)
            VALUES (:id, :shopOrderId, :captureId, :amountMinor, :currency, 'COMPLETED', :capturedAt)
            """)
            .param("id", captureId)
            .param("shopOrderId", targetOrderId)
            .param("captureId", captureId)
            .param("amountMinor", amount.amountMinor())
            .param("currency", amount.currency())
            .param("capturedAt", java.sql.Timestamp.from(now))
            .update();

        log.info("Recorded payment capture {} for shopOrderId={} amount={}", captureId, targetOrderId, amount);
        return true;
    }
}
