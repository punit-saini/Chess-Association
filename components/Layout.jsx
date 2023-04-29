import React, { Suspense } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../context/StateContext';



const Layout = ({ children }) => {

  return (
      <div className=' h-full'>

      <Head>
        <title>Chhattisgarh Chess</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <div className=' bg-my-grey h-screen'>
        <div className='md:w-[95%] w-[100%] md:top-4 mx-auto relative min-h-screen bg-white drop-shadow-2xl md:rounded-t-3xl'>
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