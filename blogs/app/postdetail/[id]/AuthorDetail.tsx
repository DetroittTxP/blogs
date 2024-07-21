import React from 'react'
import {format} from 'date-fns';
interface AuthorDetailPROP{
     authorDetail:{
           _id:string,
           username:string,
           profilePicture:string
     },
     createdAt:Date
}

const AuthorDetail:React.FC<AuthorDetailPROP>=({authorDetail,createdAt})=> {

    console.log(createdAt);
    
    
  return (
    <div className='flex justify-between mt-4'>
            <div className='flex'>
                <img className='w-14 h-14 rounded-full object-cover' src={`${process.env.NEXT_PUBLIC_IMAGEHOST}/user/${authorDetail._id}/${authorDetail.profilePicture}`}/>
                 <div className='p-1 pl-3'>
                    <p className=' font-serif text-lg'> {authorDetail.username}</p>
                    <p className='text-gray-400'>{format(new Date(createdAt),'dd MMMM , yyyy')}</p>
                 </div>
            </div>

            
            <div >
                   <button className="p-2 px-6 border text-center rounded-lg font-serif hover:bg-gray-400 hover:text-white 
                         transition duration-300 ease-in-out">Follow</button>
            </div>
    </div>
  )
}

export default AuthorDetail;
