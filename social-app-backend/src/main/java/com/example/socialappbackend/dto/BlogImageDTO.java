package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogImageDTO {
    private Integer id;
    private String imageUrl;
    @JsonBackReference
    private BlogDTO blogWithImage;
}
