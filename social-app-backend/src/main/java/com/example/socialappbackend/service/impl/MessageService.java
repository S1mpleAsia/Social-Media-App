package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.MessageConverter;
import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.entity.MessageEntity;
import com.example.socialappbackend.repository.MessageRepository;
import com.example.socialappbackend.service.IAccountService;
import com.example.socialappbackend.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private MessageConverter messageConverter;
    @Autowired
    private IAccountService accountService;

    @Override
    public MessageEntity save(MessageDTO messageDTO) {
        Integer fromId = accountService.getUser(messageDTO.getSenderName()).getId();
        Integer toId = accountService.getUser(messageDTO.getReceiverName()).getId();

        MessageEntity entity = messageConverter.toEntity(messageDTO);

//        System.out.println(entity);

        entity.setFromAccount(accountService.findById(fromId));
        entity.setToAccount(accountService.findById(toId));

        return messageRepository.save(entity);

    }

    @Override
    public List<MessageDTO> findAll() {
        return messageRepository.findAllByOrderByIdAsc().stream().map(entity -> messageConverter.toDto(entity)).toList();
    }
}
