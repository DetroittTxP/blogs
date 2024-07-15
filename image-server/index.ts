import express,{Application,Request,Response} from 'express';

const app:Application = express();
const port:Number = 2000;

import { router as UserImageRouter } from './router/userRoute';
import {router as PostImageRouter} from './router/postRoute';

app.use('/user', UserImageRouter);
app.use('/post', PostImageRouter);

app.get('/',(req:Request,res:Response) => {
    res.send('hello')
})

app.listen(port,() => {
     console.log('server run on ', port);
     
})