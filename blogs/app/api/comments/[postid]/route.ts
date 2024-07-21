import { ConnectDB } from "@/lib/ConnectDB";
import Comments from "@/models/CommentsModel";
import User from "@/models/UserModel";
import { NextRequest,NextResponse } from "next/server";

interface UserlistType{
     _id:string,
     username:string,
     profilePicture:string
}

export async function GET(req:NextRequest,{params}:{params:{postid:string}}){
    const {postid} = params;
    try{
        let reviewslist = await Comments.find({postId:postid});
        let Userlist = await User.find({_id:reviewslist.map(d => d.authorId)}).select('username profilePicture');

        const allreviewdata = reviewslist.map((review) => {
               let finduser = Userlist.find((d) => d._id.toString() === review.authorId.toString());
       
               return {
                  ...review.toObject(),
                  authorId:finduser
               }

        })
        
        return NextResponse.json(allreviewdata,{status:200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json('not ok',{status:500});
    }

}