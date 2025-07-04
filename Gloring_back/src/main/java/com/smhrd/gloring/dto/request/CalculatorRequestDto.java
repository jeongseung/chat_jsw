package com.smhrd.gloring.dto.request;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CalculatorRequestDto {

	private Long calId;

    private String productName;

    private Integer hscode;

    private Double purchaseAmount;

    private Double exchangeRate;


    private String origin;


    private Integer tariff;

    private Integer otherCost;
    private Integer purchaseCost;
    private Integer expectedSales;
    private Integer freightFee;
    private Integer adCost;
    private Double platformFee;
    private Double shippingFee;
    private Double otherFees;


    private Integer netSales;


    private Double revenueRate;


    private Integer profit;

    private Integer vat;

    private Boolean fta;

    private Integer totalFee;

    private LocalDate saveDate;
}
