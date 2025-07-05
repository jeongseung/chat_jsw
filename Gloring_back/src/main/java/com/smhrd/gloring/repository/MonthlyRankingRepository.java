package com.smhrd.gloring.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.gloring.entity.MonthlyRanking;

public interface MonthlyRankingRepository extends JpaRepository<MonthlyRanking, Long> {
    @Query("SELECT mr FROM MonthlyRanking mr JOIN FETCH mr.keyword " +
           "WHERE mr.category.id = :categoryId " +
           "AND mr.monthStartDate >= :startDate " +
           "AND mr.rank <= :topN " +
           "ORDER BY mr.monthStartDate DESC, mr.rank ASC")
    List<MonthlyRanking> findRankings(@Param("categoryId") Long categoryId,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("topN") int topN);
}