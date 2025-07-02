import React, { useState } from 'react'
import img from '../assets/trend.jpg'
import TrendInsight from './TrendInsight'

const TrendSection = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <section id="trend" className="gloring-section gloring-trend">
            <div className="gloring-section-inner">
                <div className="gloring-text">
                    <p className='highlight'>두번째 어드바이스</p>
                    <h2>트렌드 인사이트</h2>
                    <p>최신 급상승 검색량을 통한 수요 급증 트렌드 분석</p>
                    <h5>셀러의 타깃에 맞게 필터링 제공</h5>
                    {isOpen && <button className="gloring-button" onClick={() => setIsOpen(false)}>트렌드 인사이트 닫기</button>}
                    {!isOpen && <button className="gloring-button" onClick={() => setIsOpen(!isOpen)}>트렌드 인사이트 열기</button>}
                </div>
                <img
                    src={img}
                    alt="trend analysis"
                    className="gloring-image"
                />
            </div>
            {isOpen && <TrendInsight/>}
        </section>
    )
}

export default TrendSection