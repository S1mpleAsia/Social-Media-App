package com.example.socialappbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "[messages]")
@Getter
@Setter
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "from_id")
    @JsonBackReference
    private AccountEntity fromAccount;

    @ManyToOne
    @JoinColumn(name = "to_id")
    @JsonBackReference
    private AccountEntity toAccount;

    @Column
    private String senderName;
    @Column
    private String receiverName;
    @Column
    private String content;
    @Column
    private String date;
    @Column
    private String imageUrl;
}
