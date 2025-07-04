package com.smhrd.gloring.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorResponseDto {
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
