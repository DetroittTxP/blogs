import { ConnectDB } from "@/lib/ConnectDB";
import Post from "@/models/PostsModel";
import User from "@/models/UserModel";

import axios from "axios";
import { NextRequest,NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{authorId:string}}){
        const {authorId} = params;
        const url = new URL(req.url);
        const details = url.searchParams.get('details');


        try{
            await ConnectDB();
              let posts;
              if(details === 'postdetailuser'){
                   
                   posts = await Post.findById(authorId).select('title content images authorId createdAt');
                   let user = await User.findById(posts.authorId).select('username profilePicture');
                
                  
                  
                   posts = {
                       ...posts.toObject(),
                       authorId:user
                   }
                   return NextResponse.json(posts);
  
              }
              else{
                   posts = await Post.find({authorId:authorId}).select('title content images');
                   return NextResponse.json(posts);
              }
            

             
        }
        catch(err){
            console.log(err , "AT GET POST BY ID");
            return NextResponse.json({status:'error',msg:err}, {status:500});
        }

}

export async function DELETE(req:NextRequest,{params}:{params:{authorId:string}}){
    console.log('Delete ID : ',params.authorId);

    try{
          await ConnectDB();

          const del = await Post.findByIdAndDelete(params.authorId);

          if(!del){
            return NextResponse.json({ status: 'error', msg: 'Post not found' }, { status: 404 });
          }

           let i = await axios.delete(`${process.env.NEXT_PUBLIC_IMAGEHOST}/post/${del.authorId}`,{data:{images:del.images}})
          console.log(i);
          
          return NextResponse.json({status:'ok',delete:del},{status:200});
    }
    catch(err){
          console.log(err);
          return NextResponse.json({status:'error',msg:err}, {status:500});
    }
           
    
}