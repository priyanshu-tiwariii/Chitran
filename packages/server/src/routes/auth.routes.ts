import {Router} from 'express';
import {signupController} from '../controllers/uth.controllers.ts';


const authRouter:Router = Router();
authRouter.post('/signup',signupController);
export default authRouter;