package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.dto.request.AccountRequest;
import com.example.socialappbackend.entity.AccountEntity;

import java.util.List;

public interface IAccountService {
    List<AccountDTO> getFriendList(String username);
    AccountDTO getUser(String email, String password);
    AccountDTO getUser(String username);
    AccountEntity findById(Integer id);
    AccountDTO saveAccount(AccountRequest accountRequest);
}
