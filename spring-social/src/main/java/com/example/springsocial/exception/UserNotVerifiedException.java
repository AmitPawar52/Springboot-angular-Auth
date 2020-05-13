package com.example.springsocial.exception;

import org.springframework.security.core.AuthenticationException;

public class UserNotVerifiedException extends AuthenticationException {

    private static final long serialVersionUID = 1L;

    public UserNotVerifiedException(String message) {
        super(message);
    }

    public UserNotVerifiedException(String msg, Throwable t) {
        super(msg, t);
    }
    
}