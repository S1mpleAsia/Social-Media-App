package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.RoleDTO;
import com.example.socialappbackend.entity.RoleEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter {
    @Autowired
    private ModelMapper modelMapper;

    public RoleDTO toDto(RoleEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, RoleDTO.class);
    }

    public RoleEntity toEntity(RoleDTO dto) {
        if(dto == null) return null;

        return modelMapper.map(dto, RoleEntity.class);
    }
}
