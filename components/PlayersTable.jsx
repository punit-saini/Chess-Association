import React, {useState, useEffect, Fragment, useRef} from 'react'
import { client } from '../lib/client'
import Link from 'next/link'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { motion as m } from 'framer-motion'

const PlayersTable = () => {

    const [players, setPlayers] =  useState([])
    const [search, setSearch] =  useState("")
    const [filteredPlayers, setFilteredPlayers]=useState([])
    const router = useRouter()

    
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [formData, setFormData] = useState({})
   const [isSubmitting, setIsSubmitting]=useState(false)
    const [ paymentProof, setPaymentProof] = useState()
    const [amount, setAmount] = useState(0)
    const [userDetail, setUserDetail] = useState({})
    
  const cancelButtonRef = useRef(null)

  async function handleShowId(e) {
      const id = e.target.getAttribute('name')
    const query = `*[_type == "register" && id == '${id}']`;
    const response = await client.fetch(query)
    // console.log('response from inside handle show id is : ', response)
    setUserDetail(response[0])
     setOpen(true);
  }

  async function handleRenew(e) {
    const id = e.target.getAttribute('name')
    const query = `*[_type == "register" && id == '${id}']`;
    const response = await client.fetch(query)
    setUserDetail(response[0])
    setVisible(true);
  }

    const getUsers = async () => {
        try {
            const query = '*[_type == "register"] | order(_createdAt desc){id, firstName, lastName, gender, status, registrationType, approvalStatus}';
            const response = await client.fetch(query)
            // console.log('result is : ', response)
            setPlayers(response)
            setFilteredPlayers(response)
        } catch (error) {
            console.log(error);
        }
    }

    const handleRenewSubmit = async(e) =>{
      e.preventDefault()
      try {
        setIsSubmitting(true)
          const paymentData = new FormData();
          paymentData.append("file", paymentProof);
          paymentData.append("upload_preset", "t25uyjib");
          paymentData.append("cloud_name", "dw0f3d3zh");
          const paymentUpload = fetch("https://api.cloudinary.com/v1_1/dw0f3d3zh/image/upload", {
            method: "post",
            body: paymentData,
          });

      const [paymentResponse] = await Promise.all([paymentUpload]);

      const paymentJson = await paymentResponse.json();
      const paymentUrl = paymentJson.url;

      const response = await axios.post("/api/renew", {
        ...formData,
        paymentProof : paymentUrl,
        id : userDetail._id
      })
        console.log('after post request result')
        setVisible(false)
        router.reload();
      }
      catch(error){
        console.log('some error occured')
      }
    }

    const columns = [
        {
            name : 'Id',
            selector : row => row.id,
        },
        {
           name : 'First Name',
           selector : row => row.firstName,
           sortable: true,
        },
        {
           name : 'Last Name',
           selector : row => row.lastName,
           sortable : true,
        },
        {
           name : 'Gender',
           selector : row => row.gender
        },
        {
          name : 'Approval',
          cell : (row) => <img className=' w-6 h-6' src={`${row.approvalStatus ? '../yes.png' : '../pending.png'}`} />
        },
        {
          name : 'Membership',
          cell : (row) => <p className='text-sm  rounded-lg inline-flex items-center  px-2 py-1  font-light text-slate-500 shadow-sm ring-1 ring-inset ring-blue-700/10 hover:shadow-none'>{row.status}</p>
        },
        {
           name : 'Type',
           selector : row => row.registrationType
        },
        {
            name : 'View',
            cell : (row) => { return row.status === 'Active' ? (<button onClick={handleShowId} className='text-sm  rounded-lg inline-flex items-center  bg-blue-50 px-2 py-1  font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-700 hover:text-blue-50' name={row.id}>Show Id</button>) : (<button onClick={handleRenew} className='text-sm  rounded-lg inline-flex items-center  bg-yellow-50 px-2 py-1  font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10 hover:bg-yellow-700 hover:text-blue-50' name={row.id}>Renew</button>);},
        }
    ]

    useEffect(()=> {
        getUsers(); 
    },[])

    useEffect(()=>{
         const result = players.filter(player => {
             const name = player.firstName + player.middleName + player.lastName;
            const response = name.toLowerCase().match(search.toLowerCase());
            if (!response) return  player.id.toLowerCase().match(search.toLowerCase());
            return response
         })
        //  console.log('result is : ', result, 'players is : ', players, 'search is : ', search)
         setFilteredPlayers(result)
    },[search])

  return ( 
         

    <m.div
    initial={{y : "100%"}}
    animate={{y : "0%"}}
    exit={{opacity : 1}}
    transition={{duration : 0.75, ease: "easeOut"}}
    >
    

            <DataTable columns={columns} 
            data={filteredPlayers}
            fixedHeader
            pagination
            fixedHeaderScrollHeight='450px'
            subHeader
            subHeaderComponent = {
                <input type='text'
                    placeholder='Search here' 
                    value={search}
                    className=' rounded-md my-4 py-1 form-input'
                    onChange={(e)=> setSearch(e.target.value)}
                />
            }
            subHeaderAlign='left'
            />


            {/* ID */}


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

                <div className='flex flex-col md:flex-row'>
                    <div>
                        <img src='logo.png' className='w-[150px] h-[130px] mx-auto' />
                    </div>
                    <div className='flex flex-col justify-center gap-2 leading-6'>
                          <h1 className=' text-xl font-bold'>Chhattisgarh State Chess Association</h1>
                          <p className='font-semibold'>Affiliated To All India Chess Federation <br /> Recognised By Sports and Youth Welfare C.G Govt.</p>
                    </div>
                </div>

                 <div className='border-b-2 my-2 border-my-grey w-[100%] mx-auto'>
                       <span>  </span>
                    </div>


                      <Dialog.Title as="h3" className=" text-xl font-semibold leading-6 text-gray-900">
                        {userDetail?.firstName} {userDetail.middleName} {userDetail.lastName}
                      </Dialog.Title>
                      <div className="mt-2 pt-3 flex gap-4 justify-between mx-auto flex-col md:flex-row lg:flex-row">
                        <div className=''>
                            <img className='w-[150px] h-[200px] mx-auto' src={userDetail.profileUrl} />
                        </div>
                        <div className='mx-auto mt-4 flex flex-col gap-2 mb-3 text-left'>
                             <p><span className=' font-bold'>CGSA ID : </span>{userDetail.id}</p>
                             <p><span className=' font-bold'>Parent Name : </span>{userDetail.parentName}</p>
                             <p><span className=' font-bold'>Gender : </span>{userDetail.gender}</p>
                             <p><span className=' font-bold'>District : </span>{userDetail.district}</p>
                             <p><span className=' font-bold'>Valid Till : </span>{userDetail.expiryDate}</p>

                        </div>
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









            {/* Renew */}


                            <Transition.Root show={visible} as={Fragment}>
                      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setVisible}>
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

                                <div className='flex flex-col md:flex-row'>
                                    <div>
                                        <img src='logo.png' className='w-[150px] h-[130px] mx-auto' />
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 leading-6'>
                                          <h1 className=' text-xl font-bold'>Chhattisgarh State Chess Association</h1>
                                          <p className='font-semibold'>Affiliated To All India Chess Federation <br /> Recognised By Sports and Youth Welfate C.G Govt.</p>
                                    </div>
                                </div>

                                <div className='border-b-2 my-2 border-my-grey w-[100%] mx-auto'>
                                      <span>  </span>
                                    </div>


                                      <Dialog.Title as="h3" className=" text-xl font-semibold leading-6 text-gray-900">
                                        Renew your membership {userDetail?.firstName}
                                      </Dialog.Title>
                                      <form onSubmit={handleRenewSubmit} encType="multipart/form-data">


                                                      <div className="sm:col-span-3 my-12">
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

                                              {/* <h2>Pay Rs. {amount} on this QR Code and attach the screenshot below</h2>
                                              <img src="../logo.png" /> */}
                                              
                                             {/* <input name="id" value={userDetail._id}
                                                 onChange={
                                                  (e)=>{
                                                    setFormData({...formData, id : e.target.value})
                                                  }
                                                 } 
                                              /> */}


                                          <div className="col-span-full mt-12">
                                            <label htmlFor="cover" className="block text-sm font-medium leading-6 text-gray-900">
                                              Payment Proof <span className='imp'>*</span>
                                            </label>
                                            <p className='text-sm my-3'>Pay the Registration fee ({amount} ₹) on this QR Code and upload the screenshot</p>
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
                                              className={`rounded-md bg-my-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-my-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-my-green`}
                                            >
                                            { isSubmitting? 'Submitting....' : `Submit`}
                                            </button>
                                      </form>
                                      <img src="../logo.png" />    
                                    <button
                                            type="button"
                                            className="mt-6 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setVisible(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Close
                                  </button>

                                </div>

                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>


    </m.div>
    
  
)}

export default PlayersTable