package com.smhrd.gloring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.gloring.entity.DailyRanking;

import java.time.LocalDate;
import java.util.List;

public interface DailyRankingRepository extends JpaRepository<DailyRanking, Long> {
    @Query("SELECT dr FROM DailyRanking dr JOIN FETCH dr.keyword " +
           "WHERE dr.category.id = :categoryId " +
           "AND dr.rankDate >= :startDate " +
           "AND dr.rank <= :topN " +
           "ORDER BY dr.rankDate DESC, dr.rank ASC")
    List<DailyRanking> findRankings(@Param("categoryId") Long categoryId,
                                    @Param("startDate") LocalDate startDate,
                                    @Param("topN") int topN);
}