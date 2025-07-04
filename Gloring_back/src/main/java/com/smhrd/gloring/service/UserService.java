package com.smhrd.gloring.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smhrd.gloring.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{
	

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
    
    //이메일 중복 처리
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

}
