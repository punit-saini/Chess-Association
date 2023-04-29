import React, { useState } from 'react';
import moment from 'moment';
import { client } from '../lib/client';

export default function HomePage({tournamentsData}) {

    // const tournamentsData = [
    //     {
    //       "id": 1,
    //       "name": "Summer Championships",
    //       "location": "San Francisco, CA",
    //       "date": "2022-06-20",
    //       "time": "8:00 AM"
    //     },
    //     {
    //       "id": 2,
    //       "name": "Autumn Classic",
    //       "location": "New York, NY",
    //       "date": "2022-09-20",
    //       "time": "10:00 AM"
    //     },
    //     {
    //       "id": 3,
    //       "name": "Winter Open",
    //       "location": "Chicago, IL",
    //       "date": "2023-01-15",
    //       "time": "9:00 AM"
    //     },
    //      {
    //       "id": 4,
    //       "name": "Spring Challenge",
    //       "location": "Los Angeles, CA",
    //       "date": "2023-05-10",
    //       "time": "11:00 AM"
    //     }
    //   ]
    console.log('tournament data is : ', tournamentsData)
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
        <div className="bg-gray-100  min-h-screen">
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
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{tournament.name}</h2>
                    <div className="text-lg sm:text-xl text-gray-600">
                      <span className="font-bold">Location:</span>&nbsp;{tournament.location}
                    </div>
                    <div className="text-lg sm:text-xl text-gray-600">
                      <span className="font-bold">Date:</span>&nbsp;{moment(tournament.date).format('MMM Do, YYYY')}
                    </div>
                    <div className="text-lg sm:text-xl text-gray-600">
                      <span className="font-bold">Time:</span>&nbsp;{tournament.time}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">No tournaments found.</div>
            )}
          </div>
        </div>
      );
}

export   async function getServerSideProps(){
    const data = await client.fetch(`*[_type == "tournament" ]`)
    return {
        props : {
            tournamentsData :  data
        }
    }
}