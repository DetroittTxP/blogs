import { ConnectDB } from "@/lib/ConnectDB";
import Comments from "@/models/CommentsModel";
import { NextRequest,NextResponse } from "next/server";

export async function GET(){
      return NextResponse.json('ok')
}

export async function POST(req:NextRequest){
    const comment = await req.json();

    
}