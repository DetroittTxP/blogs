"use client"
import React,{ChangeEvent, FormEvent, useEffect, useState} from "react";
import Image from 'next/image'
import axios from "axios";
import { useSession } from "next-auth/react";

interface userdata {
   username:string,
   email:string,
   bio?:string,
   profileImage?:string
}

export default function EditProfilePage() {

  const [imageUrl,SetimageURL] = useState<string >('');
  const [userdata,Setuserdata] = useState<userdata>({
     username:'',
     email:''
  });
  const {data:session} = useSession();
    console.log(session);
    console.log();
    
 
  useEffect(() => {
      if(session){
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/${session?.user?.id}?details=edit`)
        .then(res => {
          if(res.status!= 200){
               return alert('error getting user data')
          }
           return Setuserdata(res.data)
        })
      }
  },[session])

  const onFileChange=(event:ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files ? event.target.files[0] : null;

      if(!file){
          return;
      }

      const url = URL.createObjectURL(file);
      SetimageURL(url);

  }


  return (
    <div>
      <div className="flex justify-center items-center ">
        <div id="header">
          <h1 className="p-7 font-bold font-serif text-2xl">Your Profile</h1>
        </div>
      </div>

      <div id="profileimage" className="flex justify-center items-cente">
       { imageUrl &&  <img className="mt-5 w-64 h-64 rounded-full object-cover" 
                             src={imageUrl} 
                              alt="profileImage"   />}
      </div>

      <div className="p-10" id="form">
        <form>

          <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2 ">
                <label className="font-serif  text-lg">ProfileImage</label>
                <input
                  type="file"
                  className="p-2 focus:border-red-500 transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50"
                  onChange={onFileChange}
                  accept="image/*"
                />
              </div>


            <div className="flex flex-col space-y-2  border-b-2 mt-8 focus-within:border-red-500">
                <label className="font-serif  text-lg">Username</label>
                <input
                  disabled
                  value={userdata.username }
                  type="text"
                  className="p-2 focus:border-red-500   appearance-none transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50"
                />
              </div>

              
            <div className="flex flex-col space-y-2  border-b-2 mt-8 focus-within:border-red-500">
                <label className="font-serif  text-lg">Email</label>
                <input
             
                  value={userdata.email }
                  type="text"
                  className="p-2 focus:border-red-500   hover:bg-gray-100  appearance-none transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50"
                />
              </div>

              <div className="flex flex-col space-y-2  border-b-2 mt-8 focus-within:border-red-500">
                <label className="font-serif  text-lg">Bio</label>
                <textarea
             
                  value={userdata.bio }
                
                  className="p-2 focus:border-red-500  
                     hover:bg-gray-100
                     appearance-none transition ease-in focus:outline-none border rounded-lg shadow-lg hover:bg-gray-50"
                />
              </div>

              <button type="submit" className="p-2 border bg-blue-200 rounded-lg 
                font-serif hover:bg-blue-100 font-bold text-lg transition-all duration-300
                ease-in-out
               ">Confirm</button>
          </div>

          

          
         
        </form>
      </div>
    </div>
  );
}
