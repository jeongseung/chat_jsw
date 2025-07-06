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
    private Long calId;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Integer hscode;

    @Column(nullable = false)
    private Double purchaseAmount;

    @Column(nullable = false)
    private Double exchangeRate;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private Integer tariff;

    private Integer otherCost;
    private Integer purchaseCost;
    private Integer expectedSales;
    private Integer freightFee;
    private Integer adCost;
    private Double platformFee;
    private Double shippingFee;
    private Double otherFees;

    @Column(nullable = false)
    private Integer netSales;

    @Column(nullable = false)
    private Double revenueRate;

    @Column(nullable = false)
    private Integer profit;

    private Integer vat;

    private Boolean fta;

    private Integer totalFee;

    @Column(nullable = false)
    private LocalDate saveDate;

    private Integer cost;
    
    @Column(nullable = false)
    private Double country_money;
    // getters and setters
}