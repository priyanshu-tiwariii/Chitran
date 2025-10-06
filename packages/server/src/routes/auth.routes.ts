import {Router} from 'express';
import {signupController,loginController} from '../controllers/uth.controllers.ts';


const authRouter:Router = Router();
authRouter.post('/signup',signupController);
authRouter.post('/login',loginController);
export default authRouter;