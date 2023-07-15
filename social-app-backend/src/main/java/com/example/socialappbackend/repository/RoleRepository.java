package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {
    RoleEntity findFirstById(Integer id);
}
