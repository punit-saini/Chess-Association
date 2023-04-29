import React, { useEffect, useState } from 'react'
import PlayersTable from '../components/PlayersTable'


export default function(){

    
  return (
    <div className='flex w-11/12 md:w-5/6 flex-col align-middle mx-auto my-12 text-center'>
        <h1 className='text-2xl'>Players List</h1>
     <PlayersTable />
    </div>
  )
}

