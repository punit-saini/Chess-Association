import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { client } from '../lib/client'
import axios from 'axios'


export default  function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [ isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage]=useState(false)
   const [errorMessage, setErrorMessage]=useState(false)
   async function handleSubmit (e){
           e.preventDefault();
           setIsSubmitting(true);
           try {
                const response = await axios.post("/api/contact", {
                    name,
                    email,
                    message
                });

                if(response.status !=200){
                    setErrorMessage(true)
                }
                else {
                    setSuccessMessage(true)
                }
           } catch (error) {
               console.log('error here : ')
           }
         
    }
  return (
    <div className="bg-gray-100">

      <div className="max-w-screen-lg mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 mt-16">Contact Us</h1>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-lg text-gray-600 mb-4">Chhattisgarh State Chess Association</p>
              <p className="text-lg text-gray-600 mb-4">Ramadhim Marg, Rajnandgaon Marg</p>
              <p className="text-lg text-gray-600 mb-4">Chhattisgarh, 491441</p>
              <p className="text-lg text-gray-600 mb-4">Email: chhattisgarhchess@gmail.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h2>

              { successMessage && <div className='grid grid-cols-1 gap-6 mx-auto mt-12 w-5/6 md:w-4/6 lg:w-3/6 text-center'>
                                <div className=" items-center rounded-md text-lg bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Just received your message. We'll get back to you soon.
                                </div>
                                <Link className=' underline text-xs mt-5' href={'/'}>Take Me To The Home Route</Link>
                                </div>}
                                { errorMessage &&  <div className=' grid grid-cols-1 gap-6 mx-auto mt-12 w-5/6 md:w-4/6 lg:w-3/6  text-center'>
                                                                <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                                    An Unknown Error Occured
                                                                </div>
                                                                <Link className=' underline text-xs mt-5' href={'/contact-us'}>Retry</Link>
                                                                </div>}
              {(successMessage || errorMessage) && <div className=' h-60'></div>}
              <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${successMessage || errorMessage ? 'hidden' : ''} gap-6`}>

                            
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" onChange={(e)=> setName(e.target.value)} autoComplete="given-name" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> setEmail(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" onChange={(e)=> setMessage(e.target.value)} rows="4" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"></textarea>
                </div>
                <div className="sm:flex sm:justify-end">
                  <button type="submit" className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2">
                    {isSubmitting? 'Submitting...' : 'Submit'}
                  </button>
                </div>
               </form>
            </div>
           </div>

           <div className="w-full">
            <iframe 
                className="w-5/6 mx-auto my-10 h-96" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=GF%20-%2036,%20Shyam%20Plaza,%20Pandri,%20Raipur,%20Chhattisgarh%20492004+(Chhattisgarh%20State%20Chess%20Associationess%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
            ></iframe>
</div>

         </div>

        </div>
     </div>
  )}

