package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserDTO {
    private Integer id;
    private String imageUrl;
    private String bgUrl;
    private String adrress;
    private String fullname;
    private String studiedAt;
    private String hometown;
    private AccountDTO account;
    private List<BlogDTO> blogList;
}
