package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.request.BlogRequest;
import com.example.socialappbackend.entity.BlogEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BlogConverter {
    @Autowired
    private ModelMapper modelMapper;

    public BlogDTO toDto(BlogEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, BlogDTO.class);
    }

    public BlogEntity toEntity(BlogDTO blogDTO) {
        if(blogDTO == null) return null;

        return modelMapper.map(blogDTO, BlogEntity.class);
    }

    public BlogEntity toEntity(BlogRequest blogRequest) {
        if(blogRequest == null) return null;

        return modelMapper.map(blogRequest, BlogEntity.class);
    }

    public BlogDTO toDto(BlogRequest blogRequest) {
        if(blogRequest == null) return null;

        return modelMapper.map(blogRequest, BlogDTO.class);
    }
}
