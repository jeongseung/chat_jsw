package com.smhrd.gloring.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class RankingPeriodDto {
    private String period; // "2024-05-01" 과 같은 날짜 문자열
    private List<KeywordRankDto> topKeywords;
}