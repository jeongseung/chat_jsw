package com.smhrd.gloring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.gloring.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	
	Optional<User> findByEmail(String email);
	
	//이메일 중복 체크
	boolean existsByEmail(String email);
}
