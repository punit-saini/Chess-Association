import Link from 'next/link';

export default function Footer() {
  return (
    <div className='bg-my-grey'>
    <footer className="bg-gradient-to-b from-my-black to-my-green text-white md:pb-10 pt-10 px-4 sm:px-10 md:rounded-b-3xl">
      <div className="container mx-auto">
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
              <Link href="#" className="mr-4 opacity-70 cursor-not-allowed">
                <img className="w-6 h-6" src="../instagram.png" alt="Instagram" />
              </Link>
              <Link href="#" className="mr-4 opacity-70 cursor-not-allowed">
                <img className="w-6 h-6" src="../twitter.png" alt="Twitter" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100076434217040" className="mr-4">
                <img className="w-6 h-6" src="../facebook.png" alt="Facebook" />
              </Link>
              <Link href="#" className='mr-4 opacity-70 cursor-not-allowed'>
                 <img className='w-6 h-6' src='../youtube.png' alt='Youtube' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className='md:h-10 bg-my-grey w-full'></div>
    </div>
  )}
