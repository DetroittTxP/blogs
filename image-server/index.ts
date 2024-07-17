import express,{Application,Request,Response} from 'express';
import cors from 'cors';
const app:Application = express();
const port:Number = 2000;

import { router as UserImageRouter } from './router/userRoute';
import {router as PostImageRouter} from './router/postRoute';
import { RemoveUnuseImage } from './util/RemoveImage';

app.use(cors());


app.use('/user', UserImageRouter);
app.use('/post', PostImageRouter);

app.get('/',(req:Request,res:Response) => {
    res.send('hello')
})


app.get('/remove', async (req,res) => {
      await  RemoveUnuseImage("555555.jpg","669563b418e6a8fe47ad0d2e","user");
      return res.send('ok');
})

app.listen(port,() => {
     console.log('server run on ', port);
     
})