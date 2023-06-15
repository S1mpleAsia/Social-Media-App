package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.AccountConverter;
import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.entity.AccountEntity;
import com.example.socialappbackend.repository.AccountRepository;
import com.example.socialappbackend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountConverter accountConverter;

    @Override
    public List<AccountDTO> getFriendList(String username) {
        List<AccountEntity> entityList = accountRepository.getFriendList(username);

        return entityList.stream().map(entity -> accountConverter.toDto(entity)).toList();
    }

    @Override
    public AccountDTO getUser(String username, String password) {
        AccountEntity entity = accountRepository.findByUsernameAndPassword(username, password);

        if(entity == null) return null;

        return accountConverter.toDto(entity);
    }

    @Override
    public AccountDTO getUser(String username) {
        AccountEntity entity = accountRepository.findByUsername(username);

        if(entity == null) return null;

        return accountConverter.toDto(entity);
    }

    @Override
    public AccountEntity findById(Integer id) {
        return accountRepository.findFirstById(id);
    }
}
