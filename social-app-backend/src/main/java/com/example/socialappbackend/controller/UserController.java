package com.example.socialappbackend.controller;

import com.example.socialappbackend.dto.UserDTO;
import com.example.socialappbackend.dto.request.UserRequest;
import com.example.socialappbackend.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping(value = "/bg-upload")
    public String updateBgImage(@RequestParam("file") MultipartFile file, @RequestParam("username") String username) {
        try {
            userService.saveBgImage(file, username);

            return file.getOriginalFilename();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping(value = "/user")
    public UserDTO getUser(@RequestParam("username") String username) {
        return userService.getUser(username);
    }

    @PutMapping(value = "/avatar-upload")
    public String updateAvatarImage(@RequestParam("file") MultipartFile file, @RequestParam("username") String username) {
        try {
            userService.saveAvatarImage(file, username);

            return file.getOriginalFilename();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @PutMapping(value = "/user")
    public UserDTO updateUser(@RequestBody UserRequest userRequest) {
        return userService.update(userRequest);
    }

    @GetMapping(value = "/friends")
    public List<UserDTO> getFriendList(@RequestParam("id") Integer id) {
        return userService.getFriendList(id);
    }
}

