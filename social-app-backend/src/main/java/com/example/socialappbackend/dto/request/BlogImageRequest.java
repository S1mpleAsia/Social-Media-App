package com.example.socialappbackend.dto.request;

import com.example.socialappbackend.dto.BlogDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogImageRequest {
    private Integer id;
    private String imageUrl;
    @JsonBackReference(value = "blog-image-request")
    private BlogRequest blogWithImage;
}
