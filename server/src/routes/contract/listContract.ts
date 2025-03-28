import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";

const router = Router();
router.get('/api/contract',async (req:Request,res:Response)=>{
    const userId = req.headers.authorization as string;
        if (!userId) {
           throw new BadRequestError('User ID is required');
        }

        // Pagination parameters
        const page = parseInt(req.query.currentPage as string) || 1;
        const limit = parseInt(req.query.limit as string) || 8;
        const skip = (page - 1) * limit;
       const search = req.query.search as string;
       console.log(search,'the search term ')
let contracts
let totalContracts
if(search){

   contracts = await prisma.contract.findMany({
    where: {
      userId,OR:[{clientName:{contains:search}},{contractTitle:{contains:search}}]
    },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  totalContracts = await prisma.contract.count({
    where: { userId ,OR:[{clientName:{contains:search}},{contractTitle:{contains:search}}]},
});
}else{
    contracts = await prisma.contract.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
    });
    totalContracts = await prisma.contract.count({
        where: { userId },
    });
}

       
        res.status(200).json({
            success: true,
            contracts,
            totalContracts,
            totalPages: Math.ceil(totalContracts / limit),
            currentPage: page
        });
})
export {router as listContractRouter}