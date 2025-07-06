package com.smhrd.gloring.dto.request;

import java.time.LocalDate;

import com.smhrd.gloring.entity.Calculator;

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
    private Integer cost;
    private Double country_money;
    
    // DTO를 Entity로 변환하는 메서드
    public Calculator toEntity() {
        return Calculator.builder()
                .productName(productName)
                .hscode(hscode)
                .purchaseAmount(purchaseAmount)
                .exchangeRate(exchangeRate)
                .origin(origin)
                .tariff(tariff)
                .otherCost(otherCost)
                .purchaseCost(purchaseCost)
                .expectedSales(expectedSales)
                .freightFee(freightFee)
                .adCost(adCost)
                .platformFee(platformFee)
                .shippingFee(shippingFee)
                .otherFees(otherFees)
                .netSales(netSales)
                .revenueRate(revenueRate)
                .profit(profit)
                .vat(vat)
                .fta(fta)
                .totalFee(totalFee)
                .cost(cost)
                .country_money(country_money)
                .saveDate(LocalDate.now()) // 저장 시점의 날짜 자동 설정
                .build();
    }
}
