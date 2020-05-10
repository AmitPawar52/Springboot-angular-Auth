package com.example.springsocial.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class VerifyEmailRequest {
 
    @NotBlank
    @Email
    private String email;
    
    private Integer otpNo;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getOtpNo() {
        return otpNo;
    }

    public void setOtpNo(Integer otpNo) {
        this.otpNo = otpNo;
    }
    
}