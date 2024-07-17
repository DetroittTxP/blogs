import multer,{diskStorage,DiskStorageOptions,Multer,} from 'multer';
import  { Router,Request,Response } from 'express';
import { createDirectory } from '../util/HandleDir';
import path from 'path';
import fs from 'fs';
export const router:Router = Router();

const userImageStr= diskStorage({
  destination:async (req,file,cb) => {
            const {id} = req.params;
            let dirName:string = await createDirectory(id,"profileimage");

            cb(null,dirName)          
  } ,
  filename:(req,file,cb) => {
      const name = Date.now() + file.originalname;
      cb(null,name);
  }
})

const uploadUserImage:Multer = multer({storage:userImageStr});


router.get('/:userid/:imagename',(req:Request,res:Response) => {

  const {imagename,userid} = req.params;

  const dir = path.dirname(__dirname);
  const filename = path.join(dir,"image","profileimage",userid,imagename);


  if(!fs.existsSync(filename)){
    return res.send({msg:'no image found'}).status(404);
  }

    return res.status(200).sendFile(filename)
})






router.post('/:id',uploadUserImage.single('image'),(req:Request,res:Response) => {
     return res.send({filename:req.file?.filename}).status(200);
})

