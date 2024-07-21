

import axios from "axios";
import Link from "next/link";
import {format} from 'date-fns';
import Categories from "./Categories";

interface Postdata {
   title:string,
   content:string,
   authorId:string,
   _id:string,
   images:[string],
   createdAt:Date,
   updatedAt:Date
}

interface Userdata  {
  _id:string,
  username:string
  profilePicture:string
}

const GetPosts = async () => {
    try{

      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/post`);
      if(res.status !== 200){
         throw new Error('Cannot get allpost');
      }

      return res.data;

    } 
    catch(err){
       console.log(err, " Post data");
       return;
    }   
}


const GetPerUser = async (authorId : string[] ) => {
    try{

      const params = new URLSearchParams();

      authorId.forEach(id => params.append('authorId', id));
       let getuser = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user?detail=per&${params.toString()}`)
      
      if(getuser.data.message === 'Success'){
          return getuser.data.users;
      }
       


    }
    catch(err){
      console.log(err, " User data ");
      
    }
}




export default async function Home() {
   
  const handleData = async () => {
    const allpost:Postdata[] = await GetPosts();
    const userdata:Userdata[] = await GetPerUser(allpost.map(data => data.authorId));

      let alldata = allpost.map((data) => {
        let user = userdata.find((u) => u._id === data.authorId);
        return {
          ...data,
          authorId:user,
          createdAt:format(new Date(data.createdAt),'dd MMMM , yyyy')
        }

})

    

    return alldata;
  }


  const allpostdata = await handleData();

  const LimitTextTo20=(text:string)=>{
    const words = text.split(' ');
    if(words.length > 10){
      return words.slice(0, 5).join(' ') + '...';
    }
    return text;
}


  return (
    <main>
      <section id="category">
          <Categories/>
      </section>

      <section  id="homepage all post">
              <div className="my-10 mx-14 p-6 ">
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4   gap-10 ">
   
                        {allpostdata.map((data) => {
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
                               <h3 className="text-lg  font-serif font-bold mb-2">{data.title}</h3>
                           
                               <p className="text-gray-700 font-serif my-2">{LimitTextTo20(data.content)}</p>
                        
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
                      

                  </div>
              </div>
      </section>

      
        
    </main>
  );
}
