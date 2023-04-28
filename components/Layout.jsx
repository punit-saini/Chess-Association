import React, { Suspense } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../context/StateContext';



const Layout = ({ children }) => {

  return (
      <div className='bg-my-grey'>

      <Head>
        <title>Chhattisgarh Chess</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <div className=' bg-my-grey h-screen'>
        <div className='w-[95%] mx-auto relative top-4 min-h-screen bg-white drop-shadow-2xl rounded-t-3xl'>
        <header className="">
          <Navbar />
        </header>
        <main className={`min-h-screen`}>
          {children}
        </main>
        <Footer/>
        </div>
      
      </div>
      </div>
     
          
  )
}

export default Layout