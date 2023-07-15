package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.BlogImageDTO;
import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BlogRequest {
    private Integer id;
    private String caption;
    private Integer liked;
    private Integer commented;
    private Integer shared;
    @JsonManagedReference(value = "blog-image-request")
    private List<BlogImageRequest> blogImageList;
    @JsonManagedReference(value = "blog-comment-request")
    private List<CommentRequest> commentList;
    @JsonBackReference(value = "user-blog-request")
    private UserRequest user;
}
