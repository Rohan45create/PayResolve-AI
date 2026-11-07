package com.payresolve.cases;

import com.payresolve.cases.dto.CaseDetailsDto;
import com.payresolve.cases.dto.CaseDto;
import com.payresolve.cases.dto.PagedResponse;
import com.payresolve.common.Money;
import com.payresolve.shop.ShopOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service orchestrating case lifecycle management, persistence, retrieval, and demo seeding.
 */
@Service
public class CaseService {

    private static final Logger log = LoggerFactory.getLogger(CaseService.class);

    private final CaseRepository caseRepository;
    private final ShopOrderService shopOrderService;
    private final Clock clock;
    private final AtomicInteger dynamicIdSequence = new AtomicInteger(150);

    public CaseService(CaseRepository caseRepository, ShopOrderService shopOrderService, Clock clock) {
        this.caseRepository = caseRepository;
        this.shopOrderService = shopOrderService;
        this.clock = clock;
    }

    /**
     * Upserts a case from a detector finding.
     * Enforces the invariant: Exactly one case per (type, paypalOrderId); reruns update rather than duplicate.
     *
     * @param finding discrepancy finding from pure detector
     * @return persisted or updated CaseRecord
     */
    @Transactional
    public CaseRecord upsertCase(DetectionFinding finding) {
        String paypalOrderId = finding.paypalOrderId();
        if (paypalOrderId == null || paypalOrderId.isBlank()) {
            paypalOrderId = finding.shopOrderId() != null ? finding.shopOrderId() : "PP-UNKNOWN";
        }

        Optional<CaseRecord> existingOpt = caseRepository.findByTypeAndPaypalOrderId(finding.type(), paypalOrderId);
        Instant now = clock.instant();

        Long amountMinor = null;
        String currency = "USD";
        if (finding.discrepancyAmount() != null) {
            amountMinor = finding.discrepancyAmount().amountMinor();
            currency = finding.discrepancyAmount().currency();
        } else if (finding.orderAmount() != null) {
            amountMinor = finding.orderAmount().amountMinor();
            currency = finding.orderAmount().currency();
        }

        if (existingOpt.isPresent()) {
            CaseRecord existing = existingOpt.get();
            log.info("Rerun update for existing case: id={}, type={}, order={}",
                existing.id(), existing.type(), paypalOrderId);

            CaseRecord updated = new CaseRecord(
                existing.id(),
                existing.type(),
                existing.status(), // Keep existing lifecycle status
                finding.severity(),
                paypalOrderId,
                finding.shopOrderId() != null ? finding.shopOrderId() : existing.shopOrderId(),
                amountMinor != null ? amountMinor : existing.amountMinor(),
                currency,
                existing.openedAt(),
                now,
                existing.resolvedAt(),
                finding.summary()
            );

            caseRepository.update(updated);
            return updated;
        } else {
            String newId = generateNextCaseId();
            CaseRecord newCase = new CaseRecord(
                newId,
                finding.type(),
                CaseStatus.OPEN,
                finding.severity(),
                paypalOrderId,
                finding.shopOrderId(),
                amountMinor,
                currency,
                now,
                now,
                null,
                finding.summary()
            );

            caseRepository.insert(newCase);
            return newCase;
        }
    }

    public CaseRecord getCaseRecordById(String id) {
        return caseRepository.findById(id)
            .orElseThrow(() -> new com.payresolve.common.ResourceNotFoundException("Case not found: " + id));
    }

    public CaseDetailsDto getCaseDetailsById(String id) {
        CaseRecord record = getCaseRecordById(id);
        return CaseDetailsDto.fromRecord(record);
    }

    public PagedResponse<CaseDto> getCases(String status, String severity, String type, String search, int page, int size) {
        int offset = page * size;
        List<CaseRecord> records = caseRepository.findAll(status, severity, type, search, size, offset);
        long total = caseRepository.countAll(status, severity, type, search);

        Instant now = clock.instant();
        List<CaseDto> dtos = records.stream()
            .map(r -> CaseDto.fromRecord(r, now))
            .toList();

        return PagedResponse.of(dtos, page, size, total);
    }

    @Transactional
    public CaseDetailsDto updateCaseStatus(String id, CaseStatus newStatus) {
        CaseRecord existing = getCaseRecordById(id);
        Instant resolvedAt = newStatus.isTerminal() ? clock.instant() : null;

        caseRepository.updateStatus(id, newStatus, resolvedAt);
        log.info("Transitioned case {} status from {} to {}", id, existing.status(), newStatus);

        CaseRecord updated = getCaseRecordById(id);
        return CaseDetailsDto.fromRecord(updated);
    }

    /**
     * Seeds demo cases covering all 5 case types (PAID_NOT_MARKED, AMOUNT_MISMATCH,
     * DUPLICATE_EVENT, REFUND_MISMATCH, ORPHAN_CAPTURE).
     */
    @Transactional
    public List<CaseDto> seedDemoCases() {
        log.info("Seeding canonical demo cases matching frontend exception queue");
        Instant now = clock.instant();

        // Ensure prerequisite shop orders exist so foreign keys resolve cleanly
        ensurePrerequisiteShopOrder("ORD-10482", "PP-10482", Money.of(8450, "USD"), "AWAITING_CONFIRMATION", "Sarah Jenkins");
        ensurePrerequisiteShopOrder("ORD-10479", "PP-10479", Money.of(7950, "USD"), "PAID", "Michael Brown");
        ensurePrerequisiteShopOrder("ORD-10477", "PP-10477", Money.of(3200, "USD"), "PAID", "Emma Davis");
        ensurePrerequisiteShopOrder("ORD-10470", "PP-10470", Money.of(1800, "USD"), "PAID", "Lucas Miller");
        ensurePrerequisiteShopOrder("ORD-10466", "PP-10466", Money.of(5620, "USD"), "PAID", "Olivia Wilson");

        List<CaseRecord> seedSpecs = List.of(
            new CaseRecord(
                "PR-0142",
                CaseType.PAID_NOT_MARKED,
                CaseStatus.OPEN,
                CaseSeverity.HIGH,
                "PP-10482",
                "ORD-10482",
                8450L,
                "USD",
                now.minusSeconds(240), // 4 min ago
                now.minusSeconds(240),
                null,
                "Customer says paid. PayPal capture completed but merchant order ORD-10482 remains AWAITING_CONFIRMATION."
            ),
            new CaseRecord(
                "PR-0141",
                CaseType.AMOUNT_MISMATCH,
                CaseStatus.INVESTIGATING,
                CaseSeverity.HIGH,
                "PP-10479",
                "ORD-10479",
                8450L,
                "USD",
                now.minusSeconds(720), // 12 min ago
                now.minusSeconds(720),
                null,
                "Captured amount mismatch: shop order total is $79.50, but PayPal captured $84.50 ($5.00 discrepancy)."
            ),
            new CaseRecord(
                "PR-0140",
                CaseType.DUPLICATE_EVENT,
                CaseStatus.ACTION_PROPOSED,
                CaseSeverity.MEDIUM,
                "PP-10477",
                "ORD-10477",
                3200L,
                "USD",
                now.minusSeconds(1260), // 21 min ago
                now.minusSeconds(1260),
                null,
                "Duplicate delivery detected: webhook event WH-EVT-DUP-40 was delivered 2 times for order ORD-10477."
            ),
            new CaseRecord(
                "PR-0138",
                CaseType.REFUND_MISMATCH,
                CaseStatus.OPEN,
                CaseSeverity.MEDIUM,
                "PP-10470",
                "ORD-10470",
                1800L,
                "USD",
                now.minusSeconds(2280), // 38 min ago
                now.minusSeconds(2280),
                null,
                "PayPal shows refund REF-1800, but merchant shop has no record of refund for order ORD-10470."
            ),
            new CaseRecord(
                "PR-0137",
                CaseType.ORPHAN_CAPTURE,
                CaseStatus.OPEN,
                CaseSeverity.MEDIUM,
                "CAP-ORPHAN-0137",
                null,
                12000L,
                "USD",
                now.minusSeconds(3600), // 1 h ago
                now.minusSeconds(3600),
                null,
                "Orphan capture: PayPal capture CAP-ORPHAN-0137 ($120.00) has no matching merchant shop order."
            ),
            new CaseRecord(
                "PR-0135",
                CaseType.PAID_NOT_MARKED,
                CaseStatus.RESOLVED,
                CaseSeverity.LOW,
                "PP-10466",
                "ORD-10466",
                5620L,
                "USD",
                now.minusSeconds(7200), // 2 h ago
                now.minusSeconds(7200),
                now.minusSeconds(3600),
                "PayPal capture reconciled and shop order ORD-10466 synced to PAID."
            )
        );

        List<CaseDto> result = new ArrayList<>();
        for (CaseRecord spec : seedSpecs) {
            Optional<CaseRecord> existing = caseRepository.findById(spec.id());
            if (existing.isPresent()) {
                caseRepository.update(spec);
            } else {
                caseRepository.insert(spec);
            }
            result.add(CaseDto.fromRecord(spec, now));
        }

        return result;
    }

    private void ensurePrerequisiteShopOrder(String id, String paypalOrderId, Money total, String status, String customer) {
        if (shopOrderService.findOrderById(id).isEmpty()) {
            shopOrderService.createOrder(id, paypalOrderId, total, customer);
        }
    }

    private synchronized String generateNextCaseId() {
        return String.format("PR-%04d", dynamicIdSequence.getAndIncrement());
    }
}
