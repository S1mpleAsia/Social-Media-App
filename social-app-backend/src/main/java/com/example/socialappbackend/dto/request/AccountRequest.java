package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AccountRequest {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private Date createdAt;
    private String refreshToken;
    @JsonBackReference(value = "user-account-request")
    private UserRequest user;
    @JsonManagedReference
    private RoleRequest role;
}
