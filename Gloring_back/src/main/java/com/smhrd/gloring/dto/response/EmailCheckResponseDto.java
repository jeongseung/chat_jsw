package com.smhrd.gloring.dto.response;

import lombok.Getter;

@Getter
public class EmailCheckResponseDto {

    private final boolean isDuplicate;
    private final String message;

    public EmailCheckResponseDto(boolean isDuplicate) {
        this.isDuplicate = isDuplicate;
        this.message = isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.";
    }
}