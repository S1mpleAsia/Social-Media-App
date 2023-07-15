package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Random;


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
    @Column
    private String currentEducation;
    @Column
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    @JsonManagedReference(value = "user-account")
    private AccountEntity account;

    @OneToMany(mappedBy = "user")
    @JsonBackReference(value = "user-blog")
    private List<BlogEntity> blogList;

    @OneToMany(mappedBy = "commentUser")
    @JsonBackReference(value = "user-comment")
    private List<CommentEntity> commentList;

    public void setDefaultValue() {
        if(this.adrress == null) setAdrress("Hanoi, Vietnam");
        if(this.studiedAt == null) setStudiedAt("Đại học Bách Khoa");
        if(this.hometown == null) setHometown("Hà nội");
        if(this.currentEducation == null) setCurrentEducation("Đại học Bách Khoa");
        if(this.status == null) setStatus("Your status");
        if(this.imageUrl == null) setImageUrl("http://localhost:8080/uploads/default_avatar_" + new Random().nextInt(3) + ".jpg");
        if(this.bgUrl == null) setBgUrl("http://localhost:8080/uploads/default_bg_"+ new Random().nextInt(3) + ".jpg");
    }
}
