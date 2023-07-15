package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.dto.request.CommentRequest;

import java.util.List;

public interface ICommentService {
    List<CommentDTO> findAll();

    CommentDTO saveComment(CommentRequest commentRequest);
}
