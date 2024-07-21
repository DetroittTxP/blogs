import { ConnectDB } from "@/lib/ConnectDB";
import Comments from "@/models/CommentsModel";
import { NextRequest,NextResponse } from "next/server";




export async function GET(){
      return NextResponse.json('ok')
}












export async function POST(req:NextRequest){
    const {reviewdata} = await req.json();

     try{
        
        let insert = await Comments.create(reviewdata);
        if(insert){
            return NextResponse.json({status:'ok',comment:insert},{status:201});
        }
      
     }
     catch(err){
        console.log(err);
        return NextResponse.json({status:'error',err},{status:500});
     }


    
}