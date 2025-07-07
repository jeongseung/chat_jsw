import React from 'react';
import "./Card.css"

export default function Card({ title, keywords }) {
  return (
    <div className="card-content">
      <h3>{title}</h3>
      <ul className="keyword-list">
        {keywords.map((item, index) => (
          <li key={index} className="keyword-item">
            <span className="rank">{item.rank}.</span>
            <span className="keyword">{item.keyword}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}