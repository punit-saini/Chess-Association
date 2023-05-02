import React, { Suspense } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../context/StateContext';



const Layout = ({ children }) => {

  return (
      <div className=' min-h-screen'>

      <Head>
        <title>Chhattisgarh Chess</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Welcome to the official website of the Chhattisgarh Chess Association. Our association is dedicated to promoting the game of chess in the state and provides a platform for players to register, participate in tournaments, and access records and statistics. As an affiliate of the All India Chess Federation and the Sports and Youth Wing of the Chhattisgarh government, we strive to provide the best possible opportunities for players of all levels. Join us in our mission to promote chess and help us build a thriving chess community in Chhattisgarh." />
        <meta name="keywords" content="Chess, Chhattisgarh, Tournament, Records, Stats, Players, All India Chess Federation, Sports, Youth, Association, Affiliate, Promote, Community, Register, FIDE, Platform, Opportunities, Chess Championship, Enthusiasts" />
        <meta property="og:title" content="Chhattisgarh State Chess Association" />
        <meta property="og:description" content="Join the Chhattisgarh Chess Association to register as a player, participate in tournaments, and access records and statistics. Our association is affiliated with the All India Chess Federation and the Sports and Youth Wing of the Chhattisgarh government." />
        <meta property="og:image" content="https://chhattisgarhchess.com/logo.jpg" />
        <meta property="og:url" content="https://chhattisgarhchess.com/" />

          <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <div className=' bg-my-grey  md:pb-20 min-h-full'>
        <div className='md:w-[95%] w-[100%] md:top-8 mx-auto relative min-h-screen bg-white drop-shadow-2xl md:rounded-t-3xl'>
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