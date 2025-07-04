// src/main/java/kr/smhrd/navertest/controller/ExchangeRateController.java
package com.smhrd.gloring.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smhrd.gloring.dto.response.ExchangeRateResponseDto;
import com.smhrd.gloring.service.ExchangeRateService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exchange-rates")
//@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버(포트 3000)와의 CORS 문제 해결
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    @GetMapping("/{countryCode}")
    public ResponseEntity<ExchangeRateResponseDto> getExchangeRate(@PathVariable String countryCode) {
        System.out.println("컨트롤러");
    	ExchangeRateResponseDto responseDto = exchangeRateService.getExchangeRate(countryCode);
        return ResponseEntity.ok(responseDto);
    }
}