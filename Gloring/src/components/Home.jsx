import React, { useEffect } from 'react'
import Footer from './Footer'
import Main from './Main'
import Banner from './Banner'
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Home = ({isLoggedIn, setIsLoggedIn}) => {
  const location = useLocation()

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;

    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // 렌더링 후 동작 보장
      }
    }
  }, [location]);


  return (
    <div className='web-container'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Banner/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default Home