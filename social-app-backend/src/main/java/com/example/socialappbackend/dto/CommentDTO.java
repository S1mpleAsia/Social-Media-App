package com.example.socialappbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private Integer id;
    private String content;
    @JsonBackReference
    private BlogDTO blogWithComment;
    @JsonManagedReference
    private List<CommentImageDTO> commentImageList;
}
