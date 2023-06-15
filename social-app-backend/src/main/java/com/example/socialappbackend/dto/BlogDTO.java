package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class BlogDTO {
    private Integer id;
    private String caption;
    private Integer liked;
    private Integer commented;
    private Integer shared;
    @JsonManagedReference
    private List<BlogImageDTO> blogImageList;
    private List<CommentDTO> commentList;
    private UserDTO user;
}
