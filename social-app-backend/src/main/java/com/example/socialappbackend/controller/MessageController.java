package com.example.socialappbackend.controller;

import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.entity.MessageEntity;
import com.example.socialappbackend.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class MessageController {
    @Autowired
    private IMessageService messageService;

    @PostMapping("/message")
    public MessageEntity saveMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.save(messageDTO);
    }

    @GetMapping("/message")
    public List<MessageDTO> getMessage() {
        return messageService.findAll();
    }

    @PostMapping("/message/upload")
    public String uploadMessageImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Integer id) {

        try {
            messageService.saveMessageImage(file, id);
        } catch (Exception e) {
            return e.getMessage();
        }

        return file.getOriginalFilename();
    }
}
