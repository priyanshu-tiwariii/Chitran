import {type Request,type Response} from 'express';
import prisma from '../../prisma/prisma.ts';



export const serverHealthCheckController = (req:Request,res:Response)=>{
    res.status(200).json({
        status:"success",
        message:"Server is healthy"
    })
}

export const databaseHealthCheckController = async (req:Request,res:Response)=>{
    try {
        const result = await prisma.$queryRaw`SELECT NOW()`;
        res.status(200).json({
            status:"success",
            message:"Database is healthy",
            result
        })
    }
    catch (error) {
        res.status(500).json({
            status:"error",
            message:"Database is not healthy",  
            error
        })
    }
}