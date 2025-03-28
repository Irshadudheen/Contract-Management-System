import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../service/password";
import { userData } from "../../interface/userInterface";
import { createToken } from "../../service/jwt";

const router = Router();
router.post('/api/users/signin',[
    body('email').isEmail().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
],validateRequest,async (req:Request,res:Response)=>{
    const {email,password}=req.body;
    const existingUser=await prisma.user.findUnique({where:{email}}) as userData
    if(!existingUser){
        throw new BadRequestError('Email not found')
    }
   const comparePassword=await Password.compare(existingUser.password,password)
   if(!comparePassword){
       throw new BadRequestError('Invalid password')
   }
   const token = createToken(existingUser);
    
   res.status(200).cookie('login',existingUser).send({user:existingUser,token})
})
export {router as signInRouter}