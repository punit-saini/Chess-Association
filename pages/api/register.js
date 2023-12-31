import { useState } from "react";
import { client } from "../../lib/client";



export default async function register(req,res){
    if(req.method=='POST') {

      
      try {
        
        // console.log('req.body is : ', req.body)

        const registrationDate = new Date().toISOString().slice(0, 10);
        const length = parseInt(req.body.length);
        // const idYear= new Date().getFullYear().toString()
        const expiryDate = new Date(registrationDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        expiryDate.setMonth(2); // 2 represents March (months are zero-based)
        expiryDate.setDate(31);
        const existingUsers = await client.fetch('*[_type == "register"]');
      const totalRegistered = existingUsers.length;
        // console.log('date now is :', date)
        const newUser = {
            _type: 'register',
            ...req.body,
            id: `CGSCA${new Date().getFullYear().toString().slice(2,4)}${(totalRegistered + 1)
              .toString()
              .padStart(4, '0')}`, 
            registrationDate,
            expiryDate: expiryDate.toISOString().slice(0, 10),
            status : 'Active',
            approvalStatus : false,
          }
 
        await client.create(newUser).then((res) => {
            // console.log(`created ${res}`)
          })

           
        res.status(200).json({message : 'User created successfully'})
      } catch (error) {
        console.log('error occured inside post catch, error is ', error)
        res.status(500).json({message : error})
      }
    }
    else {
        console.log('this method not allowed')
        res.status(405).json({message: 'Method not allowed'});
    }
}