package com.example.socialappbackend.repository;

import com.example.socialappbackend.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    AccountEntity findByEmailAndPassword(String email, String password);

    AccountEntity findByUsername(String username);
    AccountEntity findFirstById(Integer id);

    @Query(value = "SELECT * FROM account WHERE username <> :username", nativeQuery = true)
    List<AccountEntity> getFriendList(@Param("username") String username);
}
