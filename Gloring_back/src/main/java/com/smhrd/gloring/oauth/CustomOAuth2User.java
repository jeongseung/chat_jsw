package com.smhrd.gloring.oauth;

import com.smhrd.gloring.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

// UserDetails 인터페이스를 함께 구현하도록 수정
public class CustomOAuth2User implements OAuth2User, UserDetails {

    private final User user;
    private final Map<String, Object> attributes;

    public CustomOAuth2User(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    // ======== OAuth2User의 메서드 ========
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        // OAuth2 표준에서는 사용자의 고유 식별자를 반환해야 함
        return user.getProviderId();
    }

    // ======== UserDetails의 메서드 (User 객체에 위임) ========
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getAuthorities();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // UserDetails의 getUsername은 우리 시스템에서 ID 역할을 하는 이메일을 반환
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
