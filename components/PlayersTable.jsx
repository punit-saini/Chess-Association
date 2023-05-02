import React, {useState, useEffect, Fragment, useRef} from 'react'
import { client } from '../lib/client'
import DataTable from 'react-data-table-component'
import { Dialog, Transition } from '@headlessui/react'
const PlayersTable = () => {

    const [players, setPlayers] =  useState([])
    const [search, setSearch] =  useState("")
    const [filteredPlayers, setFilteredPlayers]=useState([])


    
    const [open, setOpen] = useState(false)
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

    const getUsers = async () => {
        try {
            const query = '*[_type == "register"] | order(_createdAt desc){id, firstName, lastName, gender, status, registrationType}';
            const response = await client.fetch(query)
            // console.log('result is : ', response)
            setPlayers(response)
            setFilteredPlayers(response)
        } catch (error) {
            console.log(error);
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
           name : 'Status',
           selector : row => row.status
        },
        {
           name : 'Type',
           selector : row => row.registrationType
        },
        {
            name : 'View',
            cell : (row) => <button onClick={handleShowId} className='text-sm  rounded-lg inline-flex items-center  bg-blue-50 px-2 py-1  font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-700 hover:text-blue-50' name={row.id}>Show Id</button>
        }
    ]

    useEffect(()=> {
        getUsers(); 
    },[])

    useEffect(()=>{
         const result = players.filter(player => {
        
            const response = player.firstName.toLowerCase().match(search.toLowerCase());
            if(!response) return player.lastName.toLowerCase().match(search.toLowerCase());
            return response
         })
        //  console.log('result is : ', result, 'players is : ', players, 'search is : ', search)
         setFilteredPlayers(result)
    },[search])

  return (


    <>
    

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
                          <p className='font-semibold'>Affiliated To All India Chess Federation <br /> Recognised By Sports and Youth Welfate C.G Govt.</p>
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


    </>
    
  )
}

export default PlayersTable