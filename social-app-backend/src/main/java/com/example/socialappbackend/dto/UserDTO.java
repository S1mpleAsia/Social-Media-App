package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String imageUrl;
    private String bgUrl;
    private String adrress;
    private String fullname;
    private String studiedAt;
    private String hometown;
    private String currentEducation;
    private String status;
    @JsonManagedReference(value = "user-account-dto")
    private AccountDTO account;
    @JsonBackReference(value = "user-blog-dto")
    private List<BlogDTO> blogList;
    @JsonBackReference(value = "user-comment-dto")
    private List<CommentDTO> commentList;
}
