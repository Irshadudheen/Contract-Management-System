import { BadRequestError } from "../errors/bad-request-error";
import { userData } from "../interface/userInterface";
import jwt from 'jsonwebtoken';
export const createToken =(userData:userData)=>{
    const token =  jwt.sign(userData,process.env.JWT_KEY!,{
        expiresIn: '1h'}) 
        return token
}
export const verifyToken = (token:string)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY!) as userData;
        return decoded
    } catch (error) {
        throw new BadRequestError('token expired')
    }
}
