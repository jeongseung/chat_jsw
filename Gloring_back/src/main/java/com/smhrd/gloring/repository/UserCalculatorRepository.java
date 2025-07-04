package com.smhrd.gloring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.gloring.entity.User;
import com.smhrd.gloring.entity.UserCalculator;

public interface UserCalculatorRepository extends JpaRepository<UserCalculator, Long>{

	List<UserCalculator> findByUser(User user);
}
