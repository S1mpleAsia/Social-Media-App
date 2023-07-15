package com.example.socialappbackend.dto.request;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleRequest {
    private Integer id;
    private String roleName;
    private String code;
    @JsonBackReference
    private AccountRequest account;
}
