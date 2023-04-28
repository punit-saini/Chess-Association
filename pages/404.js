import Link from "next/link" 

export default function Custom404() {

    return <>
         <div>
                <h1 className="min-h-screen font-bold text-2xl my-20 text-center">404! Ye kahan aa gaye tum?</h1>
                <Link className="text-black underline" href={'/'}>Mujhe wapas le chalo</Link>
         </div>
        
    </>
  }
