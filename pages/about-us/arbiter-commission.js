import React from "react";


export default function(){


    const commissionMembers = [
        {
          name: 'Shree. Alankar Bhivgade',
          position: 'Chairman',
        },
        {
          name: 'Mr. Anish Anshari',
          position: 'Chairman',
        },
        {
          name: 'Shree Ravikumar',
          position: 'Vice Chairman',
        },
        {
          name: 'Shree Rockey Devaangan',
          position: 'Vice Chairman',
        },
        {
          name: 'Shree Rohit Yadav',
          position: 'Convenor',
        },
        {
          name: 'Shree Ashutosh Sahu',
          position: 'Convenor',
        },
       
       
      ];
      
    


return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
           Arbiter Commission
          </p>
          {/* <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            List of present Managing Executive from 13-11-2021 to 31-03-2025
          </p> */}
        </div>
  
        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {commissionMembers.map(member => (
              <li key={member.name} className="mt-10">
                <div className="flex">
                 
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"> 
                   <span> {'-> '}</span>
                     {member.name}</h3>
                    <p className="text-md leading-5 text-gray-500 ml-6">{member.position}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
  

      </div>
    </div>
  );
            }
  