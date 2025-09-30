import express, {type Express} from 'express';

const app:Express = express();
const port:number = 3000;
import router from './routes/index.routes.ts';
app.use("/api",router); 
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})