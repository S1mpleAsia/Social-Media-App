package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.CommentImageDTO;
import com.example.socialappbackend.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentRequest {
    private Integer id;
    private String content;
    @JsonBackReference(value = "blog-comment-request")
    private BlogRequest blogWithComment;
    @JsonManagedReference(value = "comment-image-request")
    private List<CommentImageRequest> commentImageList;
    private Integer blogId;
    @JsonBackReference(value = "user-comment-request")
    private UserRequest commentUser;
}
