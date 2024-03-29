package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.BlogConverter;
import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.request.BlogRequest;
import com.example.socialappbackend.entity.BlogEntity;
import com.example.socialappbackend.entity.BlogImageEntity;
import com.example.socialappbackend.entity.UserEntity;
import com.example.socialappbackend.repository.BlogImageRepository;
import com.example.socialappbackend.repository.BlogRepository;
import com.example.socialappbackend.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private BlogConverter blogConverter;
    @Autowired
    private BlogImageRepository blogImageRepository;
    private final Path root = Paths.get("uploads");

    @Override
    public List<BlogDTO> findAll() {
        List<BlogEntity> blogEntityList = blogRepository.findAllByOrderByIdDesc();

        List<BlogDTO> blogDTOS = blogEntityList.stream().map(blogEntity -> blogConverter.toDto(blogEntity)).toList();

        return blogDTOS;
    }

    @Override
    public void saveBlogImage(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public BlogDTO saveBlog(BlogRequest blogRequest) {
        BlogEntity blogEntity = blogConverter.toEntity(blogRequest);
        List<BlogImageEntity> imageList = blogEntity.getBlogImageList();

        blogRepository.saveAndFlush(blogEntity);

//        List<BlogImageEntity> unsavedImageList = imageList.stream().filter(item -> item.getId() == null).toList();
//
//        if(!unsavedImageList.isEmpty()) {
//            blogImageRepository.saveAll(unsavedImageList);
//        }

        return blogConverter.toDto(blogEntity);
    }

    @Override
    public void delete(Integer id) {
        Optional<BlogEntity> blogEntity = blogRepository.findById(id);

        blogEntity.ifPresent(entity -> blogRepository.delete(entity));


//        blogRepository.de
    }


}
