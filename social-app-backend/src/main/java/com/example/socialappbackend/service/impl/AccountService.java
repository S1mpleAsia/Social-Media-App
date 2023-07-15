package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.AccountConverter;
import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.dto.request.AccountRequest;
import com.example.socialappbackend.entity.AccountEntity;
import com.example.socialappbackend.entity.RoleEntity;
import com.example.socialappbackend.entity.UserEntity;
import com.example.socialappbackend.repository.AccountRepository;
import com.example.socialappbackend.repository.RoleRepository;
import com.example.socialappbackend.repository.UserRepository;
import com.example.socialappbackend.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountConverter accountConverter;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<AccountDTO> getFriendList(String username) {
        List<AccountEntity> entityList = accountRepository.getFriendList(username);

        return entityList.stream().map(entity -> accountConverter.toDto(entity)).toList();
    }

    @Override
    public AccountDTO getUser(String email, String password) {
        AccountEntity entity = accountRepository.findByEmailAndPassword(email, password);

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

    @Override
    public AccountDTO saveAccount(AccountRequest accountRequest) {
        AccountEntity entity = accountConverter.toEntity(accountRequest);

        if(checkExist(entity)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exist");

        RoleEntity roleEntity = roleRepository.findFirstById(accountRequest.getRole().getId());
        entity.setRole(roleEntity);
        UserEntity user = entity.getUser();
        user.setDefaultValue();

        entity.setUser(null);

        AccountEntity myEntity = accountRepository.saveAndFlush(entity);

        user.setAccount(myEntity);
        userRepository.save(user);

        return accountConverter.toDto(myEntity);
    }

    private boolean checkExist(AccountEntity account) {
        AccountEntity accountEntity = accountRepository.findByUsername(account.getUsername());

        return accountEntity != null;
    }
}
