import React from 'react'
import { useStateContext} from '../context/StateContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';




export default ()=>{
 
         const [showNav, setShowNav]= useState(false)
         const [showDropdown1, setShowDropdown1] = useState(false)
         const [showDropdown2, setShowDropdown2] = useState(false)
         const handleNavClick = () => {
          setShowNav(!showNav);
        }
        const handleDropdown2 = () => {
          setShowDropdown2(!showDropdown2);
        }
        const handleDropdown1 = () => {
          setShowDropdown1(!showDropdown1);
        }

       
    return( 
       
       <>
            
<nav className="bg-white text-my-black dark:bg-gray-900 w-full z-20 rounded-t-3xl border-b  dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center">
           
            <img
              src="../logo.png"
              className="h-12 w-16 ml-1"
              alt="CGSCA Logo"
            />
             <div className="flex flex-col md:flex-row md:gap-1.5 gap-y-0 p-0">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Chhattisgarh State
              </span>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Chess Association
              </span>
            </div>
          </a>
  <div className="flex md:order-2">
      <Link href={'/registration'} type="button" className=" hidden md:block text-white bg-gradient-to-tr drop-shadow-lg from-my-green to-my-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hover:bg-black text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Player Registration</Link>
      <button data-collapse-toggle="navbar-sticky" onClick={handleNavClick} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillrule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
  </div>
  <div className={`items-center justify-between ${showNav? '': 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li className='relative mt-2' onMouseEnter={()=> setShowDropdown2(true)} onMouseLeave={()=> setShowDropdown2(false)}>
        <button id="dropdownNavbarLink" onClick={handleDropdown2}  className="py-2 pl-3 pr-4 flex items-center justify-between w-full text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-my-green md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Players <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillrule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
            <div id="dropdownNavbar"  className={`z-10 ${showDropdown2? 'absolute': 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="/registration" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b text-my-black">Registration</a>
                  </li>
                  <li>
                    <a href="/players-list" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b text-my-black">Player Search</a>
                  </li>
                </ul>
            </div>
      </li>
      
      <li>
        <a href="/tournament" className="block py-2 pl-3 pr-4 text-my-black hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b md:bg-transparent md:hover:text-white  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Tournament</a>
      </li>
      <li>
        <a href="/gallery" className="block py-2 pl-3 pr-4 text-my-black hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b md:bg-transparent md:hover:text-white  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Gallery</a>
      </li>
      <li className='relative mt-2' onMouseEnter={()=> setShowDropdown1(true)} onMouseLeave={()=> setShowDropdown1(false)}>
        <button id="dropdownNavbarLink" onClick={handleDropdown1} data-dropdown-toggle="dropdownNavbar" className=" z-0 py-2 pl-3 pr-4 flex items-center justify-between w-full text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-my-green md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">About Us <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillrule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
            <div id="dropdownNavbar" className={`z-20 ${showDropdown1? 'absolute': 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="/about-us/arbiter-commission" className="block px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b text-my-black">Arbiter Commission</a>
                  </li>
                  <li>
                    <a href="/about-us/office-bearers" className="block px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b text-my-black">Office Bearers</a>
                  </li>
                  <li>
                    <a href="/about-us/district-associations" className="block px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b text-my-black">District Associations</a>
                  </li>
                </ul>
            </div>
      </li>
      <li>
        <a href="/contact-us" className="block py-2 pl-3 pr-4 text-my-black hover:bg-gradient-to-tr from-my-green to-my-black hover:text-white rounded md:hover:border-b md:bg-transparent md:hover:text-white  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Us</a>
      </li>
      
     
    </ul>
  </div>
  </div>
</nav>

       </>
     )
}
