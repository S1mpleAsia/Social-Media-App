package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentImageDTO {
    private Integer id;
    private String imageUrl;
    @JsonBackReference(value = "comment-image-dto")
    private CommentDTO comment;
}
