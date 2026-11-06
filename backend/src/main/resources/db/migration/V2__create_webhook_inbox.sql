-- V2: Webhook Inbox for raw PayPal event ingestion with deduplication
CREATE TABLE IF NOT EXISTS webhook_events (
    id BIGSERIAL PRIMARY KEY,
    event_id VARCHAR(100) UNIQUE NOT NULL,       -- e.g., WH-..., evt-8841
    event_type VARCHAR(100) NOT NULL,            -- e.g., PAYMENT.CAPTURE.COMPLETED
    resource_type VARCHAR(50),                   -- e.g., capture, refund, order
    resource_id VARCHAR(100),                    -- e.g., 8XK, 4TM
    signature_status VARCHAR(20) NOT NULL DEFAULT 'UNVERIFIED', -- VERIFIED, UNVERIFIED, FAILED
    status VARCHAR(30) NOT NULL DEFAULT 'RECEIVED',             -- RECEIVED, PROCESSED, FAILED, DUPLICATE
    tries INT NOT NULL DEFAULT 0,
    raw_payload JSONB NOT NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_webhook_events_event_id ON webhook_events(event_id);
CREATE INDEX idx_webhook_events_status ON webhook_events(status);
CREATE INDEX idx_webhook_events_received_at ON webhook_events(received_at DESC);
