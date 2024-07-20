import { ConnectDB } from "@/lib/ConnectDB";
import Post from "@/models/PostsModel";
import { NextRequest,NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{authorId:string}}){
        const {authorId} = params;

        try{
            await ConnectDB();
              const posts = await Post.find({authorId:authorId}).select('title content images');

              return NextResponse.json(posts);
        }
        catch(err){
            console.log(err , "AT GET POST BY ID");
            return NextResponse.json({status:'error',msg:err}, {status:500});
        }

}