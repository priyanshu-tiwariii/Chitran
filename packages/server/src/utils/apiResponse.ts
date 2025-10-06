import { type Response } from 'express';

interface SuccessResponse<T> {
    res: Response;
    statusCode?: number;
    message: string;
    data?: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface ErrorResponse {
    res: Response;
    statusCode?: number; 
    message: string;
    error?: any; 
    code?: string; 
}

export function sendSuccessResponse<T>({
    res,
    statusCode=200 ,
    message,
    data,
    pagination
}: SuccessResponse<T>) {
    const response: any = {
        status: 'success',
        statusCode,
        message,
        timestamp: new Date().toISOString()
    };

    if (data !== undefined) {
        response.data = data;
    }

    if (pagination) {
        response.pagination = pagination;
    }

    return res.status(statusCode).json(response);
}

export function sendErrorResponse({
    res,
    statusCode=500,
    message,
    error,
    code
}: ErrorResponse) {
    const response: any = {
        status: 'error',
        statusCode,
        message,
        timestamp: new Date().toISOString()
    };

    if (error) {
        response.error = error;
    }

    if (code) {
        response.code = code;
    }

    return res.status(statusCode).json(response);
}
