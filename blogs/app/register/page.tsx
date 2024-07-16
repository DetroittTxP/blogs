"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios  from "axios";
import { ClipLoader } from "react-spinners";
export default function RegisterPage() {
  const [username, Setusername] = useState<string>("");
  const [password, Setpassword] = useState<string>("");
  const [comfirmpassword, Setcomfirmpassword] = useState<string>("");
  const [email, Setemail] = useState<string>("");
  const [loading,Setloading] = useState<boolean>(false);

  const router = useRouter();
  const ToastSuccess = () => (
    <div className="font-serif ">
      <h4 className="text-lg ">Register Success</h4>
      <p className="font-bold">Go to Login ? </p>
      
      <div className="space-x-5">
        <button className="mt-1 p-1 hover:bg-slate-300 border border-2 rounded-lg" onClick={() => toast.dismiss()}>Close</button>
        <button className="mt-1 p-1 hover:bg-slate-300 border border-2 rounded-lg" onClick={() => router.replace('/login')}>Go</button>
      </div>

    </div>
  );

  const ToastError = () => (
     <div>
         
     </div>
  )

  const notifySuccess = () => toast.success(ToastSuccess());
  const notifyError = () => toast.error(ToastError());

  const onSubmit = async (e: FormEvent) => {
    
    e.preventDefault();
    Setloading(true);
    if(password != comfirmpassword){
        return toast.info('Password must be same')
   }

   try{
      let regsiter = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user`,{username,password,email});
      if(regsiter.status === 201){
         Setloading(false);
         return notifySuccess();
      }
   }
   catch(err){
      console.log(err);
      Setloading(false);
      return toast.error('Cannot Register your account')
   }
  

  };

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

            <div className="flex flex-col ">
              <label htmlFor="Password" className="text-lg font-serif">
                Comfirm-Password
              </label>
              <input
                type="text"
                required
                placeholder="comfirmpassword"
                onChange={(e) => Setcomfirmpassword(e.target.value)}
                className="p-2 pl-3 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex flex-col ">
              <label className="text-lg font-serif">Email</label>
              <input
                type="text"
                required
                placeholder="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  Setemail(e.target.value)
                }
                className="p-2 pl-3 rounded-lg border-2   border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="mt-4 flex items-center justify-center">
                {loading ? <ClipLoader/> :
                <button className=" transition duration-500 ease-in-out  p-2 rounded-lg border border-2  hover:bg-gray-400">
                Sign Up
              </button>
}

         
             
            </div>
            <ToastContainer  
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
            

        </div>
        </form>
      </div>
    </div>
  );
}
