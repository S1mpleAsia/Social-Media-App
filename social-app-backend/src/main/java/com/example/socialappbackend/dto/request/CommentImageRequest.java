package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.dto.CommentImageDTO;
import com.example.socialappbackend.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentImageRequest {
    private Integer id;
    private String imageUrl;
    @JsonBackReference(value = "comment-image-request")
    private CommentRequest comment;
}
