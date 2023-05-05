import { useState } from "react";
import { client } from "../../lib/client";



export default async function register(req,res){
    if(req.method=='POST') {

      
      try {
        
        console.log('req.body is : ', req.body)

        const registrationDate = new Date().toISOString().slice(0, 10);
        const length = parseInt(req.body.length);
        const expiryDate = new Date(registrationDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + length);
        
        client
        .patch(req.body.id)
        // specify the field to persist the new value
        .set({'expiryDate' : expiryDate.toISOString().slice(0,10), 'paymentProof' : req.body.paymentProof ,'status': 'Active', 'length' : length, 'approvalStatus' : false })
        .commit()
        .then(res => console.log('User status updated successfully!'))
        .catch(err => console.error('Error updating user status:', err));
       

           
        res.status(200).json({message : 'Membership renewal successful'})
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