package com.example.socialappbackend.controller;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.dto.request.AccountRequest;
import com.example.socialappbackend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AccountController {
    @Autowired
    private IAccountService accountService;

    @GetMapping(value = "/login")
    public AccountDTO getUser(@RequestParam("email") String email, @RequestParam("password") String password) {
        return accountService.getUser(email, password);
    }

    @PostMapping(value = "/register")
    @ResponseStatus(HttpStatus.OK)
    public AccountDTO saveAccount(@RequestBody AccountRequest accountRequest) {
        return accountService.saveAccount(accountRequest);
    }

//    @GetMapping(value = "/friends")
//    public List<AccountDTO> getFriendsList(@RequestParam("username") String username) {
//        return accountService.getFriendList(username);
//    }
}
