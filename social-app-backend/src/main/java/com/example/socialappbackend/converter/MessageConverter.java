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

        MessageDTO messageDTO = modelMapper.map(entity, MessageDTO.class);
        messageDTO.setFromId(entity.getFromAccount().getId());
        messageDTO.setToId(entity.getToAccount().getId());

        return messageDTO;

    }

    public MessageEntity toEntity(MessageDTO messageDTO) {
        if(messageDTO == null) return null;

        return modelMapper.map(messageDTO, MessageEntity.class);
    }
}
