package com.smhrd.gloring.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.gloring.entity.ShoppingCategory;

import java.util.Optional;

public interface ShoppingCategoryRepository extends JpaRepository<ShoppingCategory, Long> {
    Optional<ShoppingCategory> findByCategoryName(String categoryName);
}