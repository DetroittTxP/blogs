"use client"
import React,{ChangeEvent, FormEvent, useEffect, useState} from "react";
import Image from 'next/image'
import axios from "axios";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { ToastContainer,toast,Bounce } from "react-toastify";

interface userdata {
   username:string,
   email:string,
   bio?:string,
   profilePicture?:string
}

export default function EditProfilePage() {

  const [imageUrl,SetimageURL] = useState<string >('');
  const [userdata,Setuserdata] = useState<userdata>({
     username:'',
     email:''
  });
  const [isLoading,Setloading] = useState<boolean>(false);
  const [imageFile,SetimageFile] = useState<File | undefined>(undefined);
  const [isEditing,SetisEditing] = useState<boolean>(false);
   
  const {data:session} = useSession();

    
 
  useEffect(() => {
    Setloading(true);
      if(session){
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/${session?.user?.id}?details=edit`)
        .then(res => {
          if(res.status!= 200){
               return alert('error getting user data')
          }
           
           Setuserdata(res.data)
           return Setloading(false);
        })
      }
  },[session])

  const onFileChange=(event:ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files ? event.target.files[0] : null;
      if(!file){
          return;
      }
      const url = URL.createObjectURL(file);
      SetimageFile(file);
      return SetimageURL(url);
  }

  const onChange=(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        return Setuserdata(prev => (
            {
               ...prev,
               [e.target.name]:e.target.value
            }
        ))
  }

  const onSubmit= async (e :FormEvent)=>{
        e.preventDefault();
        SetisEditing(true);
        const imagedata = new FormData();

        try{
          let newimagename = null;
          if(imageFile){
            imagedata.append('image', imageFile)
            
            let upload = await axios.post(`${process.env.NEXT_PUBLIC_IMAGEHOST}/user/${session?.user.id}`, imagedata);

            if (upload.status === 200) {
                newimagename = upload.data.filename
            }
          }

          const newuserdata = {
               ...userdata,
               profilePicture:newimagename ? newimagename : userdata.profilePicture
          }

          let updatedatainDB = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/${session?.user.id}`,{newuserdata});
      
          
          if(updatedatainDB.status === 200){
  
              SetisEditing(false);
             return notifySuccess();
             
          }

        }
        catch(err){
            console.log(err);
            
            return toast.error('error updating');
        }

       
  }

  const notifySuccess = () => toast.success('Success');


  return (
    <div>
      { isLoading ? <div className="flex justify-center items-center">
             
        <ClipLoader size={32}/>

      </div> :<>  <div className="flex justify-center items-center ">
        <div id="header">
          <h1 className="p-7 font-bold font-serif text-2xl">Your Profile</h1>
        </div>
      </div>

            <ToastContainer  
                position='bottom-right'
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme='light'
                transition={Bounce}
            />
      
            <ToastContainer  />

      <div id="profileimage" className="flex justify-center items-cente">
      <img className="mt-5 w-64 h-64 rounded-full object-cover" 
                             src={imageUrl ? imageUrl : `${process.env.NEXT_PUBLIC_IMAGEHOST}/user/${session?.user.id}/${userdata.profilePicture}`} 
                              alt="profileImage"   />
      </div>

      <div className="p-10" id="form">
        <form onSubmit={onSubmit}>

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
                  onChange={onChange}
                  name="email"
                  value={userdata.email }
                  type="text"
                  className="p-2 focus:border-red-500   hover:bg-gray-100  appearance-none transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50"
                />
              </div>

              <div className="flex flex-col space-y-2  border-b-2 mt-8 focus-within:border-red-500">
                <label className="font-serif  text-lg">Bio</label>
                <textarea
             
                  value={userdata.bio }
                  onChange={onChange}
                  name="bio"
                  className="p-2 focus:border-red-500  
                     hover:bg-gray-100
                     appearance-none transition ease-in focus:outline-none border rounded-lg shadow-lg hover:bg-gray-50"
                />
              </div>

            {isEditing ?  <div className="flex justify-center"><ClipLoader size={32}/></div>:  <button type="submit" className="p-2 border bg-blue-200 rounded-lg 
                font-serif hover:bg-blue-100 font-bold text-lg transition-all duration-300
                ease-in-out
               ">Confirm</button>}
          </div>

          

          
         
        </form>
      </div> </>}
    </div>
  );
}
