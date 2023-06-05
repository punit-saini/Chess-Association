import Link from 'next/link';

export default function Footer() {
  return (
    <div className=' bg-gray-300'>

   
    <div className='bg-my-grey rounded-b-3xl'>
    <footer className="bg-gradient-to-b from-my-black to-my-green text-white pt-10  md:rounded-b-3xl">
      <div className="container px-8 sm:px-10 mx-auto">
        <div className="flex flex-wrap mb-8">
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
            <img src='../logo.png' width={200} height={200} className=' bg-white p-2 mb-3 rounded-full' />
            <h3 className="text-lg font-bold mb-2">Chhattisgarh State Chess Association</h3>
            <p className="text-sm text-my-grey leading-5">
              Ramadhim Marg, Rajnandgaon Marg, Chhattisgarh, 491441
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
            <h4 className="text-lg font-bold mb-2">Useful Links</h4>
            <ul className="list-none">
             
              <li className="mb-2">
                
                  <Link href={"/players-list"} className="text-sm hover:underline">Player Search</Link>
                
              </li>
              <li className="mb-2">
                
                  <Link href={"/about-us/district-associations"} className="text-sm hover:underline">District Associations</Link>
                
              </li>
              <li className="mb-2">
                
                  <Link href={"/tournament"} className="text-sm hover:underline">Tournaments</Link>
                
              </li>
              <li className="mb-2">
                
                  <Link href={"/gallery"} className="text-sm hover:underline">Gallery</Link>
                
              </li>
              <li className="mb-2">
                
                  <Link href={"/about-us/arbiter-commission"} className="text-sm hover:underline">Arbiter Commission</Link>
                
              </li>
              <li className="mb-2">
                
                  <Link href={"about-us/office-bearers"} className="text-sm hover:underline">Office Bearers</Link>
                
              </li>
              <li>
                
                  <Link href={"/contact-us"} className="text-sm hover:underline">Contact Us</Link>
                
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
            <h4 className="text-lg font-bold mb-2">Connect with Us</h4>
            <div className="flex">
              <Link href="#" target='_blank' className="mr-4 opacity-70 cursor-not-allowed">
                <img className="w-6 h-6" src="https://img.icons8.com/fluency/48/null/instagram-new.png" alt="Instagram" />
              </Link>
              <Link href="#" target='_blank' className="mr-4 opacity-70 cursor-not-allowed">
                <img className="w-6 h-6" src="https://img.icons8.com/fluency/48/null/twitter.png" alt="Twitter" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100076434217040" target='_blank' className="mr-4">
                <img className="w-6 h-6" src="https://img.icons8.com/fluency/48/null/facebook-new.png" alt="Facebook" />
              </Link>
              <Link href="#" target='_blank' className='mr-4 opacity-70 cursor-not-allowed'>
                 <img className='w-6 h-6' src='https://img.icons8.com/color/48/null/youtube-play.png' alt='Youtube' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    
            <p className=" text-gray-300 text-xs w-full lg:pt-2 mx-auto bg-gray-800 py-2 md:rounded-b-3xl text-center">
              <span className=' text-white text-base mt-2'> &copy; { new Date().getFullYear()} CGSCA | All rights reserved.</span>
              <br />
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/punit-saini-2003/"
                className="text-gray-500 hover:text-gray-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Punit
              </a>
            </p>
        

    </footer>
    {/* <div className='md:h-10 bg-my-grey w-full'></div> */}
    </div>

    </div>
  )}
