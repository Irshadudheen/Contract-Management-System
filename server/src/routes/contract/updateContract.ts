import { Router } from "express";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";
import { getIO } from "../../socket";

const router =Router();
router.patch('/api/contract',async(req,res)=>{
    const {status,contractId}=req.body;
    const updatedContract = await prisma.contract.update({
        where:{id:contractId},
        data:{status}
    })
    if(!updatedContract){
        throw new BadRequestError('Contract not found')
    }
    await prisma.contractUpdate.create({
        data: {
            contractId,
            status,
        },
    });
    getIO().emit("contractUpdated", updatedContract);
    res.status(200).send({message:'Contract updated successfully',contract:updatedContract})
})
export {router as updateContractRouter}