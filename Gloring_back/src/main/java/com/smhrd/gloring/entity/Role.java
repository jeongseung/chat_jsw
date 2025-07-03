package com.smhrd.gloring.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
	USER("ROLE_USER", "일반 사용자"),
	ADMIN("ROLE_ADMIN", "관리자");
	
	
	
	//Spring Security에서 사용할 권한 이름
    private final String key;
    //화면 등에서 표시할 때 사용할 수 있는 역할의 설명
    private final String title;

 

}
