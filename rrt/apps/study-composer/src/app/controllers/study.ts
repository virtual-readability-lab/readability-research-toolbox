import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function postNewStudy(idUser: number, studyName: string) {
    const result = await prisma.study.create({
        data: {
            idUser: idUser,
            name: studyName
        }
    })
    return result.id;
}