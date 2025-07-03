package com.smhrd.gloring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.gloring.dto.request.CalculatorRequestDto;
import com.smhrd.gloring.dto.response.CalculatorResponseDto;
import com.smhrd.gloring.service.CalculatorService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/cal")
@RestController
public class CalculatorController {

	
	private final CalculatorService calculatorService;
	
	public CalculatorResponseDto computeCalculator(CalculatorRequestDto dto) {
		
		return calculatorService.computeCalculator(dto);
	}
	
}
