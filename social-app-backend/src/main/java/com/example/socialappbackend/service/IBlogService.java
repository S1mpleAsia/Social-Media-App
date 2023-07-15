package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.request.BlogRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IBlogService {
    List<BlogDTO> findAll();

    void saveBlogImage(MultipartFile file);

    BlogDTO saveBlog(BlogRequest blogRequest);

    void delete(Integer id);
}
