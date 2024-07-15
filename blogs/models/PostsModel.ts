import mongoose, { Schema } from "mongoose";

const PostSchema:Schema = new Schema({
      authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
      },
      title:{type:String,required:true},
      content:{type:String,required:true},
      images:{
        type:[String]
      }
},{timestamps:true})


const modelname = process.env.DB_POSTS || 'posts';

const Post = mongoose.models.posts || mongoose.model(modelname,PostSchema);

export default Post;