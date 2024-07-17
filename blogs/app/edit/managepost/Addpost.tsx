'use client'
import React, { ChangeEvent, useState } from 'react'
import { ImageCarousel } from './ImageCarousel';


interface CardProp{
   images:string[] 
}

export default function Addpost() {

  const [previewImage,SetpreviewImage] = useState<string[]>([]);


  const onImageChange=(e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files){
        
          const files = Array.from(e.target.files)

          files.forEach((image) => {
               const Imageurl = URL.createObjectURL(image);
               SetpreviewImage(prev => [...prev,Imageurl])
          })
      }
  }

  return (
    <div className='mt-5'>
            
            <div className='p-10'>
                <form>
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
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='font-serif  text-lg'>Title</label>
                            <input 
                            className='p-2 border-b-2 focus:border-b-2 focus:border-red-500  transition ease-in focus:outline-none border   rounded-lg shadow-lg hover:bg-gray-50'
                            type='text'/>
                        </div>



                     </div>
                 
                </form>
            </div>
            
    </div>
  )
}
