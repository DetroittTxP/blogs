"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer,toast,Bounce } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface ManagePostProp {
  authorId: string | undefined;
}

interface PostDataType{
    _id:string,
    title:string,
    content:string
}


const Managepost: React.FC<ManagePostProp> = ({ authorId }) => {
  const [postdata, Setpostdata] = useState<PostDataType[]>([]);
  const [loading,Setloading] = useState<boolean>(false);

  const onDelete=async(id:string, images:string[])=>{
      
  }

  const onEdit=()=>{

  }

  useEffect(() => {

    Setloading(true);
    if (authorId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/api/post/${authorId}`)
        .then((res) => {
          Setpostdata(res.data);
          return Setloading(false);
        })
        .catch((err) => alert("err"));
    }
  }, [authorId]);

  return (
    <div className="mt-5 p-4 px-5">

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
      
 { loading ? <div className="flex justify-center items-center"><ClipLoader/></div> :  <table className="table-auto w-full border-collapse border border-gray ">
  <thead>
    <tr className="bg-gray-100 font-serif">
      <th className="border border-gray-200 px-4 py-2 text-xl ">No</th>
      <th className="border border-gray-200 px-4 py-2 text-xl ">Title</th>
      <th className="border border-gray-200 px-4 py-2 text-xl">Content</th>
      <th className="border border-gray-200 px-4 py-2 text-xl">Delete</th>
      <th className="border border-gray-200 px-4 py-2 text-xl">Edit</th>
    </tr>
  </thead>
  <tbody>
  {postdata.map((data, i) => (
     <tr key={i} className="hover:bg-gray-50 font-serif text-lg">
     <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
     <td className="border border-gray-200 px-4 py-2">{data.title}</td>
     <td className="border border-gray-200 px-4 py-2">
       <button>{data.content}</button>
     </td>
     <td className="border border-gray-200 px-4 py-2 text-center">
       <button onClick={() => onDelete(data._id,['test'])} className="  hover:bg-opacity-30 transition duration-300 ease-in-out py-2 px-4 bg-red-500 text-white rounded">Delete</button>
     </td>
     <td className="border border-gray-200 px-4 py-2 text-center">
       <button className=" hover:bg-opacity-30 py-2 px-4 transition duration-300 ease-in-ou bg-blue-500 text-white rounded">Edit</button>
     </td>
   </tr>
  ))}
 
  </tbody>
</table>}

    </div>
  );
};

export default Managepost;
