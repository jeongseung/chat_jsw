package com.smhrd.gloring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.gloring.entity.Calculator;

public interface CalculatorRepository extends JpaRepository<Calculator, Long>{

}
