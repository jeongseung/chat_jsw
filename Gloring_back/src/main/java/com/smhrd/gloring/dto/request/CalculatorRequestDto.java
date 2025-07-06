package com.smhrd.gloring.dto.request;

import java.time.LocalDate;

import com.smhrd.gloring.entity.Calculator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorRequestDto {

    private String productName;
    private String origin;
    private String hscode;
    private double exchangeRate;
    private double purchaseAmountEx;
    private double purchaseAmount;
    private int freightFee;
    private int otherFee;
    private boolean fta;
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
    private int netSales;
    private int profit;
    private double revenueRate;
    private String countryMoney;

    // DTO를 Entity로 변환하는 메서드
    public Calculator toEntity() {
        return Calculator.builder()
                .productName(productName)
                .origin(origin)
                .hscode(hscode)
                .exchangeRate(exchangeRate)
                .purchaseAmountEx(purchaseAmountEx)
                .purchaseAmount(purchaseAmount)
                .freightFee(freightFee)
                .otherFee(otherFee)
                .fta(fta)
                .tariff(tariff)
                .vat(vat)
                .purchaseCost(purchaseCost)
                .expectedSales(expectedSales)
                .shippingFee(shippingFee)
                .adCost(adCost)
                .platformFee(platformFee)
                .otherFees(otherFees)
                .totalFee(totalFee)
                .cost(cost)
                .netSales(netSales)
                .profit(profit)
                .revenueRate(revenueRate)
                .countryMoney(countryMoney)
                .saveDate(LocalDate.now()) // 저장 시점의 날짜 자동 설정
                .build();
    }
}