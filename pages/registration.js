import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Link from 'next/link'

export default function Example() {

   const [amount, setAmount]= useState(150)
   const [successMessage, setSuccessMessage]=useState(false)
   const [errorMessage, setErrorMessage]=useState(false)
   const [formData, setFormData]=useState({})
   const [isSubmitting, setIsSubmitting]=useState(false)

  
     const [ photo, setPhoto ] = useState()
     const [ dobProof, setDobProof ] = useState()
 
  

  
    
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

      const [photoResponse, dobResponse] = await Promise.all([photoUpload, dobUpload]);


      const photoJson = await photoResponse.json();
      const photoUrl = photoJson.url;
  
      const dobJson = await dobResponse.json();
      const dobProofUrl = dobJson.url;
        
      
      const response = await axios.post("/api/register", {
        ...formData,
        profileUrl: photoUrl,
        dobUrl: dobProofUrl,
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


      <>
       
    { successMessage && <div className='mx-auto mt-12 w-5/6 md:w-4/6 lg:w-3/6 text-center'>
      <div className=" items-center rounded-md text-lg bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Form Submitted Successfully
      </div>
      <Link className=' underline text-xs mt-5' href={'/'}>Take me to the home route</Link>
      </div>}


    { errorMessage &&  <div className='mx-auto mt-12 w-5/6 md:w-4/6 lg:w-3/6  text-center'>
      <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        An unknown error occured. Any amount deducted will be refunded. Contact us through contact details given on website.
      </div>
      <Link className=' underline text-xs mt-5' href={'/registration'}>Retry</Link>
      </div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className={`w-11/12 md:w-4/6 mt-16 mb-8 ${ successMessage ? 'hidden' : ''} mx-auto`}>
      <div className={`space-y-12`}>
        
        {successMessage && <h2>{successMessage}</h2>}
        {errorMessage && <h2>{errorMessage}</h2>}

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

            <div className="col-span-full">
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
              </div>
            </div>



            <div className="sm:col-span-2">
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



            <div className="sm:col-span-2">
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


            <div className="sm:col-span-3 mt-2">
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


          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          
          
        <div className="sm:col-span-3 mt-2">
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
            </div>


        <div className="mt-10 space-y-10 w-fit">
              

          <div className="sm:col-span-3 lg:col-span-2">
              <label htmlFor="aicfId" className="block text-sm font-medium leading-6 text-gray-900">
                AICF Id
              </label>
              <div className="mt-2">
               <input
                   id='aicfId'
                   name='aicfId'
                   type='text'
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
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 512 KB</p>
                </div>
              </div>
            </div>






                <div className="sm:col-span-3 mt-2">
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
              </div>
           



        </div>
        </div>

        
     

      </div>

      

    
                
                </form>
                </>
  
  )
}