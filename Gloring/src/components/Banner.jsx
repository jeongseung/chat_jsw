import React from 'react'
import img from '../assets/banner.jpg'
import './Banner.css'

const Banner = () => {
  return (
    // <section className='hero'>
    //     <img 
    //         src={img}
    //         alt='hero content'
    //         className='hero-image'/>
    // </section>
    <div className='box'>
        <div className='wave -one'></div>
        <div className='wave -two'></div>
        <div className='wave -three'></div>
        <div className='title'>Gloring</div>
    </div>
  )
}

export default Banner