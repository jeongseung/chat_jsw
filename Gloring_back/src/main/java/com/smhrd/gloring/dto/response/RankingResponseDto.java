package com.smhrd.gloring.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class RankingResponseDto {
    private String categoryName;
    private String periodType;
    private List<RankingPeriodDto> rankings;
}