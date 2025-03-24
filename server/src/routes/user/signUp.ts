import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { prisma } from "../../config/db";
import { EmailInUseError } from "../../errors/email-in-use-error";
import { Password } from "../../service/password";

const router =Router()
router.post('/api/users/signup',[
    body('name').isString().notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
],validateRequest,async(req:Request,res:Response)=>{
    console.log('enter into signup')
    const {name,email,password}=req.body
   
    const existingUser=await prisma.user.findUnique({where:{email}})
    if(existingUser){
        throw new EmailInUseError()
    }
    const hashPassword=await Password.toHash(password)
    const user=await  prisma.user.create({data:{
        name,
        email,
        password:hashPassword
    }})
    res.send(user)
})
export {router as singupRouter}