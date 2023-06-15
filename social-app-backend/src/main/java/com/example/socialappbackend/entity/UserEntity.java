package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "[user]")
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "bg_url")
    private String bgUrl;
    @Column
    private String fullname;
    @Column
    private String adrress;
    @Column(name = "studied_at")
    private String studiedAt;
    @Column
    private String hometown;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    @JsonManagedReference
    private AccountEntity account;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<BlogEntity> blogList;
}
