package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Integer> {
    List<BlogEntity> findAllByOrderByIdAsc();

    List<BlogEntity> findAllByOrderByIdDesc();
}
