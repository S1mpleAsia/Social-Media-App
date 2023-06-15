package com.example.socialappbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "role")
@Getter
@Setter
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @OneToOne(mappedBy = "role")
    private AccountEntity account;
    @Column(name = "role_name")
    private String roleName;
    @Column
    private String code;
}
