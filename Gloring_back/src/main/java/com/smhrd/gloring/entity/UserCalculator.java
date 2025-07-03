package com.smhrd.gloring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user_calculator")
public class UserCalculator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cal_id", nullable = false)
    private Calculator calculator;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    // getters and setters
}