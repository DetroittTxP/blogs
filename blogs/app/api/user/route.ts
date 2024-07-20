import { ConnectDB } from "@/lib/ConnectDB";
import User from "@/models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(req:NextRequest){
     const url = new URL(req.url);
     const detail = url.searchParams.get('detail');
     const authorIds = url.searchParams.getAll('authorId');
 
     if (detail === 'per') {
         try{

          const users = await User.find({_id:authorIds}).select('username profilePicture');

          return NextResponse.json({ message: 'Success', users });
         }
         catch(err){
             console.log(err);
             return NextResponse.json({ message: 'Invalid detail parameter' }, { status: 400 });
         }
      
 
         
     } else {
         return NextResponse.json({ message: 'Invalid detail parameter' }, { status: 400 });
     }
}

export async function POST(req:NextRequest){
     
     const {username,password,email} = await req.json();
     
     try{
          await ConnectDB();
          const HashPassword = await bcrypt.hash(password,10);

          const result = await User.create({
               username,
               password:HashPassword,
               email
          });

          return NextResponse.json({
               status:'ok',
               result
          },{status:201})
     }
     catch(err){
          console.log(err);
          return NextResponse.json({status:'error',msg:"error registering"},{status:500});            
     }
     
}

