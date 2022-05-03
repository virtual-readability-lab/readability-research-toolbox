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

export async function postStudyEndedAt(idStudy: number) {
    prisma.study.update({
        where: { id: idStudy },
        data: { endedAt: 'CURRENT_TIMESTAMP' },
    })
}

export async function postNewStudyStep(idStudy: number, currentStudyStep: number, training = false) {
    const result = await prisma.studyStep.create({
        data: {
            idStudy: idStudy,
            studyStep: currentStudyStep,
            training: training
        }
    })
    return result.id;
}


export async function postStudyStepEndedAt(idStudyStep: number) {
    prisma.studyStep.update({
        where: { id: idStudyStep },
        data: { endedAt: 'CURRENT_TIMESTAMP' },
    })
}