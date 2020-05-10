package com.example.springsocial.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import org.springframework.stereotype.Service;

@Service
public class OtpGenerator {
    private static final Integer EXPIRE_MINS = 5;
    private LoadingCache<String, Integer> otpCache;
    
    public OtpGenerator() {
        otpCache = CacheBuilder.newBuilder().
            expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
                @Override
                public Integer load(String key) throws Exception {
                    return 0;
                }
            });
    }
    public int generateOTP(String key){
		Random random = new Random();	
		int otp = 100000 + random.nextInt(900000);
		otpCache.put(key, otp);
		return otp;
    }
    public int getOtp(String key){		 
		try {
			return otpCache.get(key); 
		} catch (Exception e) {
		 return -1;			 
		}
    }
    public void clearOTP(String key){		 
        otpCache.invalidate(key);
    }
}











