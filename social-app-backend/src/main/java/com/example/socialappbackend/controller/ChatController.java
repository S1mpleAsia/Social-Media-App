package com.example.socialappbackend.controller;

import com.example.socialappbackend.converter.UserConverter;
import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.dto.MessageDTO;
import com.example.socialappbackend.dto.request.BlogRequest;
import com.example.socialappbackend.dto.request.CommentRequest;
import com.example.socialappbackend.repository.UserRepository;
import com.example.socialappbackend.service.IBlogService;
import com.example.socialappbackend.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private IBlogService blogService;
    @Autowired
    private ICommentService commentService;

//    @Autowired
//    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
//        this.simpMessagingTemplate = simpMessagingTemplate;
//    }


    @MessageMapping("/public-message") //  /app/public-message
    @SendTo("/group/public")
    public MessageDTO receivePublicMessage(@Payload MessageDTO messsage) {
        System.out.println(messsage.toString());
        return messsage;
    }

//    @MessageMapping("/user-notify") //  /app/user-notify
//    @SendTo("/group/notify-all")
//    public UserDTO receiveUserNotify(@Payload UserDTO user) {
//        UserEntity entity = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
////        user = userConverter.toDto(entity);
//        System.out.println(entity.toString());
//
//        return user;
//    }

    @MessageMapping("/user-blog")   //  /app/user-blog
    @SendTo("/group/public-blog")
    public BlogDTO receiveUserBlog(@Payload BlogRequest blogRequest) {
        return blogService.saveBlog(blogRequest);
    }

    @MessageMapping("/user-comment")    //  /app/user-comment
    @SendTo("/group/public-comment")
    public CommentDTO receiveUserComment(@Payload CommentRequest commentRequest) {
        System.out.println(commentRequest);
        return commentService.saveComment(commentRequest);
    }

    @MessageMapping("/private-message")     //  /app/private-message
    public MessageDTO receivePrivateMessage(@Payload MessageDTO messsage) {
        // /user/David/private
        simpMessagingTemplate.convertAndSendToUser(messsage.getReceiverName(), "/private", messsage);
        simpMessagingTemplate.convertAndSendToUser(messsage.getSenderName(), "/private", messsage);
        System.out.println(messsage);

        return messsage;
    }
}
