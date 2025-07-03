package com.smhrd.gloring.controller;

import org.springframework.web.bind.annotation.*;

import com.smhrd.gloring.dto.request.NaverDatalabShoppingRequestDto;
import com.smhrd.gloring.dto.response.NaverDatalabShoppingResponseDto;
import com.smhrd.gloring.service.NaverDatalabService;


@RestController
@RequestMapping("/datalab")
public class NaverDatalabController {
    private final NaverDatalabService naverDatalabService;
    public NaverDatalabController(NaverDatalabService naverDatalabService) {
        this.naverDatalabService = naverDatalabService;
    }
 

    @PostMapping("/shopping/category/keywords")
    public NaverDatalabShoppingResponseDto getCategoryKeywords(
        @RequestBody NaverDatalabShoppingRequestDto requestDto
    ) {
    	System.out.println("일단 들어옴");
        return naverDatalabService.getShoppingCategoryKeywords(requestDto);
    }
}
