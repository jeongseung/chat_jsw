import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-inner'>
        <h1 className='logo'>Gloring</h1>
        <nav className='nav'>
          <a href='#calculator' className='nav-btn'>손익 계산 시뮬레이터</a>
          <a href='#trend'className='nav-btn'>트렌드 인사이트</a>
        </nav>
          <a href='/login' className='nav-btn'>로그인</a>
      </div>
    </header>    
  )
}

export default Header