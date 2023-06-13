import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, {useState, useEffect, Fragment, useRef} from 'react'
// import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { motion as m } from 'framer-motion'


export default function Example() {

   const [amount, setAmount]= useState(150)
   const [successMessage, setSuccessMessage]=useState(false)
   const [errorMessage, setErrorMessage]=useState(false)
   const [formData, setFormData]=useState({})
   const [isSubmitting, setIsSubmitting]=useState(false)

  
     const [ photo, setPhoto ] = useState()
     const [ dobProof, setDobProof ] = useState()
     const [ paymentProof, setPaymentProof] = useState()
 
     const [open, setOpen] = useState(false)
     
     const cancelButtonRef = useRef(null)


    const handleButtonClick = async ()=> {
      const res = await axios.post('/api/handlePayment')
      console.log('res from the front end is : ', res);
    }

  
  
     async function handleShowId(e) {
     setOpen(true);
     }
  
    
   const handleSubmit = async (e) => {
         e.preventDefault();
         setIsSubmitting(true)
  try {


    const photoData = new FormData();
      photoData.append("file", photo);
      photoData.append("upload_preset", "t25uyjib");
      photoData.append("cloud_name", "dw0f3d3zh");
      const photoUpload = fetch("https://api.cloudinary.com/v1_1/dw0f3d3zh/image/upload", {
        method: "post",
        body: photoData,
      });
  
      const dobData = new FormData();
      dobData.append("file", dobProof);
      dobData.append("upload_preset", "t25uyjib");
      dobData.append("cloud_name", "dw0f3d3zh");
      const dobUpload = fetch("https://api.cloudinary.com/v1_1/dw0f3d3zh/image/upload", {
        method: "post",
        body: dobData,
      });

      const paymentData = new FormData();
      paymentData.append("file", paymentProof);
      paymentData.append("upload_preset", "t25uyjib");
      paymentData.append("cloud_name", "dw0f3d3zh");
      const paymentUpload = fetch("https://api.cloudinary.com/v1_1/dw0f3d3zh/image/upload", {
        method: "post",
        body: paymentData,
      });

      const [photoResponse, dobResponse, paymentResponse] = await Promise.all([photoUpload, dobUpload, paymentUpload]);


      const photoJson = await photoResponse.json();
      const photoUrl = photoJson.url;
  
      const dobJson = await dobResponse.json();
      const dobProofUrl = dobJson.url;

      const paymentJson = await paymentResponse.json();
      const paymentUrl = paymentJson.url;
        
      
      const response = await axios.post("/api/register", {
        ...formData,
        profileUrl: photoUrl,
        dobUrl: dobProofUrl,
        paymentProof : paymentUrl
      });

      // console.log('response is \n\n\n\n: ', response)
       if(response.status != 200) {
          setErrorMessage(true)
       }else{
        setSuccessMessage(true);
       }
    
  } catch (error) {
     console.log('error from form is : ', error)
  }

      
    
   
  }
  return (


      <m.div 
      initial={{y : "100%"}}
      animate={{y : "0%"}}
      exit={{opacity : 1}}
      transition={{duration : 0.75, ease: "easeOut"}}
      >
        

        
   
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={`w-11/12 md:w-4/6 mt-16 mb-8  mx-auto`}>
         
         <h1 className='text-4xl font-bold mb-10'>Registration</h1>
      
          {/* <button onClick={handleButtonClick}>This is test button</button> */}
{successMessage && <h2>{successMessage}</h2>}
        {errorMessage && <h2>{errorMessage}</h2>}
      
      <div className={`space-y-12 ${ successMessage ? 'opacity-0' : ''}`}>
        
        

        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600"> ⚫ All fields mark with <span className=' text-red-600'>*</span> are compulsory. <br /> ⚫ Registration fee is ₹ 150 / year</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                First name <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  required
                  onChange={ (e)=>
                    setFormData({...formData, firstName : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="middleName" className="block text-sm font-medium leading-6 text-gray-900">
                Middle name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, middleName : e.target.value})
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Last name <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, lastName : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender-name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-my-green sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, gender : e.target.value})
                  }
                >
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                Date Of Birth <span className='imp'>*</span>
              </label>
              <div className="mt-2">
               <input
                   id='dob'
                   name='dob'
                   type='date'
                   required
                   autoComplete='dob'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, dob : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, email : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobileNumber"
                  type="tel"
                  required
                  autoComplete="mobile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, mobileNumber : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                District <span className='imp'>*</span>
              </label>
              <div className="mt-2">
              <select
                name='district'
                id='district'
                required
                onChange={ (e)=>
                    setFormData({...formData, district : e.target.value})
                  }
              >
                    <option value="">Select District</option>
                    <option value="balod">Balod</option>
                    <option value="balodaBazar">Baloda Bazar</option>
                    <option value="balrampur">Balrampur</option>
                    <option value="bastar">Bastar</option>
                    <option value="bemetara">Bemetara</option>
                    <option value="bijapur">Bijapur</option>
                    <option value="bilaspur">Bilaspur</option>
                    <option value="dantewada">Dantewada</option>
                    <option value="dhamtari">Dhamtari</option>
                    <option value="durg">Durg</option>
                    <option value="gariaband">Gariaband</option>
                    <option value="gaurelaPendraMarwahi">Gaurela Pendra Marwahi</option>
                    <option value="janjgirChampa">Janjgir-Champa</option>
                    <option value="jashpur">Jashpur</option>
                    <option value="kabirdham">Kabirdham</option>
                    <option value="kanker">Kanker</option>
                    <option value="kondagaon">Kondagaon</option>
                    <option value="khairagarhChhuikhadanGandai">Khairagarh Chhuikhadan Gandai</option>
                    <option value="korba">Korba</option>
                    <option value="koriya">Koriya</option>
                    <option value="mahasamund">Mahasamund</option>
                    <option value="manendragarhChirmiriBharatpur">Manendragarh Chirmiri Bharatpur</option>
                    <option value="mohlaManpur">Mohla Manpur</option>
                    <option value="mungeli">Mungeli</option>
                    <option value="narayanpur">Narayanpur</option>
                    <option value="raigarh">Raigarh</option>
                    <option value="raipur">Raipur</option>
                    <option value="rajnandgaon">Rajnandgaon</option>
                    <option value="sarangarhBilaigarh">Sarangarh Bilaigarh</option>
                    <option value="sakti">Sakti</option>
                    <option value="sukma">Sukma</option>
                    <option value="surajpur">Surajpur</option>
                    <option value="surguja">Surguja</option>
                    </select>

              </div>
            </div>

            {/* <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, address : e.target.value})
                  }
                />
              </div> */}
            </div>



            <div className="sm:col-span-2 mt-8">
              <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  required
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, pincode : e.target.value})
                  }
                />
              </div>
            </div>



            <div className="sm:col-span-2 mt-8">
              <label htmlFor="parentName" className="block text-sm font-medium leading-6 text-gray-900">
                 Parent/Guardian Name <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="parentName"
                  required
                  id="parentName"
                  autoComplete="parent-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, parentName : e.target.value})
                  }
                />
              </div>
            </div>


            {/* <div className="sm:col-span-3 mt-2">
              <label htmlFor="relationship" className="block text-sm font-medium leading-6 text-gray-900">
                Relationship <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="relationship"
                  name="relationship"
                  required
                  autoComplete="relationship-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-my-green sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, relationship : e.target.value})
                  }
                >
                  <option value="">Select</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>


          </div> */}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          
          
        {/* <div className="sm:col-span-3 mt-2">
              <label htmlFor="registrationType" className="block text-sm font-medium leading-6 text-gray-900">
                Registration Type <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="registrationType"
                  name="registrationType"
                  autoComplete="registrationType"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-my-green sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, registrationType : e.target.value})
                  }
                >
                  <option value="">Select</option>
                  <option value="Player">Player</option>
                  <option value="Arbiter">Arbiter</option>
                  <option value="Coach">Coach</option>
                </select>
              </div>
            </div> */}


        <div className="mt-10 space-y-10 w-fit">
              

          <div className="sm:col-span-3 lg:col-span-2">
              <label htmlFor="aicfId" className="block text-sm font-medium leading-6 text-gray-900">
                AICF Id <span className='imp'>*</span>
              </label>
              <div className="mt-2">
               <input
                   id='aicfId'
                   name='aicfId'
                   type='text'
                   required
                   autoComplete='Aicf Id'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, aicfId : e.target.value})
                  }
                />
              </div>
            </div>


            <div className="sm:col-span-3 lg:col-span-2 w-fit">
              <label htmlFor="fideId" className="block text-sm font-medium leading-6 text-gray-900">
                Fide ID
              </label>
              <div className="mt-2">
               <input
                   id='fideId'
                   name='fideId'
                   type='text'
                   autoComplete='fideId'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-my-green sm:text-sm sm:leading-6"
                  onChange={ (e)=>
                    setFormData({...formData, fideId : e.target.value})
                  }
                />
              </div>
            </div>
            
          </div>


          {/* Image Drop */}


         
            



                <div className="col-span-full mt-3">
              <label htmlFor="cover" className="block text-sm font-medium leading-6 text-gray-900">
                Passport Size Photo <span className='imp'>*</span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                <p className='my-1 text-xs'>{photo?.name}</p>
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 mx-auto justify-center flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-my-green focus-within:outline-none hover:text-my-black"
                    >
                      <span>Upload a file</span>
                      <input id="photo" name="photo" type="file" required  accept='.jpg,.png' size='524288' className="sr-only"
                              onChange={ (e)=>
                                setPhoto(e.target.files[0])
                              }
                       />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 512 KB</p>
                </div>
              </div>
            </div>



                <div className="col-span-full mt-3">
              <label htmlFor="cover" className="block text-sm font-medium leading-6 text-gray-900">
                DOB Proof <span className='imp'>*</span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                <p className='my-1 text-xs'>{dobProof?.name}</p>
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 justify-center flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="dobProof"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-my-green focus-within:outline-none  hover:text-my-black"
                    >
                      <span>Upload a file</span>
                      <input id="dobProof" name="dobProof" type="file" required  accept='.jpg,.png' size='524288' className="sr-only"
                              onChange={ (e)=>
                                setDobProof(e.target.files[0])
                              }
                       />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 256 KB</p>
                </div>
              </div>
            </div>




            {/* <div className="sm:col-span-3 my-12">
              <label htmlFor="length" className="block text-sm font-medium leading-6 text-gray-900">
                Registration Duration In Years <span className='imp'>*</span>
              </label>
              <div className="mt-2">
                <select
                  id="length"
                  name="length"
                  autoComplete="length"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-my-green sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={ (e)=> {
                    setFormData({...formData, length : e.target.value})
                    setAmount(e.target.value * 150)
                  }
                  }
                >
                  <option value="">Select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div> */}
            {/* </div> */}



                <div className="col-span-full mt-12">
              <label htmlFor="cover" className="block text-sm font-medium leading-6 text-gray-900">
                Payment Proof <span className='imp'>*</span>
              </label>
              <p className='text-sm my-3'>Pay the Registration fee ({150} ₹) on this QR Code <span onClick={handleShowId} className='underline cursor-pointer'>here</span> and upload the screenshot</p>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                <p className='my-1 text-xs'>{paymentProof?.name}</p>
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 justify-center flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="paymentProof"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-my-green focus-within:outline-none  hover:text-my-black"
                    >
                      <span>Upload a file</span>
                      <input id="paymentProof" name="paymentProof" type="file" required  accept='.jpg,.png' size='524288' className="sr-only"
                              onChange={ (e)=>
                                setPaymentProof(e.target.files[0])
                              }
                       />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 512 KB</p>
                </div>
              </div>
            </div>






               
           



        
        </div>

        
        <button
          type="submit"
          className={`rounded-md bg-my-green text-lg px-3 py-2  font-semibold text-white shadow-sm hover:bg-my-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-my-green ${ successMessage || errorMessage ? ' cursor-not-allowed' : ''}`}
        >
         { isSubmitting? 'Submitting....' : `Submit`}
        </button>
     

      </div>

      

    

            
                
                </form>










                 {/* QR Code */}


            <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 rounded-lg sm:max-w-5/6 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    

                    

               <div className=" bg-slate-50 px-12 py-8 rounded-lg">

                <div className='flex flex-col '>
                    <div>
                        <img src='logo.png' className='w-[150px] h-[130px] mx-auto' />
                    </div>
                    <div className='flex flex-col justify-center gap-2 leading-6'>
                          <h1 className=' text-xl font-bold'>Chhattisgarh State Chess Association</h1>
                          <p className='font-semibold'>Affiliated To All India Chess Federation <br /> Recognised By Sports and Youth Welfate C.G Govt.</p>
                    </div>
                    <img className=' w-4/5 md:w-3/5 mx-auto my-4' src='CGSCA SCR.jpeg' />
                    <h1 className='mb-4'>UPI ID : 9827161369m@pnb</h1>
                </div>

                 
                           
                    <button
                            type="button"
                            className="mt-6 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Close
                  </button>

                </div>

          </div>
        </div>
      </Dialog>
    </Transition.Root>




    { successMessage && <div className='mx-auto my-10 w-5/6 md:w-4/6 lg:w-3/6 text-center'>
      <div className=" items-center rounded-md text-lg bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Form Submitted. Should be approved in couple of days. 
      </div>
      <Link className=' underline text-xs mt-5' href={'/players-list'}>Show me the Players List</Link>
      </div>}


    { errorMessage &&  <div className='mx-auto my-10 w-5/6 md:w-4/6 lg:w-3/6  text-center'>
      <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        An unknown error occured. Any amount deducted will be refunded. Contact us through contact details given on website.
      </div>
      <Link className=' underline text-xs mt-5' href={'/registration'}>Retry</Link>
      </div>}
   


                </m.div>
  
  )
}