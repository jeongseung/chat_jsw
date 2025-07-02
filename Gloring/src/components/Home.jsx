import React, { useState } from 'react'
import Footer from './Footer'
import Main from './Main'
import Banner from './Banner'
import Header from './Header'

const Home = ({authenticate, setAuthenticate}) => {

    
  return (
    <div className='web-container'>
      <Header authenticate={authenticate} setAuthenticate={setAuthenticate}/>
      <Banner/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default Home