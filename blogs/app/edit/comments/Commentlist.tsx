'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Bounce, ToastContainer,toast } from 'react-toastify'
import Swal from 'sweetalert2'


interface commentdatatype{
     _id:string,
     authorId:string,
     content:string
     postId:string
}

const Commentlist = () => {

    const {data:session,status} = useSession();
    
    const [loading,Setloading ] = useState<boolean>(false);
    const [commentsdata,Setcommentdata] = useState<commentdatatype[]>([]);


    useEffect(() => {
        Setloading(true);
         if(status === 'authenticated'){
                const authorId = session.user.id;

                axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/comments?queryAuthorId=${authorId}`)
                .then(res => {
                      Setcommentdata(res.data);
                      return Setloading(false);
                })
                .catch(err => alert(err))

         }
    },[status])


    const onDeleteComment=(id : string) => {
           Swal.fire({
               title:'Delete this Comment ? ',
               icon:'question',
               showConfirmButton:true,
               showCancelButton:true
           })
           .then(async result => {
                if(result.isConfirmed){
                    try{
                        let res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/comments?deleteId=${id}`);
                        if(res.status === 200){
                            Setcommentdata(data => data.filter(i => i._id !== id));
                            return toast.success('Comment deleted');
                        }
                    }
                    catch(err){
                        console.log(err);
                        
                    }
                }
           })
    }

  return (

    <div className='m-10 p-10'>
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
   { loading ? <ClipLoader /> :  
      <div className='grid  sm:grid-cols-2  lg:grid-cols-4 gap-6 gap-y-10'>

            {commentsdata.map((data) => (
                                    
                                <div className='bg-white w-full  rounded-lg shadow-lg flex flex-col justify-between'>
                                <div className='p-2'>

                                    <div className='flex justify-between'>
                          
                                        <a href={`/postdetail/${data.postId}`} className= ' text-blue-500 hover:underline'> Go to post </a>
                                    </div>

                                    <div className='pt-7'>
                                        {data.content}
                                    </div>
                                    
                                </div>
                                <div className='flex justify-between items-center text-center'>
                                    <button onClick={() => onDeleteComment(data._id)} className='bg-blue-500 hover:bg-opacity-50
                                                         rounded-bl-lg  w-full p-1 text-white
                                                         transition duration-300 ease-in-out
                                                         ' >Delete</button>

                                    <button className=' bg-red-500 hover:bg-opacity-50   
                                                         transition duration-300 ease-in-out 
                                                         text-white rounded-br-lg w-full p-1'>Edit</button>
                                </div>
                            </div>

                            ))}
                
    </div>}
</div>


  )
}

export default Commentlist