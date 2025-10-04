import {z} from 'zod';

export const signupSchema =  z.object({
    email:z.string().email({
        message : "Invalid email address"
    }),
    password : z.string().min(8,{message:"Password must be atleats 8 character"}),
    name : z.string().min(1,{message:"Name is required"}).max(100,{message:"Name is too long"})
})

export type  SignupInput = z.infer<typeof signupSchema>;