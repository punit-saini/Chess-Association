import React from 'react'
import Link from 'next/link'

export default function () {
  return (
    <div className=' bg-gradient-to-b from-my-black to-my-green text-white py-6 px-10 mx-auto'>
        <h3>Chhattisgarh State Chess
            Association12, Tuglaq 
            road, Chhattisgarh,
            321001
        </h3>

        <Link className=' bg-gradient-to-b from-my-green to-my-black py-1 px-2 text-sm rounded-lg' href={'#'} >Rules And Regulations</Link>

        <div className='flex'>
            <img className='mr-2 w-[30px] h-[30px]' src='./instagram.png'/>
            <img className='mr-2 w-[30px] h-[30px]' src='./twitter.png'/>
            <img className='mr-2 w-[30px] h-[30px]' src='./facebook.png'/>
            <img className='mr-2 w-[30px] h-[30px]' src='./youtube.png'/>
        </div>

        <p className=' text-my-grey'>Developed By <Link href={'https://www.linkedin.com/in/punit-saini-2003/'} className=' text-slate-400'>Punit Kumar Saini</Link></p>
    </div>
  )
}

