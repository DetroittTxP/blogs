'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ImageCarousel } from './ImageCarousel';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer,toast,Bounce } from "react-toastify";
interface AddpostPROP{
    authorId:string | undefined
}

interface postDataType{
     images?:[string],
     title:string,
     content:string
     authorId?:string
}

const Addpost:React.FC<AddpostPROP>=({authorId}) =>  {

  const [previewImage,SetpreviewImage] = useState<string[]>([]);
  const [FilesImage,SetFileImages] = useState<File[] | undefined>(undefined);
  const [data,Setdata] = useState<postDataType>({
     title:'',
     content:'',
     authorId:authorId,

  });
  const [IsPosting,SetisPosting] = useState<boolean>(false);
  
  const notifySuccess = () => toast.success('Success');

  const onImageChange=(e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files){
        
          const files = Array.from(e.target.files)
          
          files.forEach((image) => {
               const Imageurl = URL.createObjectURL(image);
               SetpreviewImage(prev => [...prev,Imageurl])
          })

          SetFileImages(files);
      }
  }

  const onDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
        Setdata(prev => {
             return {
                 ...prev,
                 [e.target.name]:e.target.value
             }
        })
  }

  const onSubmit= async (e:FormEvent) => {
        e.preventDefault();
        SetisPosting(true);
        try{
            const imageData = new FormData();
            
            FilesImage?.forEach(file => {
                   imageData.append('images', file);
            })

            let uploadimage = await axios.post(`${process.env.NEXT_PUBLIC_IMAGEHOST}/post/${authorId}`, imageData);

            if(uploadimage.status === 200){
                 
                
                const {filenames} = uploadimage.data;

                const postdata:postDataType = {
                     ...data,
                     images:filenames
                }

                let createpost = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {postdata});
                
                if(createpost.status === 201){
                    SetisPosting(false);
                    return notifySuccess();
                }
  
            }
            
        }
        catch(err){

        }
        
  }


  return (
    <div className='mt-1'>

        
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
            
            <div className='p-10'>
                <form onSubmit={onSubmit}>
                     <div className='flex flex-col space-y-8'>


                     <div id="profileimage" className="flex justify-center items-cente">
                            <ImageCarousel images={previewImage}/>
                      </div>


                       <div className='flex flex-col space-y-2'>
                            <label className='font-serif  text-lg'>PostImage</label>
                            <input 
                            className='p-2 border-b-2 focus:border-b-2 focus:border-red-500  transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50'
                            type='file'
                            multiple
                            accept='image/*'
                            onChange={ onImageChange}
                            required
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='font-serif  text-lg'>Title</label>
                            <input onChange={onDataChange}  required name='title'
                            className='p-3 border-b-2 focus:border-b-2 focus:border-red-500  transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50'
                            type='text'/>
                        </div>

                        
                        <div className='flex flex-col space-y-2'>
                            <label className='font-serif  text-lg'>Content</label>
                            <textarea   required name='content' onChange={(e:ChangeEvent<HTMLTextAreaElement>) => Setdata(prev => ({...prev,[e.target.name]:e.target.value}))}
                            className='p-3 border-b-2 focus:border-b-2 focus:border-red-500  transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50'
                           />
                        </div>

                          { IsPosting ? <div className="flex justify-center items-center">
                                   <ClipLoader size={32}/>
                             </div> :
                             <div className=''>
                                <button type='submit' className='bg-blue-400 w-full mt-3 p-2 rounded-lg shadow-lg text-white hover:bg-opacity-50 transition duration-300 ease-in-out '>Post</button>
                           </div>}
                         
                
                     </div>
                 
                </form>
            </div>
            
    </div>
  )
}

export default Addpost;
