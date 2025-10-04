import {type Request, type Response} from "express";
import {signupSchema, type SignupInput} from "common";
import prisma from '../../prisma/prisma.ts';
import bcrypt from 'bcrypt';

export const signupController = async (req:Request,res:Response)=>{
    const validationResult = signupSchema.safeParse(req.body);
    if(!validationResult.success){
        return res.status(400).json({
            status:"error",
            message:"Invalid request data",
            error:validationResult.error.format()
        })
    }
    const {email,password,name} = validationResult.data as SignupInput;
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(existingUser){
            return res.status(409).json({
                status:"error",
                message:"User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword){
            return res.status(500).json({
                status:"error",
                message:"Error hashing password"
            });
        }

        const newUser = await prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        });
        return res.status(201).json({
            status:"success",
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email
            }
        })

    } catch (error) {
        console.error("Error checking existing user:", error);
        return res.status(500).json({
            status:"error",
            message:"Internal server error"
        });
    }   
}