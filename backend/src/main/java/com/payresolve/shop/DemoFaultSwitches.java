package com.payresolve.shop;

import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * In-memory fault switches for demo purposes.
 * Controlled by the Demo Shop UI (/demo/faults).
 */
@Component
public class DemoFaultSwitches {

    private final AtomicBoolean failWebhookHandler = new AtomicBoolean(false);
    private final AtomicBoolean dropWebhook = new AtomicBoolean(false);
    private final AtomicBoolean duplicateDelivery = new AtomicBoolean(false);
    private final AtomicBoolean alterOrderTotal = new AtomicBoolean(false);

    public boolean isFailWebhookHandler() {
        return failWebhookHandler.get();
    }

    public void setFailWebhookHandler(boolean fail) {
        this.failWebhookHandler.set(fail);
    }

    public boolean isDropWebhook() {
        return dropWebhook.get();
    }

    public void setDropWebhook(boolean drop) {
        this.dropWebhook.set(drop);
    }

    public boolean isDuplicateDelivery() {
        return duplicateDelivery.get();
    }

    public void setDuplicateDelivery(boolean duplicate) {
        this.duplicateDelivery.set(duplicate);
    }

    public boolean isAlterOrderTotal() {
        return alterOrderTotal.get();
    }

    public void setAlterOrderTotal(boolean alter) {
        this.alterOrderTotal.set(alter);
    }

    public void reset() {
        failWebhookHandler.set(false);
        dropWebhook.set(false);
        duplicateDelivery.set(false);
        alterOrderTotal.set(false);
    }
}
