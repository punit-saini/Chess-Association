import React, { useState } from 'react';
import moment from 'moment';
import { client } from '../lib/client';
import { motion as m } from 'framer-motion';
import Link from 'next/link';

export default function HomePage({ tournamentsData }) {
  const [tournaments, setTournaments] = useState(tournamentsData);
  const [filter, setFilter] = useState('upcoming');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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
    stroke-width="1.5"
    stroke="currentColor"
    className="w-4 h-4 inline ml-1 mb-1"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
    />
  </svg>
</Link>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">No tournaments found.</div>
        )}
      </div>
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
