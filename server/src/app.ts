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
const app = express()

app.set('trust proxy',true)
app.use(json())

app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',credentials:true }))
// app.use(currentUserRouter)
app.use(updateContractRouter)

app.use(createContractRouter)
app.use(signOutRouter)
app.use(singupRouter)
app.use(signInRouter)
app.all('*',async()=>{
    throw new NotFoundError();
})
app.use(errorhandler as express.ErrorRequestHandler)
export {app}