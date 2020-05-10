package com.example.springsocial.repository;

import com.example.springsocial.model.ConfirmationToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository 
            extends JpaRepository<ConfirmationToken, Long> {
    
    ConfirmationToken findByConfirmationToken(String token); 
}