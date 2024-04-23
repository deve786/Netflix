import React, { useEffect, useState } from 'react'
import './Navbar.css';
function Navbar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
   window.addEventListener('scroll',()=>{
    if(window.scrollY>130){
      setShow(true)
    }
    else{
      setShow(false)
    }
   })
  }, [])
  
console.log(show);
  return (
    <div className={`navbar ${show && 'nav'}`}>
        <div className='logo'>
          <img src="/netflix-logo.png" alt="" />
          </div>
        
    </div>
  )
}

export default Navbar