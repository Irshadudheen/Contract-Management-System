import {Server ,Socket} from 'socket.io';
import { Server as HttpServer } from "http";
import { BadRequestError } from './errors/bad-request-error';
import { SocketNotInitializedError } from './errors/socket-not-init-error';
let io:Server|null=null;

export const initializeSocket =(server:HttpServer):Server =>{
    io =new Server(server,{
        cors:{
            origin:'*',
            methods:['GET','POST','PUT']
        }
    })
    io.on("connection", (socket: Socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });

    return io;
}

export const getIO = (): Server => {
    if (!io) {
        throw new SocketNotInitializedError();
    }
    return io;
};