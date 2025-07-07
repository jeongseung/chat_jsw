import React from 'react'
import './Header.css'
import useScrollDirection from '../hooks/useScrollDirection'
import { useNavigate } from 'react-router-dom'


const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/Login")
  }

  const goToHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({top: 0, behavior:'smooth'})
    } else {
      navigate("/")
    }
  }

  return (
    <header className={`header ${scrollDirection === 'down' ? 'hide' : ''}`}>
      <div className='header-inner'>
      <h7
      className="logo"
      style={{ cursor: 'pointer' }} // 클릭 가능한 느낌을 주기 위해 커서 추가
      onClick={goToHome}
        >Gloring </h7>
        <nav className='nav'>
          <a href='#calculator' className='nav-btn'>순이익 계산 시뮬레이터</a>
          <a href='#trend'className='nav-btn'>트렌드 인사이트</a>
        </nav>
        <nav className='right'>
          {isLoggedIn ? (
            <a onClick={handleLogout} className='nav-btn'>로그아웃</a>
            ) : (
            <a onClick={() => navigate("/login")} className='nav-btn'>로그인</a>
            )}
        </nav>
      </div>
    </header>    
  )
}

export default Header