import React, { useState } from 'react';
import axios from 'axios';

export default function Payments() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [paymentProof, setPaymentProof] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const paymentData = new FormData();
      paymentData.append('file', paymentProof);
      paymentData.append('upload_preset', 't25uyjib');
      paymentData.append('cloud_name', 'dw0f3d3zh');
      const paymentUpload = fetch('https://api.cloudinary.com/v1_1/dw0f3d3zh/image/upload', {
        method: 'post',
        body: paymentData,
      });

      const [paymentResponse] = await Promise.all([paymentUpload]);

      const paymentJson = await paymentResponse.json();
      const paymentUrl = paymentJson.url;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('amount', amount);
      formData.append('mobile', mobile);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('paymentProof', paymentUrl);

      const response = await axios.post('/api/payments/others', {
         name : name, 
         amount : amount,
         mobile : mobile,
         email : email,
         description : description,
         paymentProof : paymentUrl
      });
      setName('');
      setDescription('');
      setAmount('');
      setMobile('');
      setEmail('');
      setPaymentProof('');

      if (response.status !== 200) {
        setMessage('Some Error Occured, try again or contact us!');
        console.log('Error: Payment submission failed! This should not be happening. Try again after reloading this page');
      } else {
        setMessage('Payment Successful');
        console.log('Payment submitted successfully, we will contact you if we are unable to verify your payment!');
      }
    } catch (error) {
      console.log('Error:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mt-16">Payments</h1>
        {message.length >= 1 && (
          <p className="mt-20 text-center mx-auto bg-green-200 text-green-800 rounded-md p-2">{message}</p>
        )}
        <div className="mt-12">
          {!message.length>=1 && <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Payment Description:
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2 items-center">
              <img src="CGSCA SCR.jpeg" alt="QR Code" className="w-28 h-28 mr-4" />
              <p className="text-lg mt-2 text-gray-700">Pay Using This QR Code</p>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="paymentProof" className="block text-lg font-medium text-gray-700">
                Payment Proof:
                <span className="text-sm text-gray-500 ml-2">(Add screenshot of the payment)</span>
              </label>
              <input
                type="file"
                id="paymentProof"
                onChange={(e) => setPaymentProof(e.target.files[0])}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  );
}
