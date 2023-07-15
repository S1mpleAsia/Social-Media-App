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

    @OneToMany(mappedBy = "blogWithImage", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "blog-image")
    private List<BlogImageEntity> blogImageList;

    @OneToMany(mappedBy = "blogWithComment", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "blog-comment")
    private List<CommentEntity> commentList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference(value = "user-blog")
    private UserEntity user;
}
