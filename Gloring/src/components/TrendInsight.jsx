// TrendRanking.jsx
import React, { useState } from 'react';
import './TrendInsight.css';
import useTrendData from '../hooks/useTrendData'


export default function TrendRanking() {
    const [term, setTerm] = useState("DAILY")
    const [category, setCategory] = useState("패션의류")
    const [currentIndex, setCurrentIndex] = useState(0);

    const periods = ['DAILY', 'WEEKLY', 'MONTHLY']
    const categories = ['패션의류', '패션잡화', '화장품/미용', '디지털/가전', '가구/인테리어', '출산/육아', '식품', '스포츠/레저', '생활/건강']

    const { rankings, loading, error } = useTrendData(term, category);

    const handlePeriodChange = (term) => {
        setTerm(term)
    }

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
    }

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, rankings.length - 1))
    }

    const currentRanking = rankings[currentIndex] || {}
    const { period, topKeywords = [] } = currentRanking

    return (

        <div className='container'>
            <div className="filter">
                <div className="term">
                    {periods.map(t => (
                        <button key={t} onClick={() => handlePeriodChange(t)} className={term === t ? 'active' : ''}>
                            {t}
                        </button>
                    ))}
                </div>
                <div className="category">
                    {categories.map(c => (
                        <button key={c} onClick={() => { setCategory(c); setCurrentIndex(0); }} className={category === c ? 'active' : ''}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
                <br></br>
            <div className="trend-wrapper">
                <button className="slide-arrow" onClick={handlePrev} disabled={currentIndex === 0}>◀</button>

                <div className="trend-container">
                    <h2 className="trend-title">키워드 Best</h2>
                    <div className="date">{period}</div>
                    <p>네이버쇼핑에서 많이 검색된 키워드입니다</p>
                    <ul className="keyword-list">
                        {topKeywords.map((item, index) => (
                            <li key={index} className="keyword-item">
                                <span className="rank">{item.rank}.</span>
                                <span className="keyword">{item.keyword}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="slide-arrow" onClick={handleNext} disabled={currentIndex === rankings.length - 1}>▶</button>
            </div>
            <br></br>
            <hr></hr>
        </div>
    );
}