import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();
router.post('/api/contract',[body('clientName').isString().notEmpty().withMessage('Client name is required'),
    body('description').notEmpty().withMessage('contractData is required')
],validateRequest,
    async(req:Request,res:Response)=>{
    const {clientName,description,title}=req.body;
    console.log(req.headers.authorization)
    const contract = await prisma.contract.create({
        data:{
            clientName,contractTitle:title,contractData:description,userId:req.headers.authorization as string,
                        
    } })
    res.send(contract) 
})
export {router as createContractRouter}