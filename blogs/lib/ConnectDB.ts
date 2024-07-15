import mongoose from 'mongoose';


export const ConnectDB = async () => {
    const DB_URL = process.env.CONNECT_DB as string;

    if(!DB_URL){
        throw new Error("no conn str");
    }
    
    try{
        await mongoose.connect(DB_URL);
        return console.log("Database Connected");
    }
    catch(err){
         return console.log("errorConnectingDatabase" , err);
         
    }
}