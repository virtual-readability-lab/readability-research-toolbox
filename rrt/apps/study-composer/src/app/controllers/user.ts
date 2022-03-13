import { Request, Response, NextFunction } from 'express';
import { db } from '../database' 

async function createUser() {
    const { rows } = await db.query(`INSERT INTO "User" VALUES (DEFAULT, DEFAULT);`);
    return rows[0];
};

/* Middleware to assign a user a unique id */
export async function checkSessionUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
        req.session.user = {
            idUser: await createUser()
        };
    } 
    next();
}

export async function getIdUser(req: Request, res: Response) {
    res.send(req.session.user.idUser);
}