import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/currentUser";

const router = Router()
router.put('/api/contract/:id',currentUser,async(req:Request,res:Response)=>{
    console.log('the request body is ',req.body)
const {id}=req.params;
const {contractTitle,clientName,contractData}=req.body;
const updatedContract = await prisma.contract.update({
    where:{id},
    data:{
        contractTitle,clientName,contractData
    }
})
if(!updatedContract){
    throw new BadRequestError('Contract not found')
}
res.status(200).send({message:'Contract updated successfully',contract:updatedContract})
})
export {router as updateContractDetailRouter}