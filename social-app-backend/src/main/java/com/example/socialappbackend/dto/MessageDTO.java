package com.example.socialappbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private Integer id;
    private String senderName;
    private String receiverName;
    private String content;
    private String date;
    private Integer fromId;
    private Integer toId;
    private String imageUrl;
}
