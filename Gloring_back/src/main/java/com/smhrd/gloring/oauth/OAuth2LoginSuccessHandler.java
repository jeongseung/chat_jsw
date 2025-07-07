package com.smhrd.gloring.oauth;import com.smhrd.gloring.jwt.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        
        String jwt = jwtTokenProvider.generateToken(authentication);
        
        // 프론트엔드로 JWT 토큰을 담아 리디렉션
        // 실제 프론트엔드 주소로 변경해야 합니다.
        String redirectUrl = "http://43.201.67.86:173/oauth/redirect?token=" + jwt;
        response.sendRedirect(redirectUrl);
    }
}