// TrendRanking.jsx
import React, { useState } from 'react';
import './TrendInsight.css';
import useTrendData from '../hooks/useTrendData'
import Carousel from './Carousel';
import Card from './Card';


export default function TrendRanking() {
    const [term, setTerm] = useState("DAILY")
    const [category, setCategory] = useState("패션의류")
    const [currentIndex, setCurrentIndex] = useState(0);

    const periods = ['DAILY', 'WEEKLY', 'MONTHLY']
    const categories = ['패션의류', '패션잡화', '화장품/미용', '디지털/가전', '가구/인테리어', '출산/육아', '식품', '스포츠/레저', '생활/건강']

    const { rankings = [] } = useTrendData(term, category);

    const handleTermClick = (newTerm) => {
        setTerm(newTerm)
        setCurrentIndex(0) // 기간 변경 시 첫 번째 카드로 이동
    }

    const handleCategoryClick = (newCategory) => {
        setCategory(newCategory)
        setCurrentIndex(0)
    }

    return (

        <div className='container'>
            <div className="filter">
                <div className="term">
                    {periods.map(t => (
                        <button key={t} onClick={() => handleTermClick(t)} className={term === t ? 'active' : ''}>
                            {t}
                        </button>
                    ))}
                </div>
                <div className="category">
                    {categories.map(c => (
                        <button key={c} onClick={() => handleCategoryClick(c)} className={category === c ? 'active' : ''}>{c}</button>
                    ))}
                </div>
            </div>
            <div className="trend-wrapper">
                <Carousel activeIndex={currentIndex} onSetActive={setCurrentIndex}>
                    {rankings.length === 0 ? (
                        <div>데이터를 불러오는 중입니다...</div>
                    ) : (
                        rankings.map((ranking, idx) => (
                            <Card
                                key={idx}
                                title={`${ranking.period}`}
                                keywords={ranking.topKeywords}
                            />
                        ))
                    )}
                </Carousel>
            </div>
        </div>
    );
}