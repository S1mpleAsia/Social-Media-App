package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private Integer id;
    private String content;
    @JsonBackReference(value = "blog-comment-dto")
    private BlogDTO blogWithComment;
    @JsonManagedReference(value = "comment-image-dto")
    private List<CommentImageDTO> commentImageList;
    private Integer blogId;
    @JsonManagedReference(value = "user-comment-dto")
    private UserDTO commentUser;
}
