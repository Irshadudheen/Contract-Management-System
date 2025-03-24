import 'dotenv/config'

import {faker} from '@faker-js/faker'

import {app} from './app'
import { connectDB, prisma } from './config/db'

function main(){
    Array.from({length:10}).map(async (_,i)=>{
        await prisma.user.create({
           data:{
                name:faker.company.name(),
                email:faker.internet.email(),
                password:faker.internet.password()
           }
        })
    })
}
// main()
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

        app.listen(port,()=>console.log('the server is running on 3000!!!'))
    }
}
start()