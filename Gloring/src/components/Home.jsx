import React from 'react'
import Footer from './Footer'
import Main from './Main'
import Banner from './Banner'
import Header from './Header';

const Home = ({isLoggedIn, setIsLoggedIn}) => {
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