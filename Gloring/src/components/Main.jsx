import React from 'react'
import './Main.css'
import CalculatorSection from './CalculatorSection'
import TrendSection from './TrendSection'
import Login from './Login'
import YoutubeSession from './YoutubeSession'

const Main = () => {
  return (
    <div className='main-container'>
        <div className='main-content'>
            <h2>셀러들의 고민을 해결할</h2>
            <p>글로링의 솔루션</p>
        </div>
        <div className='gloring-section'>
          <CalculatorSection/>
          <TrendSection/> 
          <YoutubeSession/>
        </div>
    </div>
    
  )
}

export default Main