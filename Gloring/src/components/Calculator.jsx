import React from "react";
import "./Calculator.css";
import {useState} from 'react'

export default function Calculator() {

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [hsCode, setHsCode] = useState();
  const [exRate, setExRate] = useState();
  const [purchase, setPurchase] = useState();
  const [transport, setTransport] = useState();
  const [subCost, setSubCost] = useState();
  const [fta, setFta] = useState("");
  const [tariff, setTariff] = useState();
  const [totalPurchase, setTotalPurchase] = useState();

  const [sales, setSales] = useState();
  const [transportCost, setTransportCost] = useState();
  const [adCost, setAdCost] = useState();
  const [platForm, setPlatForm] = useState();
  const [subFee, setSubFee] = useState();
  const [totalFee, setTotalFee] = useState();
  const [vat, setVat] = useState();
  const [totalSales, setTotalSales] = useState();
  
  const [benefit, setBenefit] = useState();
  const [benefitPer, setBenefitPer] = useState(); 
  

  const submit = async (e) => {
        e.preventDefault();

        // axios를 통해서 post방식으로 정보를 전달
        
        // const res = await axios.post(URL, {
        //     money,
        //     purchase,
        //     exchangeRate,
        //     transportCost,
        //     otherCost,
        //     origin,
        //     tariff,
        //     vat,
        //     totalPurchase
        // })
    }

  return (
    <section className="calculator">
      <h2 className="calculator-title">순이익 계산 시뮬레이터</h2>
      <p className="calculator-desc">AI로 HS코드를 추천 받고 편하게 계산해보세요.</p>
      <hr/>
      <form className="calculator-form" onSubmit={submit}>
          <div className="calculator-basic">
            <label>품목명 {'>'}</label>
            <input type="text" className="hsCode" placeholder="상세하게 적어주세요. Ex) 가죽 재질의 팔찌"
            value={name} onChange={(e)=>setName(e.target.value)}></input>
            <button className="btn-hs">HS 코드 조회</button>

            <label>원산지 {'>'}</label>
            <input type="text" placeholder="구매 사이트 상세페이지 참조"
            value={origin} onChange={(e)=>setOrigin(e.target.value)}></input>
            <button className="btn-ai">AI 검색</button>
          </div>
        <div className="cal-data">
          <div className="calculator-purchase">

          <div className="calculator-group">
            <label>HS 코드</label>
            <input type="number" placeholder="예) 0000.00"
            value={hsCode} onChange={(e)=>setHsCode(e.target.value)}/>
          </div>
          <div className="calculator-group">
            <label>관세청 고시환율</label>
            <div className="exchange">
            <select className="exchange-rate">
              <option>중국</option>
              <option>EU</option>
              <option>베트남</option>
              <option>인도네시아</option>
            </select>
            <input type="number" placeholder="1317.27" className="exchange-rate"
            value={exRate} onChange={(e)=>setExRate(e.target.value)}/>
            </div>
          </div>

          <div className="calculator-group">
            <label>매입액</label>
            <input type="number" placeholder="0원"
            value={purchase} onChange={(e)=>setPurchase(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label>운임비</label>
            <input type="number" placeholder="0원"
            value={transport} onChange={(e)=>setTransport(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label>기타 비용</label>
            <input type="number" placeholder="0원"
            value={subCost} onChange={(e)=>setSubCost(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label>FTA</label>
            <input type="text" placeholder="FTA 적용 시 표시됩니다!"
            value={fta} onChange={(e)=>setFta(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label>관세</label>
            <input type="text" placeholder="8%"
            value={tariff} onChange={(e)=>setTariff(e.target.value)}/>
          </div>

          <div className="total">
            <label>매입 시 발생한 비용</label>
            <input type="number" placeholder="0원"
            value={totalPurchase} onChange={(e)=>setTotalPurchase(e.target.value)}/>
          </div>
        </div>

        <div className="calculator-sales">
          <div className="calculator-group">
            <label>예상 매출액</label>
            <input type="number" placeholder="0원"
            value={sales} onChange={(e)=>setSales(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <div className="tooltip-label">
            <label>배송비</label>
            <div className="tooltip">
              <div class="tooltip-circle">?</div>
              <span class="tooltip-text">매입 시 발생하는 운임비와는
                <br/>다른 항목으로 매출 시 별도로
                <br/>발생하는 배송비에 대한 항목입니다.
              </span>
              </div>
            </div>
            <input type="number" placeholder="0원"
            value={transportCost} onChange={(e)=>setTransportCost(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label>광고비</label>
            <input type="number" placeholder="0원"
            value={adCost} onChange={(e)=>setAdCost(e.target.value)}/>
          </div>

          <div className="calculator-group">
            <label className="fee-text">수수료</label>
            <ul className="fee-group">
              <li>
                <label>판매 플랫폼 수수료</label>
                <div className="select-input">
                  <select className="fee">
                    <option value={'default'}>직접입력하기</option>
                    <option value={'naver'}>네이버 스마트스토어</option>
                    <option value={'coupang'}>쿠팡</option>
                  </select>
              <input type="number" placeholder="0원" className="fee"
              value={platForm} onChange={(e)=>setPlatForm(e.target.value)}></input>
                </div>
              </li>
              <li>
                <label>기타 수수료</label>
                <input type="number" placeholder="0원" className="ect-fee"
                value={subFee} onChange={(e)=>setSubFee(e.target.value)}></input>
                <label>총 수수료</label>
                <input type="number" placeholder="0원" className="ect-fee"
                value={totalFee} onChange={(e)=>setTotalFee(e.target.value)}/>
              </li>
            </ul>
          </div>
          
          <div className="calculator-group">
            <label>부가세</label>
            <div className="select-input">
              <select className="fee">
                <option value="">간이과세자</option>
                <option value="">일반과세자</option>
              </select>
              <input type="number" placeholder="1%"  className="fee"
              value={vat} onChange={(e)=>setVat(e.target.value)}/>
            </div>
          </div>
          <div className="total">
            <label>매출 시 발생한 수익</label>
            <input type="number" placeholder="0원"
            value={totalSales} onChange={(e)=>setTotalSales(e.target.value)}/>
          </div>
        </div>
        </div>

        <div className="calculator-summary">
          <div className="summary-box">
            <h4>순이익</h4>
            <input type="number" placeholder="0원" 
            value={benefit} onChange={(e)=>setBenefit(e.target.value)}/>
          </div>
          <div className="summary-box">
            <h4>마진율</h4>
            <input type="number" placeholder="0%" 
            value={benefitPer} onChange={(e)=>setBenefitPer(e.target.value)}/>
          </div>
        </div>

        <div className="calculator-actions">
          <button type="submit" className="submit-button">저장하기</button>
        </div>
      </form>
    </section>
  );
}