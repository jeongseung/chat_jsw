package com.smhrd.gloring.dto.request;
//NaverDatalabShoppingRequestDto.java
import java.util.List;

//NaverDatalabShoppingRequestDto.java
import java.util.List;

public class NaverDatalabShoppingRequestDto {
 private String startDate;
 private String endDate;
 private String timeUnit;
 private String category;
 private List<Keyword> keyword;
 private String device;
 private String gender;
 private List<String> ages;

 public static class Keyword {
     private String name;
     private List<String> param;

     // Getter/Setter
     public String getName() { return name; }
     public void setName(String name) { this.name = name; }
     public List<String> getParam() { return param; }
     public void setParam(List<String> param) { this.param = param; }
 }

 // Getter/Setter
 public String getStartDate() { return startDate; }
 public void setStartDate(String startDate) { this.startDate = startDate; }
 public String getEndDate() { return endDate; }
 public void setEndDate(String endDate) { this.endDate = endDate; }
 public String getTimeUnit() { return timeUnit; }
 public void setTimeUnit(String timeUnit) { this.timeUnit = timeUnit; }
 public String getCategory() { return category; }
 public void setCategory(String category) { this.category = category; }
 public List<Keyword> getKeyword() { return keyword; }
 public void setKeyword(List<Keyword> keyword) { this.keyword = keyword; }
 public String getDevice() { return device; }
 public void setDevice(String device) { this.device = device; }
 public String getGender() { return gender; }
 public void setGender(String gender) { this.gender = gender; }
 public List<String> getAges() { return ages; }
 public void setAges(List<String> ages) { this.ages = ages; }
}
