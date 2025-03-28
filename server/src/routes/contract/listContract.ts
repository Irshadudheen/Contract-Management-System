import { Request, Response, Router } from "express";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/currentUser";

const router = Router();
router.get('/api/contract',currentUser,async (req:Request,res:Response)=>{
  
    const {id}=req.currentUser as {id:string}
        console.log('the user id is ',id)
    const userId=id
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
      userId,OR:[{clientName:{contains:search,mode:'insensitive'}},{contractTitle:{contains:search,mode:'insensitive'}}]
    },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  totalContracts = await prisma.contract.count({
    where: { userId ,OR:[{clientName:{contains:search,mode:'insensitive'}},{contractTitle:{contains:search,mode:'insensitive'}}]},
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