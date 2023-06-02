import React from "react";
import { client } from "../../lib/client";


import { formatISO } from 'date-fns';



// get current date
const today = new Date().toISOString()

// fetch all users
const fetchUsers = async () => {
  const query = `*[_type == 'register' && status == 'Active' ]`;
  const results = await client.fetch(query);
  return results;
};


// check if user is expired
const isExpired = (user) => {
    const expiryDate = new Date(user.expiryDate);
    const todayDate = new Date(today);
  
    console.log('expiry date is : \n', expiryDate)
    console.log('todays date is :', todayDate)
  
    return expiryDate < todayDate;
  };

// update status of expired users
const updateStatus = async (user) => {
    
    client
  .patch(user._id)
  // specify the field to persist the new value
  .set({ 'status': 'Expired' })
  .commit()
  .then(res => console.log('User status updated successfully!'))
  .catch(err => console.error('Error updating user status:', err));
  };
  

// fetch all users and update status of expired users
const checkExpiry = async () => {
  const users = await fetchUsers();
  const expiredUsers = users.filter(isExpired);
  console.log('expired uses are : ', expiredUsers)
  expiredUsers.forEach(updateStatus);
};

// run the function once per day using setInterval
// setInterval(checkExpiry, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
checkExpiry()


