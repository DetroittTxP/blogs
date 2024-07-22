'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { InputContext, useInputContext } from './inputContext'

interface ListpostProp{
    allpostdata:any[]
}

const Listpost:React.FC<ListpostProp> = ({allpostdata}) => {
    const inputContext1 = useContext(InputContext);
    const [newpostdata, setNewPostData] = useState(allpostdata);
    const input = inputContext1?.inputData || '';

    const LimitTextTo20=(text:string , type : string)=>{

      if(type === 'title'){
        if (text.length > 20) {
          return text.slice(0, 20) + '...';
        }

        return text;
        
      }
      else if(type == 'content'){
        if (text.length > 20) {
          return text.slice(0, 36) + '...';
        }
          
       return text;
      }
 
    }


    useEffect(() => {
        setNewPostData(allpostdata.filter(data => data.title.toLowerCase().includes(input.toLowerCase())));

    },[input,allpostdata])
    


  return (
    <>
         {newpostdata.map((data) => {
                                    console.log(data.content.length);

                             
                             return (
                              <Link href={`/postdetail/${data._id}`}>
                              <div className="bg-white    rounded-lg shadow-lg transition-transform duration-300 overflow-hidden hover:scale-110">
                             <div  id="image" className="relative">
                                  <img loading="lazy" className="  transition-transform duration-300 hover:scale-125 object-cover w-full h-72" alt={data.title} src={`${process.env.NEXT_PUBLIC_IMAGEHOST}/post/${data?.authorId?._id}/${data.images[0]}`}/>
                                  <div className=" p-2 absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start opacity-0 transition-opacity duration-300 hover:opacity-100">
                                   <h3 className="text-white text-lg font-bold">{data.title}</h3>
                                 </div>
                             </div>


                           
                             <div className="p-4">
                               <h3 className="text-lg  font-serif font-bold mb-2">{LimitTextTo20(data.title,'title')}</h3>
                           
                               <p className="text-gray-400 font-serif my-2">{LimitTextTo20(data.content,'content')}</p>
                        
                             </div>
                         

                             <div id="author-section" >
                                   <div className="p-4 flex justify-between">

                                         <div className="flex">
                                           <img className="rounded-full w-10 h-10 object-cover " src={`${process.env.NEXT_PUBLIC_IMAGEHOST}/user/${data.authorId?._id}/${data.authorId?.profilePicture}`}/>
                                           <p className="font-serif p-2">{data.authorId?.username}  </p>
                                         </div>

                                         <div>
                                           <p className="font-serif text-gray-400"> {data.createdAt.toString()}</p>
                                         </div>
                                      
                                        
                                   </div>
                             </div>

                         </div>

                       </Link>
                             )
                        })}
    </>
  )
}

export default Listpost;