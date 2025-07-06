import './App.css'
import Main from './components/Main'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Join from './components/Join'
import Calculator from './components/Calculator'
import { useState, useEffect } from 'react'
import Header from './components/Header'

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  console.log("현재 로그인 상태:", authenticate);
}, [authenticate]);

  useEffect(() => {
  console.log("isLoggedIn 상태 변경:", isLoggedIn);
}, [isLoggedIn]);

  return (
    <div className='web-container'>
      {/* <Header authenticate={authenticate} setAuthenticate={setAuthenticate}/> */}
      <Routes>
        <Route path="/" element={<Home authenticate={authenticate} setAuthenticate={setAuthenticate}/>}></Route>
        <Route path="/login" element={<Login authenticate={authenticate} setAuthenticate={setAuthenticate} setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path="/Join" element={<Join/>}></Route>
        <Route path="/calculator" element={<Calculator isLoggedIn={isLoggedIn} />}/>
      </Routes>
    </div>
  )
}

export default App