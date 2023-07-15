package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "role")
@Getter
@Setter
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private List<AccountEntity> account;
    @Column(name = "role_name")
    private String roleName;
    @Column
    private String code;
}
