import React, { useState } from 'react'
import img from '../assets/calculator.jpg'
import Calculator from './Calculator'

const CalculatorSection = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section id="calculator" className="gloring-section gloring-simulator">
            <div className="gloring-section-inner">
                <img
                    src={img}
                    alt="calculator"
                    className="gloring-image"
                />
                <div className="gloring-text">
                    <p className='highlight'>첫번째 어드바이스</p>
                    <h2>순이익 계산 시뮬레이션</h2>
                    <p>
                        복잡한 정산 과정? 이제 손쉽게 계산해보세요. 다양한 판매 환경에 맞는 실시간 시뮬레이션 지원
                    </p>
                    <h5>AI를 활용하여 HS코드 추천까지</h5>

                    <button className="gloring-button" onClick={() => setIsOpen(!isOpen)}>손익계산기 열기</button>
                </div>
            </div>
            {isOpen && <Calculator/>}
        </section>
    )
}

export default CalculatorSection
