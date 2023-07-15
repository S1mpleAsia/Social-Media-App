package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByOrderByIdDesc();
//    @Query(value = "insert into comment (content, blog_id, user_id) VALUES (?1, ?2, ?3)", nativeQuery = true)
//    void nativeInsert(String content, Integer blogId, Integer userId);
}
