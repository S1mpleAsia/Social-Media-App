package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.CommentConverter;
import com.example.socialappbackend.dto.CommentDTO;
import com.example.socialappbackend.dto.request.CommentRequest;
import com.example.socialappbackend.entity.BlogEntity;
import com.example.socialappbackend.entity.CommentEntity;
import com.example.socialappbackend.entity.CommentImageEntity;
import com.example.socialappbackend.repository.BlogRepository;
import com.example.socialappbackend.repository.CommentImageRepository;
import com.example.socialappbackend.repository.CommentRepository;
import com.example.socialappbackend.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final CommentRepository commentRepository;
    private final CommentConverter commentConverter;
    private final CommentImageRepository commentImageRepository;
    private final BlogRepository blogRepository;


    @Override
    public List<CommentDTO> findAll() {
        List<CommentEntity> commentEntities = commentRepository.findAllByOrderByIdDesc();
        return commentEntities.stream().map(commentConverter::toDto).collect(Collectors.toList());
    }

    @Override
    public CommentDTO saveComment(CommentRequest commentRequest) {
        Integer blogId = commentRequest.getBlogId();

        Optional<BlogEntity> blogEntity = blogRepository.findById(blogId);

        if(blogEntity.isEmpty()) return null;

        CommentEntity commentEntity = commentConverter.toEntity(commentRequest);
        commentEntity.setBlogWithComment(blogEntity.get());
        List<CommentImageEntity> commentImageEntityList = commentEntity.getCommentImageList();

        CommentEntity savedEntity = commentRepository.save(commentEntity);
        commentRequest.setId(savedEntity.getId());

        if(!commentImageEntityList.isEmpty()) {
            commentImageRepository.saveAll(commentImageEntityList);
        }

        CommentDTO commentDTO = commentConverter.toDto(commentRequest);

        return commentDTO;
    }
}
