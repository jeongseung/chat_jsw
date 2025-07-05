package com.smhrd.gloring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.gloring.dto.request.LoginRequestDto;
import com.smhrd.gloring.dto.request.SignupRequestDto;
import com.smhrd.gloring.dto.response.JwtAuthenticationResponse;
import com.smhrd.gloring.entity.Role;
import com.smhrd.gloring.entity.User;
import com.smhrd.gloring.jwt.JwtTokenProvider;
import com.smhrd.gloring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequest) {
        // 1. 사용자 인증 시도
    	// Spring Security가 내부적으로 UserDetailsServiceImpl을 호출하여 사용자를 찾고
    	// PasswordEncoder로 비밀번호를 비교
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // 2. SecurityContext에 인증 정보 저장
        // 인증에 성공하면, 인증정보를 SecurityContext에 저장
        // (Stateless 방식에서는 필수적이지는 않지만 명시적으로 처리하는 코드)
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. JWT 토큰 생성
        String jwt = tokenProvider.generateToken(authentication);
        // 생성된 JWT를 JwtAuthenticationResponse에 담아 클라이언트에게 반환
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequestDto signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // 사용자 생성
        User user = User.builder()
                .email(signUpRequest.getEmail())
                .name(signUpRequest.getName())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}