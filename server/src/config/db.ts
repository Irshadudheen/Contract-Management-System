import { PrismaClient } from "@prisma/client";
import { DatabaseConnectionError } from "../errors/database-connetion-error";


const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to PostgreSQL");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new DatabaseConnectionError();
    }
};

export { prisma, connectDB };