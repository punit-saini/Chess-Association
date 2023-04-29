import React from "react";


export default function(){


    const committeeMembers = [
        {
          name: 'Shri Ragvendra Singhania',
          position: 'President',
          mobile : '9826151400'
        },
        {
          name: 'Mr. M. Chandrasekhar',
          position: 'Vice President',
          mobile : '9425204173'
        },
        {
          name: 'Mr. Vishwas Meshram',
          position: 'Vice President',
          mobile : '8959591845'
        },
        {
          name : 'Mr. Suresh Jaju',
          position : 'Vice President',
          mobile : '8966950320'
        },
        {
          name : 'Ms. Kiran Agarwal',
          position : 'Vice President',
          mobile : '9407984340'
        },
        {
          name : 'Mrs. Bhavna Bohra',
          position : 'Vice President',
          mobile : '9826509800'
        },
        {
          name : 'Shri Lalit Bhansali',
          position : 'Vice President',
          mobile : '8120590000'
        },
        {
          name : 'Shri Vinod Kumar Rathi',
          position : 'Genral Scretary',
          mobile : '7999309399'
        },
        {
          name : 'Mr. Hemant Khute',
          position : 'Secretary',
          mobile : '9926274195'
        },
        {
          name : 'Mr. Anand Awadhiya',
          position : 'Joint Secretary',
          mobile : '9827486539'
        },
        {
          name : 'Shri Ishwar Singh Rajput',
          position : 'Joint Secretary',
          mobile : '7999636611'
        },
        {
          name : 'Shri Saroj Vaishnav',
          position : 'Joint Secretary',
          mobile : '9826881585'
        },
        {
          name : 'Mr. Vikas Sharma',
          position : 'Joint Secretary',
          mobile : '9329100240'
        },
        {
          name : 'Shri Shashank Shende',
          position : 'Joint Secretary',
          mobile : '9424290567'
        },
        {
          name : 'Shri Subodh Kumar Singh',
          position : 'Joint Secretary',
          mobile : '9301864802'
        },
        {
          name : 'Mr. Pradeep Das',
          position : 'Treasurer',
          mobile : '7000253005'
        },
        {
          name : 'Mr. Ravi Kumar',
          position : 'Member',
          mobile : '9131405628'
        },
        {
          name : 'Shri Alankar Bhvgade',
          position : 'Member',
          mobile : '8770501340'
        },
        {
          name : 'Mr. Sharad Uke',
          position : 'Member',
          mobile : '9425201963'
        },
        {
          name : 'Mr. Naveen Shukla',
          position : 'Member',
          mobile : '9425293603'
        },
        {
          name : 'Mr. Rajendra Singh Rana',
          position : 'Member',
          mobile : '9826135908'
        },
        {
          name : 'Mr. Dinesh Lamba',
          position : 'Member',
          mobile : '9425532376'
        },
        {
          name : 'Mr. Dipankar Sen Gupta',
          position : 'Member',
          mobile : '9424702533'
        },
        {
          name : 'Mr. Shivshankar Agarwal',
          position : 'Member',
          mobile : '9827121115'
        },
        {
          name : 'Mr. Ramesh Agarwal',
          position : 'Member',
          mobile : '9981009968'
        },
        {
          name : 'Mr. Mohan Soni',
          position : 'Member',
          mobile : '9425558659'
        },
        {
          name : 'Mr. Ashish Rathi',
          position : 'Member',
          mobile : '7000357485'
        },
        {
          name : 'Mr. Yogesh Daakliya',
          position : 'Member',
          mobile : '9406206060'
        },
        {
          name : 'Mr. Naveen Agarwal',
          position : 'Member',
          mobile : '9893782201'
        },
       
      ];
      
    


return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Committee Members
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            List of present Managing Executive from 13-11-2021 to 31-03-2025
          </p>
        </div>
  
        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {committeeMembers.map(member => (
              <li key={member.name} className="mt-10">
                <div className="flex">
                 
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"> 
                   <span> {'-> '}</span>
                     {member.name}</h3>
                    <p className="text-md leading-5 text-gray-500 ml-6">{member.position}</p>
                    <p className="text-md leading-5 text-gray-700 ml-8">+91 {member.mobile}</p>
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
  