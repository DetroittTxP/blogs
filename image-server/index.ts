import express,{Application,Request,Response} from 'express';

const app:Application = express();
const port:Number = 2000;

app.get('/',(req:Request,res:Response) => {
    res.send('hello')
})

app.listen(port,() => {
     console.log('server run on ', port);
     
})