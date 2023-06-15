package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.entity.CommentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentConverter {
    @Autowired
    private ModelMapper modelMapper;

    public CommentDTO toDto(CommentEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, CommentDTO.class);
    }

    public CommentEntity toEntity(CommentDTO dto) {
        if(dto == null) return null;

        return modelMapper.map(dto, CommentEntity.class);
    }
}
