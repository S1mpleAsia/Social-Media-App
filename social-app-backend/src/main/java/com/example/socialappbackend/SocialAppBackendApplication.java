package com.example.socialappbackend;

import com.example.socialappbackend.service.IUserService;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialAppBackendApplication implements CommandLineRunner {
    @Resource
    private IUserService userService;

    public static void main(String[] args) {
        SpringApplication.run(SocialAppBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userService.initStorage();
    }
}
