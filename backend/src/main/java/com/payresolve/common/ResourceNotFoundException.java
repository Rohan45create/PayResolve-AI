package com.payresolve.common;

/**
 * Thrown when a requested domain entity (case, order, evidence item) cannot be found.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}

