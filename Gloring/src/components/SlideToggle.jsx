import React, { Children, useState } from 'react'

const SlideToggle = ({btn_title, children}) => {
    const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='slider-wrapper'>
        <button onClick={() => setIsOpen(true)}>{btn_title}</button>

        {isOpen && children}
    </div>
  )
}

export default SlideToggle