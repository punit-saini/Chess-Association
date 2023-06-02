import React, { useState } from 'react';
import instamojo from '../lib/instamojo';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    instamojo.createPaymentRequest({
      amount,
      purpose: 'Registration',
      customerName: 'Punit',
      customerEmail: 'punitwranz@gmail.com',
      customerPhone: '9982927883',
    })
      .then((response) => {
        if (response.success) {
          // Redirect to the payment page
          console.log('payment success')
          window.location.href = response.paymentUrl;
        } else {
          setError(response.error);
          console.log('error')
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Pay</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Payment;
