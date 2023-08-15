package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.MessageConverter;
import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.entity.MessageEntity;
import com.example.socialappbackend.repository.MessageRepository;
import com.example.socialappbackend.service.IAccountService;
import com.example.socialappbackend.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageService implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private MessageConverter messageConverter;
    @Autowired
    private IAccountService accountService;

    private final Path root = Paths.get("uploads");

    @Override
    public MessageEntity save(MessageDTO messageDTO) {
        Integer fromId = messageDTO.getFromId();
        Integer toId = messageDTO.getToId();

        MessageEntity entity = messageConverter.toEntity(messageDTO);

//        System.out.println(entity);

        entity.setFromAccount(accountService.findById(fromId));
        entity.setToAccount(accountService.findById(toId));

        return messageRepository.saveAndFlush(entity);

    }

    @Override
    public List<MessageDTO> findAll() {
        return messageRepository.findAllByOrderByIdAsc().stream().map(entity -> messageConverter.toDto(entity)).toList();
    }

    @Override
    public void saveMessageImage(MultipartFile file, Integer id) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }

        Optional<MessageEntity> messageEntity = messageRepository.findById(id);

        messageEntity.ifPresent(entity -> entity.setImageUrl("http://localhost:8080/uploads" + file.getOriginalFilename()));
    }
}
