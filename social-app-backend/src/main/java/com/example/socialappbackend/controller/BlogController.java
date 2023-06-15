package com.example.socialappbackend.controller;

import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class BlogController {
    @Autowired
    private IBlogService blogService;

    @GetMapping("/blog")
    public List<BlogDTO> getAllBlog() {
        return blogService.findAll();
    }

    @PutMapping("/blog-image/upload")
    public String uploadBlogImage(@RequestParam("file") MultipartFile file) {
        try {
            blogService.saveBlogImage(file);
        } catch (Exception e) {
            return e.getMessage();
        }

        return file.getOriginalFilename();
    }

    @PostMapping("/blog")
    public BlogDTO saveBlog(@RequestBody BlogDTO blogDTO) {
        return blogDTO;
    }
}
