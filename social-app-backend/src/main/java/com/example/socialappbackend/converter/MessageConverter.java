package com.example.socialappbackend.converter;

import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.entity.MessageEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageConverter {
    @Autowired
    private ModelMapper modelMapper;

    public MessageDTO toDto(MessageEntity entity) {
        if(entity == null) return null;

        return modelMapper.map(entity, MessageDTO.class);
    }

    public MessageEntity toEntity(MessageDTO messageDTO) {
        if(messageDTO == null) return null;

        return modelMapper.map(messageDTO, MessageEntity.class);
    }
}
