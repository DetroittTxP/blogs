import mongoose, { Schema } from "mongoose";

const UserSchema:Schema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    } ,
    password:{
        type:String,
        required:true,
    } ,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePicture:{
        type:String,
        default:'temp.png'
    },
    bio:String,

},{timestamps:true})

const modelname = process.env.DB_USER || 'users';

const User = mongoose.models.users || mongoose.model(modelname,UserSchema);

export default User;
