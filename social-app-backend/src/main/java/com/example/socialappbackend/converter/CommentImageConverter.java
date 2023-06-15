package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.CommentImageDTO;
import com.example.socialappbackend.entity.CommentImageEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentImageConverter {
    @Autowired
    private ModelMapper modelMapper;

    public CommentImageDTO toDto(CommentImageEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, CommentImageDTO.class);
    }

    public CommentImageEntity toEntity(CommentImageDTO dto) {
        if(dto == null) return null;

        return modelMapper.map(dto, CommentImageEntity.class);
    }
}
