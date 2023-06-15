package com.example.socialappbackend.service.impl;

import com.example.socialappbackend.converter.UserConverter;
import com.example.socialappbackend.dto.UserDTO;
import com.example.socialappbackend.entity.AccountEntity;
import com.example.socialappbackend.entity.UserEntity;
import com.example.socialappbackend.repository.AccountRepository;
import com.example.socialappbackend.repository.UserRepository;
import com.example.socialappbackend.service.IUserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserConverter userConverter;

    private final Path root = Paths.get("uploads");

    @Override
    public void initStorage() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void saveBgImage(MultipartFile file, String username) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));

            UserEntity userEntity = accountRepository.findByUsername(username).getUser();

            if(userEntity != null) {
                userEntity.setBgUrl("http://localhost:8080/uploads/" + file.getOriginalFilename());
                userRepository.save(userEntity);
            }
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                UserEntity userEntity = accountRepository.findByUsername(username).getUser();

                if(userEntity != null) {
                    userEntity.setBgUrl("http://localhost:8080/uploads/" + file.getOriginalFilename());
                    userRepository.save(userEntity);
                }
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void saveAvatarImage(MultipartFile file, String username) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));

            UserEntity userEntity = accountRepository.findByUsername(username).getUser();

            if(userEntity != null) {
                userEntity.setImageUrl("http://localhost:8080/uploads/" + file.getOriginalFilename());
                userRepository.save(userEntity);
            }
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                UserEntity userEntity = accountRepository.findByUsername(username).getUser();

                if(userEntity != null) {
                    userEntity.setImageUrl("http://localhost:8080/uploads/" + file.getOriginalFilename());
                    userRepository.save(userEntity);
                }
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public UserDTO getUser(String username) {
        UserEntity user = accountRepository.findByUsername(username).getUser();

        if(user != null) {
            UserDTO dto = userConverter.toDto(user);
            return dto;
        }

        return null;
    }

    @Override
    public UserDTO update(UserDTO userDTO) {
        UserEntity entity = userConverter.toEntity(userDTO);


        AccountEntity account = accountRepository.findFirstById(userDTO.getAccount().getId());
        entity.setAccount(account);

        userRepository.save(entity);

        return userConverter.toDto(entity);
    }
}
