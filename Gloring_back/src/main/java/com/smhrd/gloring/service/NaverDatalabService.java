package com.smhrd.gloring.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smhrd.gloring.dto.request.NaverDatalabShoppingRequestDto;
import com.smhrd.gloring.dto.response.NaverDatalabShoppingResponseDto;

import org.springframework.http.*;

@Service
public class NaverDatalabService {
    private final RestTemplate restTemplate;

    public NaverDatalabService(org.springframework.boot.web.client.RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public NaverDatalabShoppingResponseDto getShoppingCategoryKeywords(NaverDatalabShoppingRequestDto requestDto) {
        String url = "https://openapi.naver.com/v1/datalab/shopping/category/keywords";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", "kW3WHjeyqV9yAi_0AHcL");
        headers.set("X-Naver-Client-Secret", "RiYlpTca18");

        HttpEntity<NaverDatalabShoppingRequestDto> entity = new HttpEntity<>(requestDto, headers);

        ResponseEntity<NaverDatalabShoppingResponseDto> response = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            NaverDatalabShoppingResponseDto.class
        );
        return response.getBody();
    }
}
