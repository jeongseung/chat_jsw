package com.smhrd.gloring.oauth;

import com.smhrd.gloring.entity.Role;
import com.smhrd.gloring.entity.User;
import com.smhrd.gloring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        // 로그인 제공자(google, kakao 등)를 확인
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        
        // 제공자에 따라 적절한 UserInfo 객체 생성
        OAuth2UserInfo oAuth2UserInfo = null;
        if (registrationId.equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            // 다른 소셜 로그인을 추가할 경우 이곳에 로직 추가
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다.");
        }

        // UserInfo에서 필요한 정보 추출
        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String email = oAuth2UserInfo.getEmail();
        String name = oAuth2UserInfo.getName();

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;

        if (userOptional.isPresent()) {
            // 이미 가입된 유저라면, 정보를 업데이트
            user = userOptional.get();
            user.update(name);
        } else {
            // 새로 가입하는 유저라면, DB에 저장
            user = User.builder()
                    .email(email)
                    .name(name)
                    .password(null) // 소셜 로그인은 비밀번호 없음
                    .role(Role.USER)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            userRepository.save(user);
        }

        return new CustomOAuth2User(user, oAuth2User.getAttributes());
    }
}