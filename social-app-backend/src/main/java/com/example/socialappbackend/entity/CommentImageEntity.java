package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comment_image")
@Getter
@Setter
public class CommentImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "img_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @JsonBackReference(value = "comment-image")
    private CommentEntity comment;
}
