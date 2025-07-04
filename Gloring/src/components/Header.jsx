import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-inner'>
       <h1
  className="logo"
  style={{ cursor: 'pointer' }} // 클릭 가능한 느낌을 주기 위해 커서 추가
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  Gloring
</h1>
        <nav className='nav'>
          <a href='#calculator' className='nav-btn'>순이익 계산 시뮬레이터</a>
          <a href='#trend'className='nav-btn'>트렌드 인사이트</a>
        </nav>
        <nav className='right'>
          <a href='/login' className='nav-btn'>로그인</a>
        </nav>
      </div>
    </header>    
  )
}

export default Header