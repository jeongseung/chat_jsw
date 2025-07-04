package com.smhrd.gloring.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.gloring.dto.response.KeywordRankDto;
import com.smhrd.gloring.dto.response.RankingPeriodDto;
import com.smhrd.gloring.dto.response.RankingResponseDto;
import com.smhrd.gloring.entity.DailyRanking;
import com.smhrd.gloring.entity.MonthlyRanking;
import com.smhrd.gloring.entity.ShoppingCategory;
import com.smhrd.gloring.entity.WeeklyRanking;
import com.smhrd.gloring.repository.DailyRankingRepository;
import com.smhrd.gloring.repository.MonthlyRankingRepository;
import com.smhrd.gloring.repository.ShoppingCategoryRepository;
import com.smhrd.gloring.repository.WeeklyRankingRepository;
import com.smhrd.gloring.type.PeriodType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingService {

    private final ShoppingCategoryRepository categoryRepository;
    private final DailyRankingRepository dailyRankingRepository;
    private final WeeklyRankingRepository weeklyRankingRepository;
    private final MonthlyRankingRepository monthlyRankingRepository;
    private static final int TOP_N = 10; // 10위까지 조회

    public RankingResponseDto getRankings(String categoryName, PeriodType periodType) {
        // 1. 카테고리 조회
        ShoppingCategory category = categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 카테고리입니다: " + categoryName));

        // 2. 기간 타입에 따라 분기 처리하여 랭킹 데이터 조회
        List<RankingPeriodDto> rankingPeriods;
        switch (periodType) {
            case DAILY:
                LocalDate dailyStartDate = LocalDate.now().minusDays(30);
                List<DailyRanking> dailyRankings = dailyRankingRepository.findRankings(category.getId(), dailyStartDate, TOP_N);
                rankingPeriods = groupDailyRankings(dailyRankings);
                break;
            case WEEKLY:
                LocalDate weeklyStartDate = LocalDate.now().minusWeeks(26); // 약 6개월
                List<WeeklyRanking> weeklyRankings = weeklyRankingRepository.findRankings(category.getId(), weeklyStartDate, TOP_N);
                rankingPeriods = groupWeeklyRankings(weeklyRankings);
                break;
            case MONTHLY:
                LocalDate monthlyStartDate = LocalDate.now().minusMonths(12).withDayOfMonth(1); // 12개월 전 1일
                List<MonthlyRanking> monthlyRankings = monthlyRankingRepository.findRankings(category.getId(), monthlyStartDate, TOP_N);
                rankingPeriods = groupMonthlyRankings(monthlyRankings);
                break;
            default:
                throw new IllegalArgumentException("지원하지 않는 기간 타입입니다.");
        }

        // 3. 최종 응답 DTO 생성
        return new RankingResponseDto(categoryName, periodType.name(), rankingPeriods);
    }

    // --- 데이터 가공 메소드 (Java Stream API 활용) ---

    private List<RankingPeriodDto> groupDailyRankings(List<DailyRanking> rankings) {
        Map<LocalDate, List<KeywordRankDto>> groupedByDate = rankings.stream()
                .collect(Collectors.groupingBy(
                        DailyRanking::getRankDate,
                        Collectors.mapping(
                                r -> new KeywordRankDto(r.getRank(), r.getKeyword().getKeywordText()),
                                Collectors.toList()
                        )
                ));
        return toRankingPeriodDtoList(groupedByDate);
    }

    private List<RankingPeriodDto> groupWeeklyRankings(List<WeeklyRanking> rankings) {
        Map<LocalDate, List<KeywordRankDto>> groupedByDate = rankings.stream()
                .collect(Collectors.groupingBy(
                        WeeklyRanking::getWeekStartDate,
                        Collectors.mapping(
                                r -> new KeywordRankDto(r.getRank(), r.getKeyword().getKeywordText()),
                                Collectors.toList()
                        )
                ));
        return toRankingPeriodDtoList(groupedByDate);
    }

    private List<RankingPeriodDto> groupMonthlyRankings(List<MonthlyRanking> rankings) {
        Map<LocalDate, List<KeywordRankDto>> groupedByDate = rankings.stream()
                .collect(Collectors.groupingBy(
                        MonthlyRanking::getMonthStartDate,
                        Collectors.mapping(
                                r -> new KeywordRankDto(r.getRank(), r.getKeyword().getKeywordText()),
                                Collectors.toList()
                        )
                ));
        return toRankingPeriodDtoList(groupedByDate);
    }

    private List<RankingPeriodDto> toRankingPeriodDtoList(Map<LocalDate, List<KeywordRankDto>> groupedMap) {
        return groupedMap.entrySet().stream()
                .map(entry -> new RankingPeriodDto(entry.getKey().toString(), entry.getValue()))
                .sorted((o1, o2) -> o2.getPeriod().compareTo(o1.getPeriod())) // 최신순으로 정렬
                .collect(Collectors.toList());
    }
}