package com.smhrd.gloring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

//랭킹
@Entity
@Table(name = "keywords")
@Getter
@NoArgsConstructor
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keyword_text", nullable = false, unique = true)
    private String keywordText;
}