import { ConnectDB } from "@/lib/ConnectDB";
import Comments from "@/models/CommentsModel";
import { NextRequest,NextResponse } from "next/server";




export async function GET(req:NextRequest){
      const url = new URL(req.url)
      const queryAuthorId = url.searchParams.get('queryAuthorId');

      if(queryAuthorId){
           try{

            let commentsWithAuthorId = await Comments.find({authorId:queryAuthorId});

            return NextResponse.json(commentsWithAuthorId);

           }
           catch(err){
              return NextResponse.json('error query byid' , {status:500});
           }
      }

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

export async function DELETE(req:NextRequest){
   const url = new URL(req.url) 
   const commentid = url.searchParams.get('deleteId');

   if(commentid){
        let deleted = await Comments.findByIdAndDelete(commentid);
        if(deleted){
             console.log('deleted');
             
            return NextResponse.json({status:'ok',msg:'deleted'},{status:200});

        }
   }
   else{
      return NextResponse.json({status:'err',msg:'id not found'},{status:404});
   }
}