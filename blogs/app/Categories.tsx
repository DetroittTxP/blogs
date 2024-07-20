import React from 'react'
import { MdCardTravel } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { GiLifeBar } from "react-icons/gi";


export default function Categories() {
  return (
    <div className='p-6 mx-14 mt-14'>
        
        <div className='flex justify-center'>
                <div className='grid grid-cols-4 gap-7'>
                       
                       <button >
                            <div className='px-3 px-3 flex flex-col items-center hover:text-gray-500  '>
                                <GiClothes  size={32}/>    
                                <p className='text-lg font-serif mt-1 hover:underline focus-within:underline '>Fasion</p>
                            </div>            
                       </button>
                      

                       <div className='px-3 px-3 flex flex-col items-center'> 
                         <MdOutlineFoodBank size={32}/>
                          <p className='text-lg font-serif mt-1'> Cook</p>
                       </div>

                       <div className='px-3 flex flex-col items-center'>
                         <MdCardTravel size={32} />
                          <p className='text-lg font-serif mt-1'>Travel</p>
                       </div>

                       <div className='px-3 px-3 flex flex-col items-center'>
                        < GiLifeBar size={32}/>
                          <p className='text-lg font-serif mt-1'> Lifestyle</p>
                       </div>
                </div>
        </div>

    </div>
  )
}
