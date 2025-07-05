 package com.smhrd.gloring.dto.response;

//NaverDatalabShoppingResponseDto.java
import java.util.List;

//NaverDatalabShoppingResponseDto.java
import java.util.List;

public class NaverDatalabShoppingResponseDto {
 private String startDate;
 private String endDate;
 private String timeUnit;
 private List<Result> results;

 public static class Result {
     private String title;
     private List<String> keyword;
     private List<Data> data;

     // Getter/Setter
     public String getTitle() { return title; }
     public void setTitle(String title) { this.title = title; }
     public List<String> getKeyword() { return keyword; }
     public void setKeyword(List<String> keyword) { this.keyword = keyword; }
     public List<Data> getData() { return data; }
     public void setData(List<Data> data) { this.data = data; }
 }

 public static class Data {
     private String period;
     private double ratio;

     // Getter/Setter
     public String getPeriod() { return period; }
     public void setPeriod(String period) { this.period = period; }
     public double getRatio() { return ratio; }
     public void setRatio(double ratio) { this.ratio = ratio; }
 }

 // Getter/Setter
 public String getStartDate() { return startDate; }
 public void setStartDate(String startDate) { this.startDate = startDate; }
 public String getEndDate() { return endDate; }
 public void setEndDate(String endDate) { this.endDate = endDate; }
 public String getTimeUnit() { return timeUnit; }
 public void setTimeUnit(String timeUnit) { this.timeUnit = timeUnit; }
 public List<Result> getResults() { return results; }
 public void setResults(List<Result> results) { this.results = results; }
}
