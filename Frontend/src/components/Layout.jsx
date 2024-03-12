import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='bg-[#1A232E] overflow-hidden'>
        <Navbar />
        
        <div className='relative'>
          
        <Outlet />
     <div className=' gradient-03 z-0'/>
  </div>
        
        <Footer />
    </div>
  )
}

export default Layout