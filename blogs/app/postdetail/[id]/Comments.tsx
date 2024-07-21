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
  const [commentslength,Setcommentlength] = useState<number>(0);

  const getCommentlength=(length : number)=>{
    Setcommentlength(length);
  }

  return (
    <div className='flex flex-col space-y-5'>
            
           
             <Showcomments postId={postId}/>
             <AddCommentModal postId={postId} />

    </div>
  )
}

export default Comments