package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.model.ConfirmationToken;
import com.example.springsocial.model.User;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.AuthResponse;
import com.example.springsocial.payload.LoginRequest;
import com.example.springsocial.payload.SignUpRequest;
import com.example.springsocial.payload.VerifyEmailRequest;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.service.AuthService;
import com.example.springsocial.service.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Calendar;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        User user = authService.findByEmail(loginRequest.getEmail());
        if (user.getEmailVerified() == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email id is not verified");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

        if (authService.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Account already exists on this mail Id.");
        }

        User user = authService.saveUser(signUpRequest);
        ConfirmationToken confirmationToken = authService.createToken(user);
        emailSenderService.sendMail(user.getEmail(), confirmationToken.getConfirmationToken());

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("confirm-account")
    public ResponseEntity<?> getMethodName(@RequestParam("token") String token) {

        ConfirmationToken confirmationToken = authService.findByConfirmationToken(token);
        
        if (confirmationToken == null) {
            throw new BadRequestException("Invalid token");
        }

        User user = confirmationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        
        if((confirmationToken.getExpiryDate().getTime() - 
                calendar.getTime().getTime()) <= 0) {
            return ResponseEntity.badRequest().body("Link expired. Generate new link from http://localhost:4200/login");
        }

        user.setEmailVerified(true);
        authService.save(user);
        return ResponseEntity.ok("Account verified successfully!");
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendVerificationMail(@Valid @RequestBody 
                        VerifyEmailRequest emailRequest) {
        if(authService.existsByEmail(emailRequest.getEmail())){
            if(authService.findByEmail(emailRequest.getEmail()).getEmailVerified()){
                throw new BadRequestException("Email is already verified");
            } else {
                User user = authService.findByEmail(emailRequest.getEmail());
                ConfirmationToken token = authService.createToken(user);
                emailSenderService.sendMail(user.getEmail(), token.getConfirmationToken());
                return ResponseEntity.ok(new ApiResponse(true, "Verification link is sent on your mail id"));
            }
        } else {
            throw new BadRequestException("Email is not associated with any account");
        }
    }    
}
