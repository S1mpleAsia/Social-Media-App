package com.example.socialappbackend.controller;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AccountController {
    @Autowired
    private IAccountService accountService;

    @GetMapping(value = "/login")
    public AccountDTO getUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        return accountService.getUser(username, password);
    }

    @GetMapping(value = "/friends")
    public List<AccountDTO> getFriendsList(@RequestParam("username") String username) {
        return accountService.getFriendList(username);
    }
}
