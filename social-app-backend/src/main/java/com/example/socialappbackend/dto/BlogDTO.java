package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class BlogDTO {
    private Integer id;
    private String caption;
    private Integer liked;
    private Integer commented;
    private Integer shared;
    @JsonManagedReference(value = "blog-image-dto")
    private List<BlogImageDTO> blogImageList;
    @JsonManagedReference(value = "blog-comment-dto")
    private List<CommentDTO> commentList;
    @JsonManagedReference(value = "user-blog-dto")
    private UserDTO user;
}
