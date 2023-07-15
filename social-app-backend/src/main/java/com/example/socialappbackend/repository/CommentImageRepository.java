package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.CommentImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentImageRepository extends JpaRepository<CommentImageEntity, Integer> {
}
