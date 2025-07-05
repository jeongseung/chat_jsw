package com.smhrd.gloring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.gloring.dto.request.EmailCheckRequestDto;
import com.smhrd.gloring.dto.response.EmailCheckResponseDto;
import com.smhrd.gloring.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 이메일 중복 확인 API
     * @param requestDto 확인할 이메일을 담은 DTO
     * @return 중복 여부와 메시지를 담은 ResponseEntity
     */
    @PostMapping("/check-email")
    public ResponseEntity<EmailCheckResponseDto> checkEmailDuplicate(@Valid @RequestBody EmailCheckRequestDto requestDto) {
        boolean isDuplicate = userService.checkEmailDuplicate(requestDto.getEmail());
        
        // 응답 DTO를 생성하여 반환
        EmailCheckResponseDto response = new EmailCheckResponseDto(isDuplicate);
        
        return ResponseEntity.ok(response);
    }
}