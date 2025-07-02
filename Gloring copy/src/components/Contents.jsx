import React from 'react'
import './Contents.css'
import CalculatorSection from './CalculatorSection'
import TrendSection from './TrendSection'

const Contents = () => {
  return (
    <div className='main-container'>
        <div className='main-content'>
            <h2>셀러들의 고민을 해결할</h2>
            <p>글로링의 솔루션</p>
        </div>
        <div className='gloring-section'>
          <CalculatorSection/>
          <TrendSection/> 
        </div>
    </div>
    
  )
}

export default Contents