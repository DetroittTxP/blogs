import mongoose, { Schema } from "mongoose";

const commentSchema:Schema = new Schema({
     postId:{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true},
     authorId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
     content:{type:String,required:true},
     commentDate:{type:Date,default:Date.now}
})

const modelname:string = process.env.DB_COMMENTS || 'comments';



const Comments = mongoose.models.comments || mongoose.model(modelname,commentSchema);

export default Comments;