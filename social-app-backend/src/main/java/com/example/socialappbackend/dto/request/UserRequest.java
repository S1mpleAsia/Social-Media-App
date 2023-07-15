package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.CommentDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserRequest {
    private Integer id;
    private String imageUrl;
    private String bgUrl;
    private String adrress;
    private String fullname;
    private String studiedAt;
    private String hometown;
    private String currentEducation;
    private String status;
    @JsonManagedReference(value = "user-account-request")
    private AccountRequest account;
    @JsonManagedReference(value = "user-blog-request")
    private List<BlogRequest> blogList;
    @JsonManagedReference(value = "user-comment-request")
    private List<CommentRequest> commentList;
}
