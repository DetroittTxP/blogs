'use client'
import React, { useState } from 'react'
import Showcomments from './Showcomments'
import AddCommentModal from './AddCommentModal'
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

interface CommentProp{
   postId:string
}

const Comments:React.FC<CommentProp> = ({postId}) => {

  const [ShowAdd,Setshowadd] = useState<boolean>(false);
  const {data:session,status} = useSession();


  return (
    <div className='flex flex-col space-y-5'>
            <div>
                <h1 className='font-serif text-2xl'>{ShowAdd ? "Add Your Comment" : "Comments"}</h1> 
            </div>
           
             <Showcomments/>
             <AddCommentModal postId={postId} />

    </div>
  )
}

export default Comments