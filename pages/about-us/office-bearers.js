import React from "react";
import { motion as m } from "framer-motion";

export default function(){


    const committeeMembers = [
        {
          name: 'Shri Ragvendra Singhania',
          image : 'ragvendra',
          position: 'President',
          mobile : '9826151400'
        },
        {
          name: 'Mr. M. Chandrasekhar',
          image : 'chandrasekhar',
          position: 'Vice President',
          mobile : '9425204173'
        },
        {
          name: 'Mr. Vishwas Meshram',
          position: 'Vice President',
          mobile : '8959591845',
          image : 'vishwas',

        },
        {
          name : 'Mr. Suresh Jaju',
          position : 'Vice President',
          mobile : '8966950320',
          image : 'suresh',

        },
        {
          name : 'Ms. Kiran Agarwal',
          position : 'Vice President',
          mobile : '9407984340',
          image : 'kiran',
          
        },
        {
          name : 'Mrs. Bhavna Bohra',
          position : 'Vice President',
          mobile : '9826509800',
          image : 'bhavna'
        },
        {
          name : 'Shri Lalit Bhansali',
          position : 'Vice President',
          mobile : '8120590000',
          image : 'lalit',

        },
        {
          name : 'Shri Vinod Kumar Rathi',
          position : 'Genral Scretary',
          mobile : '7999309399',
          image : 'vinod',
        },
        {
          name : 'Mr. Hemant Khute',
          position : 'Secretary',
          mobile : '9926274195',
          image : 'hemant'

        },
        {
          name : 'Mr. Anand Awadhiya',
          position : 'Joint Secretary',
          mobile : '9827486539',
          image : 'anand'
        },
        {
          name : 'Shri Ishwar Singh Rajput',
          position : 'Joint Secretary',
          mobile : '7999636611',
          image : 'ishwar'
        },
        {
          name : 'Shri Saroj Vaishnav',
          position : 'Joint Secretary',
          mobile : '9826881585',
          image : 'saroj'
        },
        {
          name : 'Mr. Vikas Sharma',
          position : 'Joint Secretary',
          mobile : '9329100240',
          image : 'vikas'
        },
        {
          name : 'Shri Shashank Shende',
          position : 'Joint Secretary',
          mobile : '9424290567',
          image : 'shashank'
        },
        {
          name : 'Shri Subodh Kumar Singh',
          position : 'Joint Secretary',
          mobile : '9301864802',
          image : 'subodh'
        },
        {
          name : 'Mr. Pradeep Das',
          position : 'Treasurer',
          mobile : '7000253005',
          image : 'pradeep'
        },
        {
          name : 'Mr. Ravi Kumar',
          position : 'Member',
          mobile : '9131405628',
          image : 'ravi kumar'
        },
        {
          name : 'Shri Alankar Bhvgade',
          position : 'Member',
          mobile : '8770501340',
          image : 'alankar'
        },
        {
          name : 'Mr. Sharad Uke',
          position : 'Member',
          mobile : '9425201963',
          image : 'sharad ukr'
        },
        {
          name : 'Mr. Naveen Shukla',
          position : 'Member',
          mobile : '9425293603',
          image : 'naveen'
        },
        {
          name : 'Mr. Rajendra Singh Rana',
          position : 'Member',
          mobile : '9826135908',
          image : 'rajendra'
        },
        {
          name : 'Mr. Dinesh Lamba',
          position : 'Member',
          mobile : '9425532376',
          image : 'dinesh'
        },
        {
          name : 'Mr. Dipankar Sen Gupta',
          position : 'Member',
          mobile : '9424702533',
          image : 'dipankar'
        },
        {
          name : 'Mr. Shivshankar Agarwal',
          position : 'Member',
          mobile : '9827121115',
          image : 'shivshankar'
        },
        {
          name : 'Mr. Ramesh Agarwal',
          position : 'Member',
          mobile : '9981009968',
          image : 'ramesh'
        },
        {
          name : 'Mr. Mohan Soni',
          position : 'Member',
          mobile : '9425558659',
          image : 'mohan soni'
        },
        {
          name : 'Mr. Ashish Rathi',
          position : 'Member',
          mobile : '7000357485',
          image : 'ashish'
        },
        {
          name : 'Mr. Yogesh Daakliya',
          position : 'Member',
          mobile : '9406206060',
          image : 'yogesh'
        },
        {
          name : 'Mr. Naveen Jindal',
          position : 'Member',
          mobile : '9893782201',
          image : 'naveen jindal'
        },
       
      ];
      
    


return (
  <m.div
  initial={{y : "100%"}}
  animate={{y : "0%"}}
  exit={{opacity : 1}}
  transition={{duration : 0.75, ease: "easeOut"}} 
  className="bg-white py-12 pb-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center">
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Office Bearers
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        List of present Managing Executive from 13-11-2021 to 31-03-2025
      </p>
    </div>

    <div className="mt-10">
      <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {committeeMembers.map(member => (
          <li key={member.name} className="mt-10">
            <div className="flex items-center">
              <img
                src={`../${member.image}.png`}
                className="w-28 h-32 inline mr-3 border-2 border-black"
              />
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {member.name}
                </h3>
                <p className="text-md leading-5 text-gray-500">{member.position}</p>
                <p className="text-md leading-5 text-gray-700">+91 {member.mobile}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</m.div>

  );
            }
  