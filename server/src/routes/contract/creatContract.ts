import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { currentUser } from "../../middlewares/currentUser";

const router = Router();
router.post('/api/contract',[body('clientName').isString().notEmpty().withMessage('Client name is required'),
    body('description').notEmpty().withMessage('contractData is required')
],validateRequest,currentUser,
    async(req:Request,res:Response)=>{
    const {clientName,description,title,price}=req.body;
    console.log(req.headers.authorization)
    const contract = await prisma.contract.create({
        data:{
            price,clientName,contractTitle:title,contractData:description,userId:req.currentUser?.id as string
                        
    } })
    res.send(contract) 
})
export {router as createContractRouter}