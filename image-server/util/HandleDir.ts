import fs from 'fs';
import path from 'path'


export const createDirectory=async(dirname : string ,dirtype: string) : Promise<string> =>{
    let dir = path.dirname(__dirname);
    let dir_name =path.join(dir,"image",dirtype,dirname);


    if(!fs.existsSync(dir_name))
    {
        fs.mkdirSync(dir_name,{recursive:true});
        return dir_name;
    }
    return dir_name;
}