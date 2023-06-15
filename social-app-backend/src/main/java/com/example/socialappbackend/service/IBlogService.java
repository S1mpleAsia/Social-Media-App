package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.BlogDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IBlogService {
    List<BlogDTO> findAll();

    void saveBlogImage(MultipartFile file);

    BlogDTO saveBlog(BlogDTO blogDTO);
}
