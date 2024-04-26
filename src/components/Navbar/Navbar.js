import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
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
  

  return (
    <div className={`navbar ${show && 'nav'}`}>
        <div className='logo'>
          <Link to={'/'}><img src="/netflix-logo.png" alt="" /></Link>
          </div>
        
    </div>
  )
}

export default Navbar