import React from 'react'

export default function Loader() {
  return (
    <>
        <div>
            <div className=' min-h-screen w-full absolute flex items-center  top-0 z-20'>
            <div className='m-auto flex flex-col gap-3 items-center'>
            <img alt='loading-svg' className=' inline-block m-auto w-12' src='../loading.svg'/>
            <h2 className=' font-bold text-xl text-gray-600 font-mono'>Loading...</h2>
            </div>
        
            </div>
        </div>
    </>
    
    
  )
}
