import { Request, Response, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { param } from "express-validator";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/currentUser";

const router = Router();
router.get('/api/contract/:id',currentUser,[param('id').notEmpty().withMessage('Contract id required')],validateRequest,

async (req:Request,res:Response)=>{
    const {id}=req.params;
    const userId = req.headers.authorization as string;
    const contract = await prisma.contract.findUnique({
        where:{id}
    })
    if(!contract){
        throw new BadRequestError('not found contract')
    }
    res.status(200).json({contract});

})
export {router as getContractRouter}