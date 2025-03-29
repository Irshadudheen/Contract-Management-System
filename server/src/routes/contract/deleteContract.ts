import { Request, Response, Router } from "express";
import { currentUser } from "../../middlewares/currentUser";
import { prisma } from "../../config/db";

const router = Router();
 router.delete('/api/contract/:id',currentUser,async (req:Request,res:Response)=>{
    const {id}=req.params;
    await prisma.contract.delete({where:{id}})
    res.status(200).send({message:'Contract deleted successfully'})
 })
 export {router as deleteContractRouter}