package com.smhrd.gloring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.gloring.dto.request.CalculatorRequestDto;
import com.smhrd.gloring.dto.response.CalculatorResponseDto;
import com.smhrd.gloring.service.CalculatorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cal")
public class CalculatorController {

    private final CalculatorService calculatorService;

    // 계산기 정보 저장 API
    @PostMapping
    public ResponseEntity<CalculatorResponseDto> saveCalculator(@RequestBody CalculatorRequestDto requestDto, Authentication authentication) {
        // Spring Security의 Authentication 객체에서 현재 로그인된 사용자의 이메일(username)을 가져옴
        String userEmail = authentication.getName();
        
        CalculatorResponseDto responseDto = calculatorService.saveCalculator(requestDto, userEmail);
        
        // 생성 성공 시 HTTP 201 Created 상태 코드와 함께 결과 반환
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 사용자의 모든 계산기 정보 조회 API
    @GetMapping
    public ResponseEntity<List<CalculatorResponseDto>> getUserCalculators(Authentication authentication) {
        // 현재 로그인된 사용자의 이메일(username)을 가져옴
        String userEmail = authentication.getName();
        
        List<CalculatorResponseDto> calculatorList = calculatorService.getCalculatorsByUser(userEmail);
        
        // 조회 성공 시 HTTP 200 OK 상태 코드와 함께 결과 리스트 반환
        return ResponseEntity.ok(calculatorList);
    }
    
    /**
     * 특정 ID의 계산기 기록을 상세 조회하는 API
     * @param calculatorId 조회할 계산기록의 ID
     * @return 특정 계산 기록의 모든 상세 정보 (CalculatorResponseDto)
     */
    @GetMapping("/{calculatorId}")
    public ResponseEntity<CalculatorResponseDto> getCalculatorById(@PathVariable Long calculatorId) {
        CalculatorResponseDto calculator = calculatorService.getCalculatorById(calculatorId);
        return ResponseEntity.ok(calculator);
    }
    
    
}