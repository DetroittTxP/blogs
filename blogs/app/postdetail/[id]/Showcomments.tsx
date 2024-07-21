import axios from 'axios';
import React from 'react'
import {format} from 'date-fns';
const GetComments=async(postid : string)=>{
  try{
    let res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/comments/${postid}`);
    if(res.status !== 200){
       throw new Error('cannot get commoents');
    }
    return res.data;

  }
  catch(err){
     console.log(err);
     return;
  }

}

interface commentType{
   _id:string,
   authorId:{
      _id:string,
      username:string,
      profilePicture:string
   },
  content:string,
  createdAt?:any
    
}

interface ShowCommentProp{
  postId:string
}


const Showcomments:React.FC<ShowCommentProp> = async ({postId,}) => {

  const commentss:commentType[] = await GetComments(postId);
  

  
  return (
    <div className='space-y-2'>
           
           <div>
                <h1 className='font-serif text-2xl'>Comment {commentss.length}</h1> 
            </div>
           

            {commentss.map((data) => {
                   
                   return (
                        <div className='p-2'>
                             <div className='flex'>

                                <img className='w-14 h-14 rounded-full object-cover' src={`${process.env.NEXT_PUBLIC_IMAGEHOST}/user/${data.authorId._id}/${data.authorId.profilePicture}`}/>
                                <div>
                                   <p className='p-3 font-serif'>{data.content}</p>
                                   <p className='pl-3 text-gray-400'>{format(new Date(data.createdAt),'dd/MM/yyyy')}</p>
                                </div>
                                
                             </div>
                        </div>
                   )
            })}

            {/* <div className='p-2'>
            Comments 1
            </div>

            <div className='p-2'>
            Comments 2
            </div>

            
            <div className='p-2'>
            Comments 2
            </div>

            
            <div className='p-2'>
            Comments 2
            </div> */}
            
  </div>
 
  )
}

export default Showcomments