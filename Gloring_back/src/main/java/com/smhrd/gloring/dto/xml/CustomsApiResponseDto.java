// src/main/java/kr/smhrd/navertest/dto/xml/CustomsApiResponseDto.java
package com.smhrd.gloring.dto.xml;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper; // <<< Import 추가
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@XmlRootElement(name = "response")
@XmlAccessorType(XmlAccessType.FIELD)
public class CustomsApiResponseDto {

    @XmlElement
    private Header header;
    @XmlElement
    private Body body;

    @Getter @Setter @ToString
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Header {
        @XmlElement
        private String resultCode;
        @XmlElement
        private String resultMsg;
    }

    // ================== 🔥 여기가 최종 수정 포인트 🔥 ==================
    @Getter @Setter @ToString
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Body {
        // 1. @XmlElementWrapper: <item> 태그들이 <items>라는 태그로 감싸져 있다고 명시합니다.
        // 2. @XmlElement: 반복되는 태그의 이름이 <item>이라고 명시합니다.
        @XmlElementWrapper(name = "items")
        @XmlElement(name = "item")
        private List<Item> itemList;
    }
    
    // <<< 삭제 >>>
    // Items 클래스는 이제 필요 없으므로 완전히 삭제합니다.
    /*
    @Getter @Setter @ToString
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Items {
        @XmlElement(name = "item")
        private List<Item> itemList;
    }
    */
    // =================================================================

    @Getter @Setter @ToString
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Item {
        @XmlElement
        private String aplyBgnDt;
        @XmlElement
        private String cntySgn;
        @XmlElement
        private String currSgn;
        @XmlElement
        private String fxrt;
        @XmlElement
        private String imexTp;
        @XmlElement
        private String mtryUtNm;
    }
}