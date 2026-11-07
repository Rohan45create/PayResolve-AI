-- V3: Demo Shop Orders & Fault Switches
CREATE TABLE IF NOT EXISTS shop_orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,      -- e.g., #10482
    paypal_order_id VARCHAR(100),                  -- e.g., 6HJ...
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, PAID, REFUNDED, FAILED
    amount_cents BIGINT NOT NULL,                  -- in smallest currency unit, e.g. 8450 for $84.50
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    fault_switch VARCHAR(50),                      -- e.g. DROP_WEBHOOK, DELAY_STATUS, AMOUNT_TAMPER
    customer_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shop_orders_order_number ON shop_orders(order_number);
CREATE INDEX idx_shop_orders_paypal_order_id ON shop_orders(paypal_order_id);
