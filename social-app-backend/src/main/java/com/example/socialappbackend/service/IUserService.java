package com.example.socialappbackend.service;

import com.example.socialappbackend.dto.UserDTO;
import jakarta.annotation.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IUserService {

    void initStorage();
    void saveBgImage(MultipartFile file, String username);

    void saveAvatarImage(MultipartFile file, String username);
    UserDTO getUser(String username);

    UserDTO update(UserDTO userDTO);
}
