import { Router } from "express";

const router = Router()
router.post('/api/users/signout',(req,res)=>{
    
    res.clearCookie('login').send({message:'logout successfully'})
})
export {router as signOutRouter}