import {type Request, type Response} from "express";
import {signupSchema, type SignupInput} from "common";
import prisma from '../../prisma/prisma.ts';
import bcrypt from 'bcrypt';
import z from "zod";
import { sendErrorResponse, sendSuccessResponse } from "../utils/apiResponse.ts";

export const signupController = async (req:Request,res:Response)=>{
    const validationResult = signupSchema.safeParse(req.body);
    if(!validationResult.success){
        return sendErrorResponse({
            res,
            statusCode: 400,
            message: "Invalid request data",
            error: validationResult.error.format()
        });
    }
    const {email,password,name} = validationResult.data as SignupInput;
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(existingUser){
            return sendErrorResponse({
                res,
                statusCode: 409,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword){
            return sendErrorResponse({
                res,
                statusCode: 500,
                message: "Error hashing password"
            });
        }

        const newUser = await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name
            }
        });
        return sendSuccessResponse({
            res,
            statusCode: 201,
            message: "User created successfully",
            data: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error checking existing user:", error);
        return sendErrorResponse({
            res,
            statusCode: 500,
            message: "Internal server error"
        });
    }
}


const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const loginController = async (req:Request,res:Response)=>{
    const validationResult = loginSchema.safeParse(req.body);
    if(!validationResult.success){
        return sendErrorResponse({
            res,
            statusCode: 400,
            message: "Invalid request data",
            error: validationResult.error.format()
        });
    }

    const {email,password} = validationResult.data;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }}
        )

        if(!user){
            return sendErrorResponse({
                res,
                statusCode:404,
                message: "User not found",
                error: "No user found with the provided email"
            })
        }
            
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return sendErrorResponse({
                res,
                statusCode:401,
                message: "Invalid credentials",
                error: "The provided password is incorrect"
            })
        }
    
        return sendSuccessResponse({
            res,
            statusCode:200,
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })
        
    } catch (error) {
        return sendErrorResponse({
            res,
            statusCode: 500,
            message: "Internal server error",
            error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
        })
    }
}