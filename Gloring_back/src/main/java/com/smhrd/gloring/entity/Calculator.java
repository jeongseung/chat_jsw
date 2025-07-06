package com.smhrd.gloring.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name="calculator")
public class Calculator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cal_id")
    private Long calId;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String hscode;

    @Column(nullable = false)
    private double exchangeRate;

    @Column(nullable = false)
    private double purchaseAmountEx;

    @Column(nullable = false)
    private double purchaseAmount;

    private int freightFee;
    private int otherFee;
    private boolean fta;

    @Column(nullable = false)
    private double tariff;

    private int vat;
    private double purchaseCost;
    private int expectedSales;
    private int shippingFee;
    private int adCost;
    private double platformFee;
    private int otherFees;
    private int totalFee;
    private int cost;

    @Column(nullable = false)
    private int netSales;

    @Column(nullable = false)
    private int profit;

    @Column(nullable = false)
    private double revenueRate;

    @Column(nullable = false)
    private LocalDate saveDate;

    @Column(nullable = false)
    private String countryMoney;
}