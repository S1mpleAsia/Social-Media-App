package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "account")
@Getter
@Setter
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String email;
    @Column(name = "created_at")
    private Date createdAt;
    @Column
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonBackReference
    private RoleEntity role;

    @OneToOne(mappedBy = "account")
    @JsonBackReference(value = "user-account")
    private UserEntity user;

    @OneToMany(mappedBy = "fromAccount")
    @JsonManagedReference
    private List<MessageEntity> fromMessageList;

    @OneToMany(mappedBy = "toAccount")
    @JsonManagedReference
    private List<MessageEntity> toMessageList;
}
