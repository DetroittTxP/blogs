import { ConnectDB } from "@/lib/ConnectDB";
import User from "@/models/UserModel";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

type IdType = {
      params:{
         id:string
      }
}


export async function GET(req:NextRequest, {params}:IdType){
       const url = new URL(req.url);
        const detail = url.searchParams.get('details');

      //   if(!detail){
      //       return NextResponse.json({},{status:404});
      //   }
       
       let id = new mongoose.Types.ObjectId(params.id)
      console.log(id);
      
        switch(detail){
             case 'edit':
               await ConnectDB();
               let data = await User.findById(id).select('username email bio profilePicture');
               return NextResponse.json(data,{status:200});
             default:
               return NextResponse.json({},{status:404});  
        }
}

export async function PUT(req:NextRequest , {params}:IdType){

     const data = await req.json();
     const {id} = params;
     console.log(data);
     
  
     try{
        await ConnectDB();
        let update = await User.findByIdAndUpdate(id,data.newuserdata,{new:true});

        if(!update){
             return NextResponse.json({status:'error',msg:'no user found to update'},{status:404});

        }
        return NextResponse.json({status:"ok",newdata:update},{status:200});
     }
     catch(err){
         console.log(err);
         return NextResponse.json({status:'error'},{status:500});
         
     }
}