import { ConnectDB } from "@/lib/ConnectDB";
import Post from "@/models/PostsModel";
import { NextRequest,NextResponse } from "next/server";


export async function GET() {

        try{
            await  ConnectDB();

            let allpost = await Post.find({});
        
            return NextResponse.json(allpost,{status:200});
        }
        catch(err){
          return NextResponse.json({status:'error',msg:"Cannt fetch posts"},{status:500});
        }         
}


export async function POST(req:NextRequest,){
      const {postdata} = await req.json();

      try{
           await ConnectDB();

           let createpost = await Post.create(postdata);

           return NextResponse.json({status:'ok',newpost:createpost},{status:201});
      }
      catch(err){
        console.log(err);
        
        return  NextResponse.json({status:'error', err},{status:500});
      }

}



