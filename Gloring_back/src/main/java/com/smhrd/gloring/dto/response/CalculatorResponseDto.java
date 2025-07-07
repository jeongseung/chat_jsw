package com.smhrd.gloring.dto.response;

import java.time.LocalDate;

import com.smhrd.gloring.entity.Calculator;

import lombok.AllArgsConstructor;
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
    private LocalDate saveDate;
    private String countryMoney;

    // Entity를 DTO로 변환하는 생성자
    public CalculatorResponseDto(Calculator calculator) {
        this.calId = calculator.getCalId();
        this.productName = calculator.getProductName();
        this.origin = calculator.getOrigin();
        this.hscode = calculator.getHscode();
        this.exchangeRate = calculator.getExchangeRate();
        this.purchaseAmountEx = calculator.getPurchaseAmountEx();
        this.purchaseAmount = calculator.getPurchaseAmount();
        this.freightFee = calculator.getFreightFee();
        this.otherFee = calculator.getOtherFee();
        this.fta = calculator.isFta();
        this.tariff = calculator.getTariff();
        this.vat = calculator.getVat();
        this.purchaseCost = calculator.getPurchaseCost();
        this.expectedSales = calculator.getExpectedSales();
        this.shippingFee = calculator.getShippingFee();
        this.adCost = calculator.getAdCost();
        this.platformFee = calculator.getPlatformFee();
        this.otherFees = calculator.getOtherFees();
        this.totalFee = calculator.getTotalFee();
        this.cost = calculator.getCost();
        this.netSales = calculator.getNetSales();
        this.profit = calculator.getProfit();
        this.revenueRate = calculator.getRevenueRate();
        this.saveDate = calculator.getSaveDate();
        this.countryMoney = calculator.getCountryMoney();
    }
}