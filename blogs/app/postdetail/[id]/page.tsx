import axios from 'axios'
import React from 'react'
import ImageCarousel from './ImageCarousel'
import AuthorDetail from './AuthorDetail'
import Comments from './Comments'


type PostdeatilProp = {
    params:{
        id:string
    }
}


const GetPostWithUserInfo = async (postid :string) => {
     
  try{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/post/${postid}?details=postdetailuser`);
      if(res.status !== 200){
         throw new Error('Cannot GetPostWithUserInfo ');
      }

      return res.data;
  }
  catch(err){
     console.log('Error get post with user');
    return;
  }

} 

const Postdetail:React.FC<PostdeatilProp> = async ({params}) =>  {

  const data = await GetPostWithUserInfo(params.id);

  console.log(data);
  

  return (
    <div className='p-4 my-14 flex flex-col space-y-5  items-center '>

         <div className='flex justify-start max-w-2xl overflow-hidden  w-full'>
            <p className='text-6xl font-serif ' style={{wordBreak:'break-all'}}>
                  {data.title}
            </p>
        </div>

        <div className='max-w-2xl w-full'>
            <AuthorDetail authorDetail={data.authorId} createdAt={data.createdAt} />
        </div>


        <div className='max-w-3xl  w-full'>
            <ImageCarousel postImg={data.images} author={data.authorId._id} />
        </div>

        <div className='max-w-2xl w-full'>
             <div  className='p-3'>
                 <p className='text-left whitespace-pre-wrap text-xl'>{data.content}</p>
             </div>
        </div>

        <div className='max-w-3xl w-full' id='comment'>
            <Comments postId={params.id} />
        </div>

       
       
      
    </div>

  )
}


export default Postdetail;
