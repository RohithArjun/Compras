package com.Kabirarjun.Compras.Controllers;

import com.Kabirarjun.Compras.Authentication.RsaUtil;
import com.Kabirarjun.Compras.Dto.User;
import com.Kabirarjun.Compras.Services.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);
    @Autowired
    LoginService loginService;

    private static KeyPair keyPair;

    // Initialize RSA Key Pair on startup (or load from secure storage)
    static {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            keyPair = generator.generateKeyPair();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 1. Endpoint to send Public Key to Frontend
    @GetMapping("/public-key")
    public String getPublicKey() {
        return Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded());
    }

    // 2. Login endpoint receiving encrypted password
    @PostMapping("/login")
    public User login(@RequestBody User request) {
        try {
            // Decrypt password using Private Key\
            log.info("Received login request for email: {}", request.getEmail());
            String decryptedPassword = RsaUtil.decrypt(request.getPassword(), keyPair.getPrivate());
            return loginService.getUser(request.getEmail(), decryptedPassword);
            // Proceed with normal authentication and BCrypt validation using decryptedPassword

        } catch (Exception e) {
            log.error("Error during decryption or login process: {}", e.getMessage());
            return null; // Handle decryption error appropriately
        }
    }


    @RequestMapping("/register")
    public String register(@RequestBody User user)
    {
        loginService.setUser(user);
        return "User registered successfully!";
    }

}
