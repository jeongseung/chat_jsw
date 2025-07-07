package com.smhrd.gloring.oauth;

import java.util.Map;

//다양한 소셜 로그인 서비스의 사용자 정보를 표준화하기 위한 인터페이스
public interface OAuth2UserInfo {
    Map<String, Object> getAttributes();
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
}
