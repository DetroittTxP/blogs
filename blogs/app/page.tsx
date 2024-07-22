

import axios from "axios";
import Link from "next/link";
import {format} from 'date-fns';
import Categories from "./Categories";
import Listpost from "./Listpost";

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

interface CombinedData extends Omit<Postdata, 'authorId' | 'createdAt'> {
  authorId: Userdata;
  createdAt: string;
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
   
  const handleData = async (): Promise<CombinedData[]> => {
    const allpost: Postdata[] = await GetPosts();
    const userdata: Userdata[] = await GetPerUser(allpost.map(data => data.authorId));

    return allpost.map((data) => {
        const user = userdata.find((u) => u._id === data.authorId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            ...data,
            authorId: user,
            createdAt: format(new Date(data.createdAt), 'dd MMMM, yyyy')
        };
    });
}



  const allpostdata: CombinedData[] = await handleData();



  return (
    <main>
      <section id="category">
          <Categories/>
      </section>

      <section  id="homepage all post">
              <div className="my-10 mx-14 p-6 ">
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4   gap-10 ">
                    <Listpost allpostdata={allpostdata} />
   
                       
                      

                  </div>
              </div>
      </section>

      
        
    </main>
  );
}
