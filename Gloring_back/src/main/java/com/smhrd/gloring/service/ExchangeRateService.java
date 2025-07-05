// src/main/java/kr/smhrd/navertest/service/ExchangeRateService.java
package com.smhrd.gloring.service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smhrd.gloring.dto.response.ExchangeRateResponseDto;
import com.smhrd.gloring.dto.xml.CustomsApiResponseDto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRateService {

    private final RestTemplate restTemplate;

    @Value("${api.customs.url}")
    private String apiUrl;

    @Value("${api.customs.service-key}")
    private String serviceKey;

    public ExchangeRateResponseDto getExchangeRate(String countryCode) {
        // 1. API 요청을 위한 URL 생성
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String finalUrl = String.format("%s?serviceKey=%s&aplyBgnDt=%s&weekFxrtTpcd=2",
                apiUrl, serviceKey, today);

      
        // 2. RestTemplate을 사용하여 API 호출 및 XML 데이터 파싱
        CustomsApiResponseDto response = restTemplate.getForObject(finalUrl, CustomsApiResponseDto.class);

        // 3. 응답 유효성 검사 (내부 로직도 수정됨)
        validateResponse(response);

        // 4. 전체 환율 목록에서 요청된 국가 코드에 해당하는 정보 찾기
        // <<< 수정 포인트 >>> 중간의 .getItems() 제거
        List<CustomsApiResponseDto.Item> itemList = response.getBody().getItemList();
        CustomsApiResponseDto.Item foundItem = findItemByCountryCode(itemList, countryCode);

        // 5. 찾은 정보를 프론트엔드에 전달할 DTO로 변환하여 반환
        return convertToResponseDto(foundItem);
    }

    /**
     * API 응답 객체의 유효성을 검사하는 private 헬퍼 메서드
     * @param response RestTemplate으로부터 받은 응답 객체
     */
    private void validateResponse(CustomsApiResponseDto response) {
        if (response == null || response.getHeader() == null) {
            throw new RuntimeException("API 응답 파싱에 실패했습니다. DTO와 XML 구조를 확인하세요.");
        }
        if (!"00".equals(response.getHeader().getResultCode())) {
            throw new RuntimeException("관세청 API 오류: " + response.getHeader().getResultMsg());
        }
        
        // <<< 수정 포인트 >>> .getItems() 제거 및 .isEmpty()로 더 안전하게 검사
        if (response.getBody() == null || response.getBody().getItemList() == null || response.getBody().getItemList().isEmpty()) {
            throw new RuntimeException("정상 응답이나 환율 데이터(item)가 없습니다. (주말, 공휴일 또는 데이터 미고시)");
        }
    }

    /**
     * 환율 아이템 리스트에서 특정 국가 코드에 해당하는 아이템을 찾는 private 헬퍼 메서드
     * @param items 전체 환율 아이템 리스트
     * @param countryCode 찾고자 하는 국가 코드 (예: "EU")
     * @return 발견된 아이템 객체
     */
    private CustomsApiResponseDto.Item findItemByCountryCode(List<CustomsApiResponseDto.Item> items, String countryCode) {
        return items.stream()
                .filter(item -> countryCode.equalsIgnoreCase(item.getCntySgn()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("해당 국가 코드에 대한 환율 정보가 없습니다: " + countryCode));
    }

    /**
     * API 응답 아이템을 프론트엔드에 전달할 DTO로 변환하는 private 헬퍼 메서드
     * @param item 찾아낸 환율 아이템 객체
     * @return 프론트엔드 응답용 DTO
     */
    private ExchangeRateResponseDto convertToResponseDto(CustomsApiResponseDto.Item item) {
        return ExchangeRateResponseDto.builder()
                .countrySign(item.getCntySgn())
                .currencyName(item.getMtryUtNm())
                .exchangeRate(Double.parseDouble(item.getFxrt()))
                .applyDate(item.getAplyBgnDt())
                .build();
    }
}