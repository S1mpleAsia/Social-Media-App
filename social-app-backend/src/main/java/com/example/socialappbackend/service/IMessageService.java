package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.entity.MessageEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IMessageService {
    MessageEntity save(MessageDTO messageDTO);

    List<MessageDTO> findAll();

    void saveMessageImage(MultipartFile file, Integer id);
}
