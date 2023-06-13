import { client } from "../../lib/client";
import React from "react";
import { motion as m } from "framer-motion";



export default function DistrictChessAssociations({associations}) {
  return (
    <m.div
    initial={{y : "100%"}}
    animate={{y : "0%"}}
    exit={{opacity : 1}}
    transition={{duration : 0.75, ease: "easeOut"}}
    className="bg-gray-100 min-h-screen">
      <header className="py-12 lg:py-16">
        
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-2">
            District Chess Associations
          </h1>
          <p className="text-xl text-gray-600 text-center mb-6">
            A list of all the district chess associations
          </p>
        
      </header>

      
        <div className="grid grid-cols-1 w-11/12 md:w-5/6 mx-auto my-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {associations.map((association, index) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden" key={index}>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{association.name}</h2>
                <p className="text-gray-600">{association.address}</p>
                <p className="text-gray-600">{association.contactPerson}</p>
                <p className="text-gray-600">{association.phone}</p>
                <a href={`mailto:${association.email}`} className="text-gray-600 hover:underline">
                  {association.email}
                </a>
              </div>
            </div>
          ))}
        </div>
    
    </m.div>
  );
}

export async function getStaticProps(){
  const associations = await client.fetch(`*[_type == "localAssociations"]`);
  return {
    props : {
      associations
    }
  }
}