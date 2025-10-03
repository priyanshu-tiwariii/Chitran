import express, {type Express} from 'express';
import cors from 'cors';
import router from './routes/index.routes.ts';
const app:Express = express();
const port:number = 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use("/api",router); 
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})