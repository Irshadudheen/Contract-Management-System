import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();
router.post('/api/contract',[body('clientName').isString().notEmpty().withMessage('clientName is required'),
    body('contractData').notEmpty().withMessage('contractData is required')
],validateRequest,
    async(req:Request,res:Response)=>{
    const {clientName,contractData}=req.body;
    const contract = await prisma.contract.create({
        data:{
            clientName,contractData,userId:req.body.id

    } })
    res.send(contract)
})
export {router as createContractRouter}