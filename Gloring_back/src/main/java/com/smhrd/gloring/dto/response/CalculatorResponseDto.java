package com.smhrd.gloring.dto.response;

import java.time.LocalDate;

import com.smhrd.gloring.entity.Calculator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
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
    private Integer cost;

    // Entity를 DTO로 변환하는 생성자
    public CalculatorResponseDto(Calculator calculator) {
        this.calId = calculator.getCalId();
        this.productName = calculator.getProductName();
        this.hscode = calculator.getHscode();
        this.purchaseAmount = calculator.getPurchaseAmount();
        this.exchangeRate = calculator.getExchangeRate();
        this.origin = calculator.getOrigin();
        this.tariff = calculator.getTariff();
        this.otherCost = calculator.getOtherCost();
        this.purchaseCost = calculator.getPurchaseCost();
        this.expectedSales = calculator.getExpectedSales();
        this.freightFee = calculator.getFreightFee();
        this.adCost = calculator.getAdCost();
        this.platformFee = calculator.getPlatformFee();
        this.shippingFee = calculator.getShippingFee();
        this.otherFees = calculator.getOtherFees();
        this.netSales = calculator.getNetSales();
        this.revenueRate = calculator.getRevenueRate();
        this.profit = calculator.getProfit();
        this.vat = calculator.getVat();
        this.fta = calculator.getFta();
        this.totalFee = calculator.getTotalFee();
        this.saveDate = calculator.getSaveDate();
        this.cost = calculator.getCost();
    }


}
