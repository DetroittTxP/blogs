'use client'

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import {signIn} from 'next-auth/react';
export default function LoginPage() {

  const [username,Setusername] = useState<string>('');
  const [password,Setpassword] = useState<string>('');
  const [loading,Setloading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit=async(e:FormEvent)=>{
      e.preventDefault();

      try{
         const res = await signIn('credentials',{
                username,
                password,
                redirect:false
         })

         if(res?.error){
             return alert('invalid credentials');
         }

         return router.replace('/');
      }
      catch(err){
         return console.log(err);
         
      }

  }


  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="  shadow-xl max-w-sm w-full p-8 rounded-lg">
      <h1 className="text-center text-xl font-bold font-serif">Sign Up</h1>
      <form onSubmit={onSubmit}>
      <div className="space-y-4">
     
          <div className="flex flex-col ">
            <label htmlFor="Username" className="text-lg font-serif">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="username"
              onChange={(e) => Setusername(e.target.value)}
              className="p-2 pl-3 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out 
                                               focus:border-blue-500 
                                                 focus:outline-none 
                                                 focus:bg-white"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="Password" className="text-lg font-serif">
              Password
            </label>
            <input
              type="text"
              required
              placeholder="password"
              onChange={(e) => Setpassword(e.target.value)}
              className="p-2 pl-3 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:bg-white"
            />
          </div>

      

         
          <div className="mt-4 flex items-center justify-center">
              {loading ? <ClipLoader/> :
              <button className=" transition duration-500 ease-in-out  p-2 rounded-lg border border-2  hover:bg-gray-400">
              Sign Up
            </button>
}

       
           
          </div>
          {/* <ToastContainer  
              position='bottom-right'
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              transition={Bounce}
              pauseOnHover
              draggable
              theme='light'
          />
         
          <ToastContainer  />
           */}

      </div>
      </form>
    </div>
  </div>
  )
}