import React, { useEffect, useRef } from "react";
import "./Calculator.css";
import {useState} from 'react'
import Modal from "./Modal";
import axios from 'axios';
import CalculatorHistory from "./CalculatorHistory";
import { useCalculatorUtils } from "../utils/calculatorHooks";
import useCalculatorLogic from "../hooks/calculatorLogic";
import { countryMap } from "../utils/countryMap";

  const {
    formatNumber,
    formatWon,
    parseNumber,
    formatPercent
  } = useCalculatorUtils()

export default function Calculator() {

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [hsCode, setHsCode] = useState();
  const [selectedCountryCode, setSelectedCountryCode] = useState('CN');
  const [countryUnit, setCountryUnit] = useState(countryMap['CN']);
  const [exRate, setExRate] = useState();
  const [foreignPurchase, setForeignPurchase] = useState("");
  const [purchase, setPurchase] = useState();
  const [displayPurchase, setDisplayPurchase] = useState();
  const [transport, setTransport] = useState();
  const [displayTransport, setDisplayTransport] = useState();
  const [subCost, setSubCost] = useState();
  const [displaySubCost, setDisplaySubCost] = useState();
  const [fta, setFta] = useState("");
  const [tariff, setTariff] = useState();
  const [vatChoose, setVatChoose] = useState("10%");
  const [vat, setVat] = useState("10%");
  const [totalPurchase, setTotalPurchase] = useState();
  const [displayTotalPurchase, setDisplayTotalPurchase] = useState();

  const [sales, setSales] = useState();
  const [displaySales, setDisplaySales] = useState();
  const [transportCost, setTransportCost] = useState();
  const [displayTransportCost, setDisplayTransportCost] = useState();
  const [adCost, setAdCost] = useState();
  const [displayAdCost, setDisplayAdCost] = useState();
  const [platFormFee, setPlatFormFee] = useState("");
  const [displayPlatFormFee, setDisplayPlatFormFee] = useState("");
  const [platForm, setPlatForm] = useState();
  const [subFee, setSubFee] = useState();
  const [displaySubFee, setDisplaySubFee] = useState();
  const [totalFee, setTotalFee] = useState();
  const [displayTotalFee, setDisplayTotalFee] = useState();
  const [cost, setCost] = useState();
  const [displayCost, setDisplayCost] = useState();
  const [totalSales, setTotalSales] = useState();
  const [displayTotalSales, setDisplayTotalSales] = useState();
  
  const [benefit, setBenefit] = useState();
  const [benefitPer, setBenefitPer] = useState(); 

  const [tariffAmount, setTariffAmount] = useState();
  const [baseCost, setBaseCost] = useState();
  const [vatAmount, setVatAmount] = useState();
  const [fee, setFee] = useState();

  const [hsData, setHsData] = useState([]);

  const [result, setResult] = useState({})


  const purchaseRef = useRef(null);
  const transportRef = useRef(null);
  const etcCostRef = useRef(null);
  const salesRef = useRef(null);
  const transportCostRef = useRef(null);
  const adCostRef = useRef(null);
  const platformRef = useRef(null);
  const etcFeeRef = useRef(null);
  const subCostRef = useRef(null);
  
  useCalculatorLogic({
    exRate, 
    purchase, 
    transport, 
    subCost, 
    tariff, 
    vat, 
    sales, 
    transportCost, 
    adCost, 
    platForm, 
    subFee, 
    cost, 
    onResultChange: setResult
  })

  useEffect (() => {
    const {
      tariffAmount = 0,
      baseCost = 0,
      vatAmount = 0,
      totalPurchaseCost = 0,
      totalSales = 0,
      fee = 0,
      benefit = 0,
      margin = 0
    } = result;

    setTariffAmount(tariffAmount);
    setBaseCost(baseCost);
    setVatAmount(vatAmount);
    setTotalPurchase(totalPurchaseCost);
    setDisplayTotalPurchase(totalPurchaseCost.toLocaleString());
    setTotalSales(totalSales);
    setDisplayTotalSales(totalSales.toLocaleString());
    setFee(fee);
    setBenefit(benefit);
    setBenefitPer(margin);
    setTotalFee(fee);
    setDisplayTotalFee(formatWon(fee));
  }, [result])


  useEffect(() => {
    // 커서를 접미사 앞 위치로 설정
    const el = purchaseRef.current;
    if (el) {
      const pos = formatWon(foreignPurchase).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [foreignPurchase]);

  useEffect(() => {
    const el = transportRef.current;
    if (el) {
      const pos = formatWon(displayTransport).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displayTransport]);
  
  useEffect(() => {
    const el = etcCostRef.current;
    if (el) {
      const pos = formatWon(displaySubCost).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displaySubCost]);

  useEffect(() => {
    const el = salesRef.current;
    if (el) {
      const pos = formatWon(displaySales).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displaySales]);

  useEffect(() => {
    const el = transportCostRef.current;
    if (el) {
      const pos = formatWon(displayTransportCost).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displayTransportCost]);

  useEffect(() => {
    const el = adCostRef.current;
    if (el) {
      const pos = formatWon(displayAdCost).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displayAdCost]);

  useEffect(() => {
    const el = platformRef.current;
    if (el) {
      const pos = formatWon(displayPlatFormFee).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displayPlatFormFee]);

  useEffect(() => {
    const el = etcFeeRef.current;
    if (el) {
      const pos = formatWon(displaySubFee).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displaySubFee]);

  useEffect(() => {
    const el = subCostRef.current;
    if (el) {
      const pos = formatWon(displayCost).length - 1;
      el.setSelectionRange(pos, pos);
    }
  }, [displayCost]);
  
  const handleChange = (setValue, setDisplay) => (e) => {
    const value = e.target.value;
    const numeric = parseNumber(value);
    setValue(numeric);
    setDisplay(numeric.toLocaleString());
    
  }

  const vatHandleChange = (e) => {
    const value = e.target.value;
    setPlatFormFee(value);

    if (value === "default") {
      // 직접입력 선택 시 input 빈값 유지
      setDisplayPlatFormFee("");
    } else {
      setDisplayPlatFormFee(value);
    }
  }

  const hsCodeSearch = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      alert("품목명을 입력해주세요!")
      return;
    }
    setHsModalOpen(true);
    try {
      const response = await axios.post("http://localhost:8000/ai/getHscode",{
        item: name,
      });
      
      const result = response.data;
      setHsData(result);
      console.log("HS코드 응답(JSON):", JSON.stringify(result, null, 2));
      console.log("HS코드 응답: ", result);
      console.table(response.data);
      // 여기에 HS 코드 결과를 모달에 표시하거나 처리하는 로직 작성
    } catch (error) {
      console.error("HS코드 조회 실패: ", error);
      alert("서버 오류: HS 코드 조회에 실패했습니다!");
    }
  };

  const checkFtaStatus = async () => {
      if (!hsCode || typeof hsCode !== 'string' || hsCode.trim() === "") {
        alert("HS 코드를 입력하거나 선택해주세요.");
        return;
    }
    if (!origin || typeof origin !== 'string' || origin.trim() === "") {
      alert("원산지를 입력해주세요.");
      return;
    }

    console.log("FTA 요청 전송:", {hsCode, origin});

    const origin_country = countryMap[origin] || origin;

    try {
    const response = await axios.post("http://localhost:8000/ai/getFta", {
      hscode: hsCode,
      origin_country: origin_country,
    });

    const data = response.data;
    if (data.fta_status) {
      console.log(data);
      alert("FTA 적용 가능합니다!");
      setFta("FTA 적용 가능합니다!");
      // 🔽 관세율 값 적용
      if (data.tariff_rate !== undefined && data.tariff_rate !== null) {
        const ratePercent = parseFloat(data.tariff_rate) * 100;
        setTariff(ratePercent.toFixed(2)); // 예: 0 → 0.00%
      } 
    } else {
      alert("FTA 적용이 불가능합니다!");
      setFta("FTA 적용이 불가능합니다!");
      
      // FTA 미적용 → 기본값 8% 설정
      setTariff(8);
    }
    } catch (error) {
      console.error("FTA 조회 실패:", error);

      alert("FTA 조회 중 오류가 발생했습니다.");
      }
    };
  
  
  const handleCountryChange = async (e) => {
    const selected = e.target.value;
    setSelectedCountryCode(selected);
    setCountryUnit(countryMap[selected]);

    console.log("선택한 국가코드:", selected);

    try {
      const response = await axios.get(`http://localhost:8090/gloring/exchange-rates/${selected}`);
      console.log("환율 응답 데이터:", response.data);
      const rate = parseFloat(response.data.exchangeRate);

      if (!isNaN(rate)) {
        setExRate(rate);
      } else {
        alert("올바르지 않은 환율 데이터입니다.");
      }
    } catch (error) {
  console.error("환율 조회 실패", error);
  if (error.response) {
    console.log("응답 상태 코드:", error.response.status);
    console.log("응답 내용:", error.response.data);
  } else if (error.request) {
    console.log("요청은 갔지만 응답이 없음:", error.request);
  } else {
    console.log("기타 에러:", error.message);
  }
}
  };

  const handleForeignPurchaseChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setForeignPurchase(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && exRate > 0) {
      const wonValue = Math.round(numValue * exRate);
      setPurchase(wonValue);
      setDisplayPurchase(wonValue.toLocaleString());
    } else {
      setPurchase(0);
      setDisplayPurchase("");
    }
  };
  
  const submit = async(e) => {
        e.preventDefault();

        const token = localStorage.getItem("token")

        const newEntry = {
          productName: name,
          origin: origin,
          hscode: hsCode,
          exchangeRate: parseFloat(exRate || 0),
          purchaseAmountEx: parseFloat(foreignPurchase || 0),
          purchaseAmount: parseFloat(displayPurchase || 0),
          freightFee: parseInt(displayTransport || 0),
          otherFee: parseInt(displaySubCost || 0),
          fta: fta === "FTA 적용 가능합니다!" ? true : false,
          tariff: parseFloat(tariff || 0),
          vat: parseInt(vat || 0),
          purchaseCost: parseFloat(displayTotalPurchase || 0),
          expectedSales: parseInt(displaySales || 0),
          shippingFee: parseInt(displayTransportCost || 0),
          adCost: parseInt(displayAdCost || 0),
          platformFee: parseFloat(displayPlatFormFee || 0),
          otherFees: parseInt(displaySubFee || 0),
          totalFee: parseInt(displayTotalFee || 0),
          cost: parseInt(displayCost || 0),
          netSales: parseInt(displayTotalSales || 0),
          profit: parseInt(benefit || 0),
          revenueRate: parseFloat(benefitPer || 0),
          countryMoney: selectedCountryCode
        };

        console.log(newEntry.expectedSales)

        try {
          const res = await axios.post("http://localhost:8090/gloring/cal", newEntry, {
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
          });
          alert("저장완료!");
          setHistory(prev => [...prev, newEntry])
        } catch (error) {
          console.error("저장 실패 : ", error)
          alert("저장 중 오류 발생")
        }

    }



    const [hsModalOpen, setHsModalOpen] = useState(false);
    const [sumModalOpen, setSumModalOpen] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(()=> {
      
      if (hsModalOpen || sumModalOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }else {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      };
    }, [hsModalOpen, sumModalOpen]);



    const checkLogin = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token")
      if (token) {
        setSumModalOpen(true)
      } else {
        alert("계산 이력 확인은 로그인 후 이용 가능합니다.")
      }
    }

    const onSelectHistory = (entry) => {
      setName(entry.productName || "");
      setOrigin(entry.origin || "");
      setHsCode(entry.hscode || "");
      setSelectedCountryCode(entry.countryMoney || "CN");
      setExRate(entry.exchangeRate || "");

      // 매입
      setForeignPurchase(entry.purchaseAmountEx || "");
      setPurchase(entry.purchaseAmount || 0);
      setDisplayPurchase(entry.purchaseAmount.toLocaleString());

      setTransport(entry.freightFee || 0);
      setDisplayTransport(entry.freightFee.toLocaleString());

      setSubCost(entry.otherFee || 0);
      setDisplaySubCost(entry.otherFee.toLocaleString());

      setFta(entry.fta ? "FTA 적용 가능합니다!" : "FTA 적용이 불가능합니다!");
      setTariff(entry.tariff || 8);
      setVat(entry.vat + "%");

      // 매입원가
      setTotalPurchase(entry.purchaseCost || 0);
      setDisplayTotalPurchase(entry.purchaseCost.toLocaleString());

      // 매출
      setSales(entry.expectedSales || 0);
      setDisplaySales(entry.expectedSales.toLocaleString());

      setTransportCost(entry.shippingFee || 0);
      setDisplayTransportCost(entry.shippingFee.toLocaleString());

      setAdCost(entry.adCost || 0);
      setDisplayAdCost(entry.adCost.toLocaleString());

      setPlatFormFee(entry.platformFee || "");
      setDisplayPlatFormFee(entry.platformFee);

      setSubFee(entry.otherFees || 0);
      setDisplaySubFee(entry.otherFees.toLocaleString());

      setCost(entry.cost || 0);
      setDisplayCost(entry.cost.toLocaleString());

      setTotalSales(entry.netSales || 0);
      setDisplayTotalSales(entry.netSales.toLocaleString());

      setBenefit(entry.profit || 0);
      setBenefitPer(entry.revenueRate || 0);

      setSumModalOpen(false)
    };


  
  return (
    <section className="calculator">
      <div className="calculator-header">
        <div>
          <h2 className="calculator-title">순이익 계산 시뮬레이터</h2>
          <p className="calculator-desc">AI로 HS코드를 추천 받고 편하게 계산해보세요.</p>
        </div>
        <button type="button" className="history-button" onClick={checkLogin}>계산 이력 확인</button>
        {sumModalOpen && (
          <Modal isOpen={sumModalOpen} onClose={()=>setSumModalOpen(false)}>
            <CalculatorHistory onSelectHistory={onSelectHistory}/>
          </Modal>
        )}
      </div>
      <hr/>
      <form className="calculator-form" action="gloring/cal" method="post" onSubmit={submit} onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();}}>
          <div className="calculator-basic">
            <label>품목명 {'>'}</label>
            <input type="text" className="hsCode" placeholder="상세하게 적어주세요. Ex) 가죽 재질의 팔찌"
            value={name} onChange={(e)=>setName(e.target.value)}></input>
            <button className="btn-hs" type="button"
            onClick={hsCodeSearch}>HS 코드 조회</button>
            <Modal isOpen={hsModalOpen} onClose={()=>setHsModalOpen(false)}>
              <h2>AI로 HS코드 추천 받기</h2>
              <hr/>
              <ul className="hs-list">
                <li>HS 코드는 FTA 적용 여부 확인 시 반드시 필요합니다.</li>
                <li>HS 코드에 대한 자세한 내용은 관세청 또는 유니패스에서 
                <br/>확인할 수 있습니다.</li>
              </ul>
                <hr/>
                <span className="list">아래 내용 중 품목에 맞는 항목을 선택하세요.</span>
                <ul className="search-text">
                  {hsData.map((item, idx) => (
                    <li key={idx}
                    onClick={()=>{
                    console.log(item.hscode);
                    setHsCode(item.hscode);
                    setHsModalOpen(false);}}>
                      <div className="content">
                      <span className="code">{item.hscode}</span>{'\u2003'}
                      <span className="itemName">{item.item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
            </Modal>
            <label>원산지 {'>'}</label>
            <input type="text" placeholder="구매 사이트 상세페이지 참조"
            value={origin} onChange={(e)=>setOrigin(e.target.value)}></input>
            <button className="btn-ai" type="button" onClick={checkFtaStatus}>FTA 여부 조회</button>
          </div>
    <div className="cal-text">
      <div className="calculator-purchase">
        <div className="cal-data">
            <div className="calculator-group">
              <label>HS 코드</label>
              <input type="text" placeholder="예) 0000.00.0000"
              value={hsCode || ""} onChange={(e)=>setHsCode(e.target.value)}/>
            </div>
            <div className="calculator-group">
              <label>관세청 고시환율</label>
              <div className="exchange">
                <select className="exchange-rate" value={selectedCountryCode} onChange={handleCountryChange}>
                  <option value="CN">중국</option>
                  <option value="US">미국</option>
                  <option value="JP">일본</option>
                  <option value="SA">사우디</option>
                  <option value="VN">베트남</option>
                  <option value="AU">호주(오스트레일리아)</option>
                  <option value="TW">대만(타이완)</option>
                  <option value="RU">러시아</option>
                  <option value="QA">카타르</option>
                  <option value="KW">쿠웨이트</option>
                  <option value="MY">말레이시아</option>
                  <option value="AE">아랍에미리트</option>
                  <option value="ID">인도네시아</option>
                </select>
              <input type="text" className="exchange-rate" value={exRate || ""} readOnly />
            </div>
          </div>

          <div className="calculator-group">
            <label>매입액</label>
            <div className="turn-won">
              <input ref={purchaseRef} type="text" placeholder={countryUnit} className="country-money"
              value={foreignPurchase ? parseInt(foreignPurchase).toLocaleString() : ''} onChange={handleForeignPurchaseChange}
            onFocus={() => {
            const el = purchaseRef.current;
              if (el) {
            const pos = formatWon(foreignPurchase).length - 1;
            el.setSelectionRange(pos, pos);
              }
            }}/>
              <input type="text" placeholder="0원" pattern="[0-9]*" className="won"
              value={formatWon(displayPurchase)} readOnly/>
            </div>
          </div>

          <div className="calculator-group">
            <label>운임비</label>
            <input ref={transportRef} type="text" placeholder="0원"
            value={formatWon(displayTransport)} onChange={handleChange(setTransport, setDisplayTransport)}
            onClick={() => {const el = transportRef.current;
              if (el) {
            const pos = formatWon(displayTransport).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = transportRef.current;
              if (el) {
            const pos = formatWon(displayTransport).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}/>
          </div>

          <div className="calculator-group">
            <label>매입 시 발생한 기타 비용</label>
            <input ref={etcCostRef} type="text" placeholder="0원"
            value={formatWon(displaySubCost)} onChange={handleChange(setSubCost, setDisplaySubCost)}
            onClick={() => {const el = etcCostRef.current;
              if (el) {
            const pos = formatWon(displaySubCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = etcCostRef.current;
              if (el) {
            const pos = formatWon(displaySubCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}/>
          </div>

          <div className="calculator-group-non-text">
            <div className="tooltip-label">
            <label>FTA</label>
            <div className="tooltip">
              <div className="tooltip-circle">?</div>
              <span className="tooltip-text">미화 기준 150달러 이하의 자가 사용 품목은
                <br/>면세 대상이나, 자가 사용 시 해당되는 조건이고
                <br/>판매 목적일 경우 관세와 부가가치세 납세는 필수입니다.
              </span>
              </div>
            </div>
            <input type="text" placeholder="FTA 적용 시 표시됩니다!"
            value={fta} onChange={(e)=>setFta(e.target.value)}
            onFocus={(e)=>e.target.blur()}/>
          </div>

          <div className="calculator-group-non-text">
            <label>관세율</label>
            <input type="text" placeholder="8%"
            value={formatPercent(tariff)} onChange={(e)=>setTariff(e.target.value)}
            onFocus={(e)=>e.target.blur()}/>
          </div>

          <div className="calculator-group">
            <label>부가세</label>
            <div className="select-input">
              <select className="vat"  value={vat}
              onChange={(e)=> {
                setVat(e.target.value);
                setVatChoose(e.target.value);
              }}>
                <option value="10%">일반과세자</option>
                <option value="1%">간이과세자</option>
              </select>
              <input type="text" placeholder="1%" className="vat"
              value={formatPercent(vat)}
              readOnly/>
            </div>

          <div className="total">
            <label>총 매입 원가</label>
            <input type="text" placeholder="0원"
            value={formatWon(displayTotalPurchase)} onChange={handleChange(setTotalPurchase, setDisplayTotalPurchase)}
            onFocus={(e)=>e.target.blur()}/>
          </div>
        </div>
      </div>
      </div>

      <div className="calculator-sales">
        <div className="cal-data">
          <div className="calculator-group">
            <label>예상 판매가</label>
            <input ref={salesRef} type="text" placeholder="0원"
            inputMode="numeric" pattern="[0-9]*"
            value={formatWon(displaySales)} onChange={handleChange(setSales, setDisplaySales)}
            onClick={() => {const el = salesRef.current;
              if (el) {
            const pos = formatWon(displaySales).length - 1;
            el.setSelectionRange(pos, pos);
              }
            }}
            onFocus={() => {
            const el = salesRef.current;
              if (el) {
            const pos = formatWon(displaySales).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}/>
          </div>

          <div className="calculator-group">
            <div className="tooltip-label">
            <label>배송비</label>
            <div className="tooltip">
              <div className="tooltip-circle">?</div>
              <span className="tooltip-text">매입 시 발생하는 운임비와는
                <br/>다른 항목으로 매출 시 별도로
                <br/>발생하는 배송비에 대한 항목입니다.
              </span>
              </div>
            </div>
            <input ref={transportCostRef} type="text" placeholder="0원"
            inputMode="numeric" pattern="[0-9]*"
            value={formatWon(displayTransportCost)} onChange={handleChange(setTransportCost, setDisplayTransportCost)}
            onClick={() => {const el = transportCostRef.current;
              if (el) {
            const pos = formatWon(displayTransportCost).length - 1;
            el.setSelectionRange(pos, pos);
              }
            }}
            onFocus={() => {
            const el = transportCostRef.current;
              if (el) {
            const pos = formatWon(displayTransportCost).length - 1;
            el.setSelectionRange(pos, pos);
              }
            }}/>
          </div>

          <div className="calculator-group">
            <label>광고비</label>
            <input ref={adCostRef} type="text" placeholder="0원"
            inputMode="numeric" pattern="[0-9]*"
            value={formatWon(displayAdCost)} onChange={handleChange(setAdCost, setDisplayAdCost)}
            onClick={() => {const el = adCostRef.current;
              if (el) {
            const pos = formatWon(displayAdCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = adCostRef.current;
              if (el) {
            const pos = formatWon(displayAdCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}/>
          </div>

          <div className="calculator-group">
            <label className="fee-text">수수료</label>
            <ul className="fee-group">
              <li>
              <div className="tooltip-label">
              <label>판매 플랫폼 수수료</label>
              <div className="tooltip">
                <div className="tooltip-circle">?</div>
                <span className="tooltip-text">표시되는 판매 플랫폼 수수료는
                  <br/>각 플랫폼 별 평균치를 낸 것이며, 변동이 생기거나
                  <br/>부가세 별도인 항목이 있을 수 있으니
                  <br/>각 플랫폼 사이트를 확인해보시길 바랍니다.
                </span>
                </div>
              </div>
                <div className="select-input">
                  <select className="fee" value={platFormFee}
                  onChange={vatHandleChange}>
                    <option value={'default'}>직접입력하기</option>
                    <option value='3.63'>네이버 스마트스토어</option>
                    <option value='9'>G마켓/옥션</option>
                    <option value='7'>쿠팡</option>
                    <option value='10'>11번가</option>
                  </select>
              <input ref={platformRef} type="text" placeholder="0%" className="fee"
              inputMode="numeric" pattern="[0-9]*"
              value={formatPercent(displayPlatFormFee)} onChange={handleChange(setPlatFormFee, setDisplayPlatFormFee)}
              onClick={() => {const el = platformRef.current;
              if (el) {
            const pos = formatWon(displayPlatFormFee).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = platformRef.current;
              if (el) {
            const pos = formatWon(displayPlatFormFee).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}></input>
                </div>
              </li>
              <li>
                <label>기타 수수료</label>
                <input ref={etcFeeRef} type="text" placeholder="0원" className="ect-fee"
                inputMode="numeric" pattern="[0-9]*"
                value={formatWon(displaySubFee)} onChange={handleChange(setSubFee, setDisplaySubFee)}
                onClick={() => {const el = etcFeeRef.current;
              if (el) {
            const pos = formatWon(displaySubFee).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = etcFeeRef.current;
              if (el) {
            const pos = formatWon(displaySubFee).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}></input>
              </li>
              <li>
                <label>총 수수료</label>
                <input type="text" placeholder="0원" className="ect-fee"
                inputMode="numeric" pattern="[0-9]*"
                value={formatWon(displayTotalFee)}
                readOnly/>
              </li>
            </ul>
            <div className="etc-group">
            <label>매출 시 발생 할 기타 비용</label>
            <input ref={subCostRef} type="text" placeholder="0원"
            inputMode="numeric" pattern="[0-9]*"
            value={formatWon(displayCost)} onChange={handleChange(setCost, setDisplayCost)}
            onClick={() => {const el = subCostRef.current;
              if (el) {
            const pos = formatWon(displayCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}
            onFocus={() => {
            const el = subCostRef.current;
              if (el) {
            const pos = formatWon(displayCost).length - 1;
            el.setSelectionRange(pos, pos);
            }
          }}/>
            </div>
            <div className="total">
              <label className="label-sales">매출 시 발생 할 수익</label>
              <input type="text" placeholder="0원"
              value={formatWon(displayTotalSales)} onChange={handleChange(setTotalSales,setDisplayTotalSales)}
              onFocus={(e)=>e.target.blur()}/>
            </div>
          </div>
          </div>
        </div>
    </div>
        <div className="calculator-summary">
          <div className="summary-box">
            <div className="tooltip-label">
              <label>순이익</label>
              <div className="tooltip">
                <div className="tooltip-circle">?</div>
                <span className="tooltip-text"> 순이익 = 총 매입 원가 - 매출 시 발생할 수익
                </span>
                </div>
              </div>
            <input type="text" placeholder="0원" 
            value={formatWon(benefit)}
            readOnly
            onFocus={(e)=>e.target.blur()}/>
          </div>
          <div className="summary-box">
            <div className="tooltip-label">
              <label>이익률</label>
              <div className="tooltip">
                <div className="tooltip-circle">?</div>
                <span className="tooltip-text"> 이익률 = (순이익 / 총 매입 원가) X 100
                </span>
                </div>
              </div>
            <input type="text" placeholder="0%" 
            value={formatPercent(benefitPer)}
            readOnly
            onFocus={(e)=>e.target.blur()}/>
          </div>
        </div>
        <div className="calculator-actions">
          <button type="submit" onSubmit={submit} className="submit-button">저장하기</button>
        </div>
          
      </form>
    </section>
  );
}


