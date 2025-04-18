import express,{json} from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

import { errorhandler } from './middlewares/error-handler'

import cors from 'cors'
import { NotFoundError } from './errors/not-found-error'
import { singupRouter } from './routes/user/signUp'
import { signInRouter } from './routes/user/signIn'
import { signOutRouter } from './routes/user/signOut'
import { createContractRouter } from './routes/contract/creatContract'
import { updateContractRouter } from './routes/contract/updateContract'
import { listContractRouter } from './routes/contract/listContract'
import { getContractRouter } from './routes/contract/getContract'
import { updateContractDetailRouter } from './routes/contract/updateContractDetail'
import { deleteContractRouter } from './routes/contract/deleteContract'
const app = express()

app.set('trust proxy',true)
app.use(json())

app.use(cookieParser())
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://contract-management-system-fawn.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
    origin:(origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },credentials:true }))
   
// app.use(currentUserRouter)
app.use(updateContractRouter)
app.use(deleteContractRouter)
app.use(createContractRouter)
app.use(signOutRouter)
app.use(singupRouter)
app.use(signInRouter)
app.use(listContractRouter)
app.use(getContractRouter)
app.use(updateContractDetailRouter)
app.all('*',async()=>{
    throw new NotFoundError();
})
app.use(errorhandler as express.ErrorRequestHandler)
export {app}