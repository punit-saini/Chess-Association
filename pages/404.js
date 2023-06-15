import Link from "next/link" 

export default function Custom404() {

    return <>
         <div>
                <h1 className="min-h-screen font-bold text-2xl my-20 text-center">404! PAGE NOT FOUND <br/> 
                <span className=" text-sm underline underline-offset-4"><Link href={'/'}>Take me to home route</Link></span>
                </h1>
         </div>
        
    </>
  }
