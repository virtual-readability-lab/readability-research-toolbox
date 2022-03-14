import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function createUser() {
    //const { rows } = await db.query(`INSERT INTO "User" VALUES (DEFAULT, DEFAULT);`);
    const result = await prisma.user.create({data:{}}) 
    return result.id;
};

/* Middleware to assign a user a unique id */
export async function checkSessionUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session.idUser) {
        req.session.idUser = await createUser();
    }
    next();
}

export async function getIdUser(req: Request, res: Response) {
    res.send(req.session.idUser);
}