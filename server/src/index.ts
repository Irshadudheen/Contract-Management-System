import 'dotenv/config'
import { connectDB  } from './config/db'
import { createServer } from "http";
import { initializeSocket } from "./socket";
console.log(process.env.NODE_ENV)
import {app} from './app'


const server = createServer(app);
initializeSocket(server);

const port = 3000

const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt key not found')
    }
 
    try {

        connectDB()
    } catch (error) {
        console.error(error)
    }finally{

        server.listen(port,()=>console.log('the server is running on 3000!!!'))
    }
}
start()