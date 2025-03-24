import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { prisma } from "../../config/db";
import { EmailInUseError } from "../../errors/email-in-use-error";

const router =Router()
router.post('/api/users/signup',[
    body('name').isString().notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
],validateRequest,async(req:Request,res:Response)=>{
    console.log('enter into signup')
    const existingUser=await prisma.user.findUnique({where:{email:req.body.email}})
    if(existingUser){
        throw new EmailInUseError()
    }
  const user=await  prisma.user.create({data:{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }})
    res.send(user)
})
export {router as singupRouter}