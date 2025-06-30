import React from 'react'
import img from '../assets/trend.jpg'

const TrendSection = () => {
    return (
        <section id="trend" className="gloring-section gloring-trend">
            <div className="gloring-section-inner">
                <div className="gloring-text">
                    <p className='highlight'>두번째 어드바이스</p>
                    <h2>트렌드 인사이트</h2>
                    <p>최신 급상승 검색량을 통한 수요 급증 트렌드 분석</p>
                    <h5>셀러의 타깃에 맞게 필터링 제공</h5>
                    <button className="gloring-button">트렌드 인사이트 열기</button>
                </div>
                <img
                    src={img}
                    alt="trend analysis"
                    className="gloring-image"
                />
            </div>
        </section>
    )
}

export default TrendSection