// src/main/java/kr/smhrd/navertest/dto/response/ExchangeRateResponseDto.java
package com.smhrd.gloring.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ExchangeRateResponseDto {
    private final String countrySign;   // 국가 부호 (예: EU)
    private final String currencyName;  // 통화명 (예: Euro)
    private final Double exchangeRate;  // 환율 (예: 1587.17)
    private final String applyDate;     // 적용 날짜 (예: 20250629)

    @Builder
    public ExchangeRateResponseDto(String countrySign, String currencyName, Double exchangeRate, String applyDate) {
        this.countrySign = countrySign;
        this.currencyName = currencyName;
        this.exchangeRate = exchangeRate;
        this.applyDate = applyDate;
    }
}