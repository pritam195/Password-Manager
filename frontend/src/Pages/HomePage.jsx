import { useState } from 'react'
import Navbar from '../components/Navbar'
import Manager from '../components/Manager'
import Footer from '../components/Footer'
import React from 'react'

const HomePage = () => {
    
  return (
      <div>
        <Navbar></Navbar>
        <div className='min-h-[87vh]'>
            <Manager></Manager>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default HomePage
