package com.smhrd.gloring.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.gloring.entity.WeeklyRanking;

public interface WeeklyRankingRepository extends JpaRepository<WeeklyRanking, Long> {
    @Query("SELECT wr FROM WeeklyRanking wr JOIN FETCH wr.keyword " +
           "WHERE wr.category.id = :categoryId " +
           "AND wr.weekStartDate >= :startDate " +
           "AND wr.rank <= :topN " +
           "ORDER BY wr.weekStartDate DESC, wr.rank ASC")
    List<WeeklyRanking> findRankings(@Param("categoryId") Long categoryId,
                                     @Param("startDate") LocalDate startDate,
                                     @Param("topN") int topN);
}