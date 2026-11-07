package com.payresolve.ingest;

import java.time.Instant;

/**
 * Domain entity representing an ingested PayPal webhook event in the durable event inbox.
 */
public record WebhookEvent(
    Long id,
    String paypalEventId,
    String eventType,
    String resourceId,
    String rawBody,
    String headersJson,
    boolean verified,
    String status,
    int attempts,
    Instant receivedAt,
    Instant processedAt,
    String lastError
) {
    public boolean isPending() {
        return "PENDING".equalsIgnoreCase(status);
    }

    public boolean isProcessed() {
        return "PROCESSED".equalsIgnoreCase(status);
    }

    public boolean isFailed() {
        return "FAILED".equalsIgnoreCase(status);
    }
}
