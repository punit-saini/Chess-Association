import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { client } from '../lib/client';
import { motion as m } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';

export default function HomePage({ tournamentsData }) {
  const [tournaments, setTournaments] = useState(tournamentsData);
  const [filter, setFilter] = useState('upcoming');
  const [open, setOpen]= useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [registrationData, setRegistrationData]=useState({});
  const [searchQuery, setSearchQuery]= useState('');
  const [apiResponse, setApiResponse]=useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleQueryChange = async (e) => {
    setSearchQuery(e.target.value)
     console.log('in here', searchQuery)
    const query = `*[_type == "register" && (id match "${searchQuery}*" || firstName match "${searchQuery}*")]`;
    const response = await client.fetch(query);
    setApiResponse(response)
    console.log('response is ', apiResponse, 'and respone is ', response, '\n\n')
    
  }

  const handleRegister = async (userId, userName) => {

    console.log('inside handleRegiser')
    const tournamentQuery = `*[_type == 'tournament' && name == "${registrationData.name}"]`;

    const tournament = await client.fetch(tournamentQuery);

    if (!tournament) {
      console.error('Tournament not found!');
      // Handle the case when the tournament is not found, display an error message, etc.
      return;
    }

    console.log('tournament is this ', tournament)

    const newRegisteredStudent = {
      CGSCA_id: userId,
      name: userName,
    };

    const updatedTournament = {
      ...tournament,
      registeredStudent: [...tournament?.registeredStudent, newRegisteredStudent],
    };

    const updateQuery = `*[_id == $id]`;
    await client.patch(updatedTournament._id).set(updatedTournament).commit();
    console.log('Registration successful!');
  }

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

        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <div key={tournament._id} className="bg-white rounded-lg shadow-sm py-6 px-4 md:px-6 hover:shadow-md transition duration-200 ease-in-out">
                <h2 className="text-lg sm:text-2xl md:text-2xl font-bold text-gray-800 mb-2">{tournament.name}</h2>
                <div className="text-lg sm:text-xl text-gray-600">
                  <span className="font-bold">Location:</span>&nbsp;{tournament.location}
                </div>
                <div className="text-lg sm:text-xl text-gray-600">
                  <span className="font-bold">Date:</span>&nbsp;{moment(tournament.date).format('MMM Do, YYYY')}
                </div>
                <div className="text-lg sm:text-xl text-gray-600">
                  <span className="font-bold">Time:</span>&nbsp;{tournament.time}
                </div>
                <Link
 href={`${tournament.fileURL}?dl=${tournament.name}.pdf`} download={true}
  type="button"
  className="text-white mt-6 bg-gradient-to-tr drop-shadow-lg from-my-green to-my-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hover:bg-black text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Details
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 inline ml-1 mb-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
    />
  </svg>
</Link>
<p onClick={()=> 
{setRegistrationData(tournament); 
setOpen(true);}
}>Register</p>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">No tournaments found.</div>
        )}
      </div>


      {/* Registration POP-UP */}
      


      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10"  onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 rounded-lg sm:max-w-5/6 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    

                    

               <div className=" bg-slate-50 px-12 py-8 rounded-lg">

                <h1>{registrationData.name}</h1>
                <h2>{registrationData.location}</h2>
                <div className=" text-gray-600">
                  <span className="font-bold">Date:</span>&nbsp;{moment(registrationData.date).format('MMM Do, YYYY')}
                </div>
                <div className="text-lg sm:text-xl text-gray-600">
                  <span className="font-bold">Time:</span>&nbsp;{registrationData.time}
                </div>

                <h2>Register For Tournament</h2>
                <p>You need to be registered as a player with CGSCA to register for any tournament, if you aren't already, <span className='underline underline-offset-4'><Link href={'/register'}>register here</Link></span></p>

                <input className='query' value={searchQuery} onChange={handleQueryChange} placeholder='enter your name' />

                {apiResponse.map((user)=>{
                  return(
                  <>
                   <div key={user.id}>
                          <p>User ID: {user.id}</p>
                          <p>User Name: {user.firstName}</p>
                          <button onClick={() => handleRegister(user.id, user.firstName)}>Register</button>
                        </div>
                  </>)
                          
                })}   
                
                           
                    <button
                            type="button"
                            className="mt-6 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                          
                        >
                            Close
                  </button>

                </div>

          </div>
        </div>
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
