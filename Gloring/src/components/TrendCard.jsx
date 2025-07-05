import React from 'react'
import './TrendInsight.css'

const TrendCard = ({period, topKeywords, cardStatus}) => {
  return (
    <div className="trend-container" data-card-status={cardStatus}>
            <h2 className="trend-title">키워드 Best</h2>
            <p>네이버쇼핑에서 많이 검색된 키워드입니다.</p>
            <br />
            <div className="date">{period}</div>
            <ul className="keyword-list">
                {topKeywords.length > 0 ? (
                    topKeywords.map((item, index) => (
                        <li key={index} className="keyword-item">
                            <span className="rank">{item.rank}.</span>
                            <span className="keyword">{item.keyword}</span>
                        </li>
                    ))
                ) : (
                    <li className="no-data">데이터가 없습니다.</li>
                )}
            </ul>
        </div>
  )
}

export default TrendCard