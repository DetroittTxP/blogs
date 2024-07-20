"use client"

import React, { useEffect, useState } from 'react'
import Addpost from './Addpost'
import Managepost from './Managepost';
import { useSession } from 'next-auth/react';
import { ClipLoader } from 'react-spinners';


export default function Managempostpage() {

  const [showAddPost,SetshowAddpost] = useState<boolean>(false);
  const {data:session,status}  = useSession();
  const [SessionId,Setsessionid] = useState<string | undefined>('');
  
  useEffect(() => { 
      if(session && status == 'authenticated'){
          Setsessionid(session.user.id)
      }
  },[status])

  return (
    <div>
        <div id="header" className='text-center'>
          <h1 className="p-7 font-bold font-serif text-2xl">Manage Your Post</h1>
        </div>

        <div id='' className='pl-20'>
            <button
               onClick={() => SetshowAddpost(!showAddPost)}  
              className='p-3 transition duration-300 ease-in hover:bg-green-300  bg-white rounded-lg text-xl font-serif shadow-lg'>
                {showAddPost ? "Manage Post" : "Add Post"}
                
                </button>
        </div>


        <section id='post'>
            
               { showAddPost ?  <Addpost authorId={SessionId} /> : <Managepost authorId={SessionId}/> }          
           
                 
        </section> 
    </div>
  )
}
