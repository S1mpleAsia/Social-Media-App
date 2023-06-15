package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.UserDTO;
import com.example.socialappbackend.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {
    @Autowired
    private ModelMapper modelMapper;

    public UserDTO toDto(UserEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, UserDTO.class);
    }

    public UserEntity toEntity(UserDTO userDTO) {
        if(userDTO == null) return null;

        return modelMapper.map(userDTO, UserEntity.class);
    }
}
