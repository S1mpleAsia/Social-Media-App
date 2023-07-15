package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Query(value = "SELECT * FROM user WHERE id <> :id", nativeQuery = true)
    List<UserEntity> getFriendList(@Param("id") Integer id);
}
