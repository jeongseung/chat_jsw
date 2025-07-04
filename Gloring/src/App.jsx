import './App.css'
import Main from './components/Main'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Join from './components/Join'
import { useState } from 'react'
import Header from './components/Header'

function App() {
  
  const [authenticate, setAuthenticate] = useState(false);

  return (
    <div className='web-container'>
        {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login setAuthenticate={setAuthenticate}/>}></Route>
        <Route path="/Join" element={<Join/>}></Route>
      </Routes>
    </div>
  )
}

export default App