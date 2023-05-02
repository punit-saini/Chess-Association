import { useState } from "react";
import { client } from "../../lib/client";
import multer from "multer";



export default async function register(req,res){
    if(req.method=='POST') {

      
      try {
        
        // console.log('req.body is : ', req.body)

        const registrationDate = new Date().toISOString().slice(0, 10);
        const length = parseInt(req.body.length);
        const expiryDate = new Date(registrationDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + length);
        // console.log('date now is :', date)
        const newUser = {
            _type: 'register',
            ...req.body,
            id : 'CGSCA'+ new Date().toISOString().slice(8,10)+ new Date().toISOString().slice(6,7)+new Date().toISOString().slice(0,4)+req.body.firstName.slice(0,3).toUpperCase()+Math.floor(Math.random() * 1000) + 1, 
            registrationDate,
            length,
            expiryDate: expiryDate.toISOString().slice(0, 10),
            status : 'Active'
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