import multer,{diskStorage,DiskStorageOptions,Multer,} from 'multer';
import  { Router,Request,Response } from 'express';
import { createDirectory } from '../util/HandleDir';

export const router:Router = Router();

const postsImageStr= diskStorage({
  destination:async (req,file,cb) => {
            const {id} = req.params;
            let dirName:string = await createDirectory(id,"postimage");

            cb(null,dirName)          
  } ,
  filename:(req,file,cb) => {
      const name = Date.now() + file.originalname;
      cb(null,name);
  }
})




router.get('/:imagename',(req:Request,res:Response) => {
    const {imagename} = req.params;

 

    return res.send('ok');
})




const uploadPostImage:Multer = multer({storage:postsImageStr});

router.post('/:id', uploadPostImage.array('images',5) , (req,res) => {
        return res.send('postimage uploaded').status(201);
})
