package com.payresolve.shop.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.payresolve.shop.ShopOrder;

import java.time.Instant;

/**
 * Presentation DTO for merchant shop orders.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record ShopOrderDto(
    String id,
    String paypalOrderId,
    String status,
    long totalMinor,
    String currency,
    double total,
    String customerLabel,
    Instant createdAt,
    Instant updatedAt
) {
    public static ShopOrderDto from(ShopOrder order) {
        return new ShopOrderDto(
            order.id(),
            order.paypalOrderId(),
            order.status(),
            order.totalMinor(),
            order.currency(),
            order.total().asMajorUnits(),
            order.customerLabel(),
            order.createdAt(),
            order.updatedAt()
        );
    }
}
