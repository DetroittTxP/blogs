'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Modal, Space } from 'antd';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface reviewDatatype{
  postId:string,
  authorId:string | undefined,
  content:string,
}

interface prop{
  postId:string
}

const AddCommentModal:React.FC<prop> = ({postId}) => {
  const [open, setOpen] = useState(false);
  const {data:session,status} = useSession();


  const [reviewdata,Setreviewdata] = useState<reviewDatatype>({
      postId:postId,
      authorId:'',
      content:''
  });

  useEffect(() => {
      if(session && status === 'authenticated'){
           Setreviewdata(prev => ({...prev,authorId:session?.user?.id}))
      }
  },[status])



  const showModal = () => {
    if(!session && status !== 'loading' || status  === 'unauthenticated'){
      console.log('clicked');
       return  Swal.fire({
              title:'Please Login First ',
              
          })
  }


      return setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    
  };

  const handleCancel = () => {
    setOpen(false);
    
  };

  const onSubmit=async(event:FormEvent)=>{
     event.preventDefault();
      try{
          if(reviewdata)
          {
            let addcomment = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/comments`, {reviewdata});
            
            if(addcomment.status === 201){
              return  Swal.fire({
                title:'Add Review Success',
                icon:'success'
            })
            }

          }


      }
      catch(err){
        console.log(err);
         return alert('Cannot add comment');
      }
   
      

  }

  return (
    <div className=''>
     
        <Modal
          open={open}
          title={<p className='text-center font-serif text-lg' >Title</p>}
          

          onCancel={handleCancel}
          footer={null}
          // footer={(_, { OkBtn, CancelBtn }) => (
          //   <div className='flex gap-6 justify-end p-1'>
          //     <button type='submit' className='border border-gray-400 p-1  rounded-lg'  >Add Comment</button>
          //     <button type='button' onClick={handleCancel} className='border border-gray-400 p-1 rounded-lg'>Close</button>
          //   </div>
          // )}
        >
            <div className='p-4'>
              
            <form onSubmit={onSubmit}>   
                  <div className='flex flex-col my-3'>
                        <label className='font-bold font-serif text-lg'>Your Username</label>
                        <input value={session?.user.username} name={session?.user.id} disabled type='text' className='border-2 hover:bg-gray-200 
                                                        p-2 rounded-lg transition-all font-serif
                                                        duration-300 ease-in-out focus:border-red-500 outline-none'/>
                                
                    </div>

                    <div className='flex flex-col my-3'>
                        <label className='font-bold font-serif text-lg'>Your comment</label>
                        <textarea 
                           onChange={(e) => Setreviewdata(prev => ({...prev,content:e.target.value}))}
                        name="content" className='border h-24 rounded-lg border-2 hover:bg-gray-200
                                                        p-2  transition-all 
                                                        duration-300 ease-in-out focus:border-red-500 outline-none'  />
                    </div>

                  <div className='flex gap-6 justify-end items-end p-1'>
                    <button type='submit' className='border hover:bg-gray-300 transition-colors ease-in-out border-gray-400 p-1  rounded-lg'  >Add Comment</button>
                    <button type='button' onClick={handleCancel} className='border hover:bg-gray-300 transition-colors ease-in-out border-gray-400 p-1  rounded-lg'>Close</button>
              </div>

              </form> 
            </div>
      </Modal>


      <div className='flex justify-center'>
            <button onClick={showModal} className='p-3 border border-gray-300 
                              font-serif hover:bg-gray-400 hover:text-white rounded-lg
                              transition-colors duration-300 ease-in-out
                              '>Add Comment</button>
        </div>

    </div>
  )
}

export default AddCommentModal