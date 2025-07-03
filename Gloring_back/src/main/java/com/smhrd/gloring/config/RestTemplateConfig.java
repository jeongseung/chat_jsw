// src/main/java/kr/smhrd/navertest/config/RestTemplateConfig.java
package com.smhrd.gloring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.Collections; // Import 추가

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(Jaxb2RootElementHttpMessageConverter jaxbConverter) {
        RestTemplate restTemplate = new RestTemplate();
        // 🔥 핵심 수정: RestTemplate이 "오직" JAXB 컨버터만 사용하도록 설정합니다.
        // 다른 컨버터가 응답을 가로채는 것을 원천적으로 방지합니다.
        restTemplate.setMessageConverters(Collections.singletonList(jaxbConverter));
        return restTemplate;
    }

    @Bean
    public Jaxb2RootElementHttpMessageConverter jaxb2RootElementHttpMessageConverter() {
        return new Jaxb2RootElementHttpMessageConverter();
    }
}
