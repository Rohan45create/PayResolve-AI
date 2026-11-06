-- V4: Cases, Proposed Actions, and Append-Only Audit Log
CREATE TABLE IF NOT EXISTS cases (
    id VARCHAR(50) PRIMARY KEY,                    -- e.g., PR-0142
    case_type VARCHAR(100) NOT NULL,               -- e.g., PAID_NOT_MARKED, AMOUNT_MISMATCH, DUPLICATE_EVENT
    order_number VARCHAR(50) REFERENCES shop_orders(order_number) ON DELETE SET NULL,
    paypal_order_id VARCHAR(100),
    amount_display VARCHAR(50) NOT NULL,           -- e.g., $84.50, $84.50 vs $79.50
    severity VARCHAR(20) NOT NULL,                 -- High, Medium, Low
    status VARCHAR(30) NOT NULL DEFAULT 'Open',    -- Open, Investigating, Proposed, Resolved
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);

CREATE TABLE IF NOT EXISTS proposed_actions (
    id BIGSERIAL PRIMARY KEY,
    case_id VARCHAR(50) REFERENCES cases(id) ON DELETE CASCADE,
    action_type VARCHAR(100) NOT NULL,             -- e.g., SYNC_ORDER_STATUS, HOLD_REFUND
    status VARCHAR(30) NOT NULL DEFAULT 'Awaiting approval', -- Awaiting approval, Approved, Rejected, Executed
    citations TEXT,                                -- e.g., capture, order
    idempotency_key VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    actor VARCHAR(50) NOT NULL,                    -- operator, system
    action VARCHAR(100) NOT NULL,                  -- Approved SYNC_ORDER_STATUS, Proposed HOLD_REFUND
    subject VARCHAR(100) NOT NULL,                  -- Case PR-0142
    timestamp_display VARCHAR(20) NOT NULL,        -- e.g., 10:06
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);

-- Seed initial audit log demo fixtures matching design mockups
INSERT INTO audit_log (actor, action, subject, timestamp_display)
VALUES
    ('operator', 'Approved SYNC_ORDER_STATUS', 'Case PR-0140', '10:06'),
    ('system', 'Proposed SYNC_ORDER_STATUS', 'Case PR-0140', '10:04'),
    ('operator', 'Rejected HOLD_REFUND', 'Case PR-0138', '09:55'),
    ('system', 'Opened case', 'Case PR-0138', '09:41');
