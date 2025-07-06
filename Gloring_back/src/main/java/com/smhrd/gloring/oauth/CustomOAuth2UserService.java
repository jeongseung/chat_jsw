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
        GoogleUserInfo googleUserInfo = new GoogleUserInfo(oAuth2User.getAttributes());

        String provider = googleUserInfo.getProvider();
        String providerId = googleUserInfo.getProviderId();
        String email = googleUserInfo.getEmail();
        String name = googleUserInfo.getName();

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
                    .password(null) // 소셜 로그인은 비밀번호가 없음
                    .role(Role.USER)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            userRepository.save(user);
        }

        // 수정된 생성자를 사용하여 CustomOAuth2User 객체 생성
        return new CustomOAuth2User(user, oAuth2User.getAttributes());
    }
}
