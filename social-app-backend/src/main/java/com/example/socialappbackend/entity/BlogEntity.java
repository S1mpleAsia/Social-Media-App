package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "blog")
@Getter
@Setter
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String caption;
    @Column
    private Integer liked;
    @Column
    private Integer commented;
    @Column
    private Integer shared;

    @OneToMany(mappedBy = "blogWithImage")
    @JsonManagedReference
    private List<BlogImageEntity> blogImageList;

    @OneToMany(mappedBy = "blogWithComment")
    @JsonManagedReference
    private List<CommentEntity> commentList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserEntity user;
}
