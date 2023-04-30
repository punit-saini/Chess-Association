import React, { useState}from 'react';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import '../styles/globals.css';
import 'keen-slider/keen-slider.min.css'
import "./styles.css"
import Router from 'next/router';
import Loader from '../components/Loader';
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  
    Router.events.on("routeChangeStart",(url)=>{
      console.log('Route is chaning...')
      setLoading(true)
    })
    Router.events.on("routeChangeComplete",(url)=>{
      console.log('Route is changed')
      setLoading(false)
    })

  return (
    <>
      
          
       {loading && <Loader />}
        {/* <StateContext> */}
          <Layout>
             { !loading &&
            <Component {...pageProps} /> }
          </Layout>
        {/* </StateContext> */}
          < Analytics />
    </>
      
  )
}

export default MyApp