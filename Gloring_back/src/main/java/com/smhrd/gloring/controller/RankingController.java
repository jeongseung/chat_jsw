package com.smhrd.gloring.controller;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;
=======
>>>>>>> 54271c89f25123f4bb882eb54f22b800964a05ba
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.gloring.dto.response.RankingResponseDto;
import com.smhrd.gloring.service.RankingService;
import com.smhrd.gloring.type.PeriodType;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/rankings")
@RequiredArgsConstructor
<<<<<<< HEAD
@CrossOrigin("http://localhost:5173")
=======
>>>>>>> 54271c89f25123f4bb882eb54f22b800964a05ba
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<RankingResponseDto> getRankings(
            @RequestParam String categoryName,
            @RequestParam PeriodType period) {
        RankingResponseDto rankings = rankingService.getRankings(categoryName, period);
        return ResponseEntity.ok(rankings);
    }
    
    // 간단한 예외 처리 (실제 프로젝트에서는 @ControllerAdvice 를 사용하는 것이 더 좋습니다)
    @org.springframework.web.bind.annotation.ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
    
    @org.springframework.web.bind.annotation.ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }
}