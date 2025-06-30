import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Main from './components/Main'

function App() {

  return (
    <div className='web-container'>
      <Header/>
      <Banner/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App