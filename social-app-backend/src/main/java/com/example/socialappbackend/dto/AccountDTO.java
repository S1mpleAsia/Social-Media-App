package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AccountDTO {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private Date createdAt;
    private String refreshToken;
    @JsonBackReference(value = "user-account-dto")
    private UserDTO user;
}
