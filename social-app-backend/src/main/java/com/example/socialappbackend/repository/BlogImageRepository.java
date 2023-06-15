package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.BlogImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogImageRepository extends JpaRepository<BlogImageEntity, Integer> {
}
