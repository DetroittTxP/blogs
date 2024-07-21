import multer,{diskStorage,DiskStorageOptions,Multer,} from 'multer';
import  { Router,Request,Response } from 'express';
import { createDirectory } from '../util/HandleDir';
import path from 'path';
import fs from 'fs';
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




router.get('/:authorid/:imagename',(req:Request,res:Response) => {
    const {authorid,imagename} = req.params;

    const dir_ = path.dirname(__dirname);
    const filename = path.join(dir_,"image","postimage",authorid,imagename);
    if(!fs.existsSync(filename)){
       return res.json({status:'error',msg:'no file was found'}).status(404);
    }

    return res.sendFile(filename);
})




const uploadPostImage:Multer = multer({storage:postsImageStr});

router.post('/:id', uploadPostImage.array('images', 5), (req, res) => {
  const files = req.files as Express.Multer.File[];


  const filenames = files.map((file) => file.filename);
  

  return res.status(200).send({ filenames: filenames });
});


router.delete('/:id',(req:Request,res:Response) => {
   
        const {id} = req.params;
       const images:string[] = req.body.images

        const _dir = path.dirname(__dirname);
        const filedirectory = path.join(_dir,"image","postimage",id);
        let count = 0;
        fs.readdir(filedirectory,(err,files) => {
                if(err){
                  console.log(err);
                  return res.send('cannot deleete file', ).status(500);
                }

                files.forEach(file => {
                     let foundfile = images.find((f) => f === file);
                     
                     if(foundfile){
                         let deletingfile = path.join(filedirectory,foundfile);
                         fs.unlink(deletingfile,(err) => {
                          if (err) {
                            console.log(err);
                            return res.send('cannot deleete file', ).status(500);
                          } else {
                            count++;
                            console.log(deletingfile , " unuse file deleted");
                          }
                         })
                     }
                  
                     
                })
        })

        return res.send({status:` file has been deleted`});
    
})
