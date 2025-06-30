import React from "react";
import "./Calculator.css";

export default function Calculator() {
  return (
    <section className="calculator">
      <h2 className="calculator-title">순이익 계산 시뮬레이터</h2>
      <p className="calculator-desc">AI로 HS코드를 추천 받고 편하게 계산해보세요.</p>

      <form className="calculator-form">
        <div className="calculator-row">
          <div className="calculator-group">
            <span>품목명 {'>'}</span>
            <input type="text" placeholder="상세하게 적어주세요. Ex) 가죽 재질의 팔찌"></input>
            <span>원산지 {'>'}</span>
            <input type="text" placeholder="구매 사이트 상세페이지 참조"></input>
            <button>Ai 검색</button>
          </div>

          <div className="calculator-group">
            <label>관세 조회 항목</label>
            <select>
              <option>중국</option>
              <option>미국</option>
            </select>
          </div>

          <div className="calculator-group">
            <label>환율</label>
            <input type="text" placeholder="1317.27" />
          </div>

          <div className="calculator-group">
            <label>최근 가격</label>
            <input type="text" placeholder="5390원" />
          </div>

          <div className="calculator-group">
            <label>운임비</label>
            <input type="text" placeholder="3200원" />
          </div>

          <div className="calculator-group">
            <label>FTA</label>
            <input type="text" placeholder="해당 없음 또는 % 입력" />
          </div>

          <div className="calculator-group">
            <label>관세</label>
            <input type="text" placeholder="8%" />
          </div>

          <div className="calculator-group">
            <label>기타 제품 내용</label>
            <input type="text" placeholder="예: 브랜드, 원산지 등" />
          </div>
        </div>

        <div className="calculator-row">
          <div className="calculator-group">
            <label>제품 판매가</label>
            <input type="text" placeholder="12500원" />
          </div>

          <div className="calculator-group">
            <label>배송비</label>
            <input type="text" placeholder="2500원" />
          </div>

          <div className="calculator-group">
            <label>판매 플랫폼 수수료</label>
            <select>
              <option>네이버 스마트스토어 6%</option>
              <option>쿠팡 12%</option>
            </select>
          </div>

          <div className="calculator-group">
            <label>카드결제 수수료</label>
            <input type="text" placeholder="3.64%" />
          </div>

          <div className="calculator-group">
            <label>환불율</label>
            <input type="text" placeholder="2%" />
          </div>

          <div className="calculator-group">
            <label>판매 수수료</label>
            <input type="text" placeholder="3%" />
          </div>

          <div className="calculator-group">
            <label>부가세</label>
            <input type="text" placeholder="1%" />
          </div>
        </div>

        <div className="calculator-summary">
          <div className="summary-box">
            <h4>순수익금</h4>
            <p>0 원</p>
          </div>
          <div className="summary-box">
            <h4>마진율</h4>
            <p>0 %</p>
          </div>
        </div>

        <div className="calculator-actions">
          <button type="submit" className="submit-button">계산하기</button>
        </div>
      </form>
    </section>
  );
}
