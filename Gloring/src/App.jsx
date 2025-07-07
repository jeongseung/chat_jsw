import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Join from './components/Join'
import Calculator from './components/Calculator'
import { useState, useEffect } from 'react'
import OAuthRedirectPage from './components/OAuthRedirectPage'

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token) // !!token -> token이 있을 때 true, 없을 때 false
   },[])

  return (
    <div className='web-container'>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path='/oauth/redirect' element={<OAuthRedirectPage/>}/>
        <Route path="/Join" element={<Join/>}></Route>
        <Route path="/calculator" element={<Calculator isLoggedIn={isLoggedIn} />}/>
      </Routes>
    </div>
  )
}

export default App