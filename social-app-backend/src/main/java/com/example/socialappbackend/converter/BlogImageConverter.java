package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.BlogImageDTO;
import com.example.socialappbackend.entity.BlogImageEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BlogImageConverter {
    @Autowired
    private ModelMapper modelMapper;

    public BlogImageDTO toDto(BlogImageEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, BlogImageDTO.class);
    }

    public BlogImageEntity toEntity(BlogImageDTO dto) {
        if(dto == null) return null;

        return modelMapper.map(dto, BlogImageEntity.class);
    }
}
