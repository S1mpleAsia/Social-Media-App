package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogImageDTO {
    private Integer id;
    private String imageUrl;
    @JsonBackReference(value = "blog-image-dto")
    private BlogDTO blogWithImage;
}
