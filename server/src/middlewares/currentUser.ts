import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userData } from "../interface/userInterface";
import { verifyToken } from "../service/jwt";
import { NotAuthorizedError } from "../errors/not-authorized-error";

declare global {
    namespace Express{
        interface Request{
            currentUser?:userData;
        }
    }
}
export const currentUser = (req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers?.authorization){
      throw new NotAuthorizedError()
    }
    try {
        const payload = verifyToken(req.headers.authorization) ;
        req.currentUser = payload;
        console.log(payload,'the payload')
        console.log(req.currentUser,'the user')
    } catch (error) {

    console.log(error)
    throw new NotAuthorizedError()
    }
    next()
}