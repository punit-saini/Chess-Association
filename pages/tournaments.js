import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { client } from '../lib/client';
import { motion as m } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import axios from 'axios';
import { LocationMarkerIcon, CalendarIcon, DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/solid';
// import { DocumentTextIcon, ArrowRightIcon, LocationMarkerIcon } from '@heroicons/react/outline';

export default function HomePage({ tournamentsData }) {
  const [tournaments, setTournaments] = useState(tournamentsData);
  const [filter, setFilter] = useState('upcoming');
  const [open, setOpen]= useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [registrationData, setRegistrationData]=useState({});
  const [searchQuery, setSearchQuery]= useState('');
  const [apiResponse, setApiResponse]=useState([]);
  const [message, setMessage]=useState('');
  const [isRegistering, setIsRegistering]= useState(false)

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleQueryChange = async (e) => {
    setSearchQuery(e.target.value)
    if(searchQuery.length<=3){
      setApiResponse([]);

    }
  else {
    //  console.log('in here', searchQuery)
    const query = `*[_type == "register" && (id match "${searchQuery}*" || firstName match "${searchQuery}*")]`;
    const response = await client.fetch(query);
    setApiResponse(response)
    // console.log('response is ', apiResponse, 'and respone is ', response, '\n\n')
  }

    
  }

  const handleRegister = async (userId, userName) => {
    setApiResponse(apiResponse.filter((user) => user.id === userId));

    setIsRegistering(true);
    // console.log('inside handleRegister');
  
    const data = {
      name: registrationData.name, // Replace with the desired tournament name
      userId: userId,
      userName: userName,
    };
  
    try {
      const response = await axios.post('api/tournament-registration', data);
      setSearchQuery('');
      // console.log('Registration successful!');
      console.log('Response from server:', response.data);
      setMessage(response.data.message)
      setIsRegistering(false)
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
      setIsRegistering(false)
      // Handle the error case, display an error message, etc.
    }
  
  };
  

  const handleMonthFilter = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    const filteredTournaments = month === ''
      ? [...tournamentsData]
      : tournamentsData.filter((tournament) => {
        return moment(tournament.date).format('MMMM') === month;
      });
    setTournaments(filteredTournaments);
  };

  const filteredTournaments = selectedMonth === ''
    ? (filter === 'upcoming'
      ? tournaments.filter((tournament) => moment(tournament.date).isAfter(moment()))
      : tournaments.filter((tournament) => moment(tournament.date).isBefore(moment()))
    )
    : tournaments.filter((tournament) => {
      return moment(tournament.date).format('MMMM') === selectedMonth;
    });

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="bg-gray-100  min-h-screen"
    >
      <div className="container w-11/12 md:w-5/6 py-12 mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-gray-800 mb-2 sm:mb-0">Tournaments</h1>

          <div className="flex items-center text-lg sm:text-xl md:text-2xl">
            <label className="ml-4">
              Show:
              <select
                className="ml-2 border-gray-400 rounded-lg px-3 py-2"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </label>

            <label className="ml-4">
              Filter By Month:
              <select
                className="ml-2 border-gray-400 rounded-lg px-3 py-2"
                value={selectedMonth}
                onChange={handleMonthFilter}
              >
                <option value="">All</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredTournaments.map((tournament) => (
    <div key={tournament._id} className="bg-white rounded-lg shadow-md hover:shadow-lg py-12 px-8 transition duration-200 ease-in-out">
      <div className="h-full flex flex-col justify-between">
        <div className="flex-grow">
          <div className=" min-h-[100px] border-b border-gray-300 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{tournament.name}</h2>
            {/* <div className="border-b border-gray-300 mb-4"></div> */}
          </div>
          
        </div>
        <div className="flex flex-col items-start justify-end">
          
        <div className="flex items-center text-gray-600 mb-2">
  <LocationMarkerIcon className="h-5 w-5 flex-shrink-0 mr-2 text-gray-400" />
  <span className="text-sm">{tournament.location}</span>
</div>

              <div className="flex items-center text-gray-600 mb-4">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-sm">
                  {moment(tournament.date).format('MMM Do, YYYY')} - {tournament.time}
                </span>
              </div>
          <a
            href={`${tournament.fileURL}?dl=${tournament.name}.pdf`}
            download={true}
            className="flex items-center text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out focus:outline-none mb-2"
          >
            <span className="mr-1 bg-gray-100 rounded-full p-1">
              <DocumentTextIcon className="w-4 h-4 text-gray-600" />
            </span>
            <span className="ml-2 font-medium underline underline-offset-4">Details</span>
          </a>
          <button
            onClick={() => {
              setRegistrationData(tournament);
              setOpen(true);
            }}
            className="text-white bg-my-green mt-2 hover:bg-my-black py-2 px-4 rounded-lg text-sm font-medium focus:outline-none"
          >
            Register
            <ArrowRightIcon className="w-4 h-4 inline ml-1 mb-0.5" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>



      </div>


      {/* Registration POP-UP */}
      


      <Transition.Root show={open} as={Fragment}>
  <Dialog as="div" className="fixed inset-0 flex items-center justify-center z-50" onClose={setOpen}>
    <Transition.Child
      as={Fragment}
      enter="transition-opacity ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75" />
    </Transition.Child>

    <Transition.Child
      as={Fragment}
      enter="transition-all transform ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition-all transform ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-3/4 sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{registrationData.name}</h1>
          <h2 className="text-lg font-medium text-gray-700 mt-2">{registrationData.location}</h2>
          <div className="flex items-center mt-4">
            <LocationMarkerIcon className="h-5 w-5 mr-2 text-gray-400" />

            <span className="text-gray-600 text-sm">
              {moment(registrationData.date).format('MMM Do, YYYY')}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-9a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600 text-sm ml-1">{registrationData.time}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">Register For Tournament</h2>
          <p className="text-sm text-gray-700 mt-4">
            You need to be registered as a player with CGSCA to enroll in a tournament.
            If you aren't already,{' '}
            <span className="underline">
              <Link href="/registration">register here</Link>
            </span>
            .
          </p>

          {message.length < 1 && (
            <div className="mt-4">
              <input
                className="p-3 mb-4 block border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-gray-100 placeholder-gray-500"
                value={searchQuery}
                onChange={handleQueryChange}
                placeholder="Enter your Name / CGSCA ID"
              />
            </div>
          )}

          {searchQuery?.length > 3 && (
            <table className="mt-4 mb-4 w-full max-h-72 overflow-y-scroll">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left">User ID</th>
                  <th className="py-2 px-4 bg-gray-100 text-left">User Name</th>
                  <th className="py-2 px-4 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {apiResponse.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border border-gray-300">{user.id}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.firstName}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button
                        onClick={() => handleRegister(user.id, user.firstName)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                      >
                        {isRegistering ? 'Registering...' : 'Register'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {message.length >= 1 && (
            <p className="text-green-500 font-bold text-xl my-4">{message}</p>
          )}

          <button
            type="button"
            className="mt-6 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              setOpen(false);
              setMessage('');
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Transition.Child>
  </Dialog>
</Transition.Root>

    </m.div>
  );
}

export async function getServerSideProps() {
  const data = await client.fetch(`*[_type == "tournament" ]{name,location, date, time, "fileURL" : file.asset->url, _updatedAt, _id}`);
  return {
    props: {
      tournamentsData: data,
    },
  };
}
