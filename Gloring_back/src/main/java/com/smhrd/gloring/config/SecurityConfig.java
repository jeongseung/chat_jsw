package com.smhrd.gloring.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.smhrd.gloring.jwt.JwtAuthenticationFilter;
import com.smhrd.gloring.oauth.CustomOAuth2UserService;
import com.smhrd.gloring.oauth.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler OAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    // 비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager 빈 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 허용할 출처(프론트엔드 서버 URL)를 설정합니다. 실제 운영 환경에 맞게 수정해주세요.
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://127.0.0.1:5173"));
        // 허용할 HTTP 메서드를 설정
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // 허용할 헤더를 설정
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // 자격 증명(쿠키 등)을 허용
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 경로에 대해 위 CORS 설정을 적용
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //실제 보안 규칙을 설정하는 메서드
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
		        // CORS 설정을 활성화 (위에 정의한 corsConfigurationSource Bean을 사용)
		        .cors(withDefaults())
                // CSRF 보호 비활성화
                .csrf(csrf -> csrf.disable())
                // 세션을 사용하지 않음 (STATELESS)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // HTTP 요청에 대한 접근 권한 설정
                .authorizeHttpRequests(authorize -> authorize
                        // "/api/auth/**" 경로는 모두 허용
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )
                // OAuth2 로그인 설정 추가
                .oauth2Login(oauth2 -> oauth2
                    .userInfoEndpoint(userInfo -> userInfo
                        .userService(customOAuth2UserService) // 커스텀 서비스 등록
                    )
                    .successHandler(OAuth2LoginSuccessHandler) // 성공 핸들러 등록
                );

      
        // 직접 만든 JWT 필터를 UsernamePasswordAuthenticationFilter 전에 추가
        //이 필터가 요청 헤더의 JWT를 검사하여 사용자를 인증
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}