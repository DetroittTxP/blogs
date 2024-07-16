"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname,  } from 'next/navigation'

interface Sidemenuprop{
    userid:string
}

export default function Sidemenu() {
 
   
    const pathname = usePathname();

    

  return (
    <div className="shadow-xl p-4  bg-gray-100 h-full">

        <div className='flex flex-col p-4 space-y-5'>
               <Link  className={`font-serif   hover:bg-white w-full p-4  ${pathname == "/edit/profile" ? "bg-white text-2xl" : 'text-lg' }  rounded-lg
                  transition-all duration-300 ease-in-out
               
               `} 
                    href="/edit/profile">Edit Your Profile</Link>

               <Link className={`font-serif   hover:bg-white w-full p-4  ${pathname == "/edit/managepost" ? "bg-white text-2xl" : 'text-lg' }  rounded-lg
                  transition-all duration-300 ease-in-out 
               `} 
                     href="/edit/managepost">Manage Post</Link>
        </div>


  </div>
  )
}
 