import { useState } from "react";
import { client } from "../../lib/client";



export default async function register(req,res){
    if(req.method=='POST') {

      
      try {
        //  console.log('req body is : ', req.body)
        const newMessage = {
            _type: 'contact',
            ...req.body,
          }
    
        await client.create(newMessage).then((res) => {
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