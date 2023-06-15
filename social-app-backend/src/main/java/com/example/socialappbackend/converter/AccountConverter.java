package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.entity.AccountEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountConverter {
    @Autowired
    private ModelMapper modelMapper;

    public AccountDTO toDto(AccountEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, AccountDTO.class);
    }

    public AccountEntity toEntity(AccountDTO accountDTO) {
        if(accountDTO == null) return null;

        return modelMapper.map(accountDTO, AccountEntity.class);
    }
}
