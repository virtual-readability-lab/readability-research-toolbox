/*
  Warnings:

  - You are about to drop the column `created` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[design]` on the table `Design` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "idUser" INTEGER NOT NULL,
ALTER COLUMN "start" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "StudyStep" (
    "id" SERIAL NOT NULL,
    "idStudy" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencePairwiseComparison" (
    "id" SERIAL NOT NULL,
    "idStudyStep" INTEGER NOT NULL,
    "idA" INTEGER NOT NULL,
    "idB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreferencePairwiseComparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speed" (
    "id" SERIAL NOT NULL,
    "idStudyStep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Speed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comprehension" (
    "id" SERIAL NOT NULL,
    "idStudyStep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comprehension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "idStudyStep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passage_name_key" ON "Passage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Design_design_key" ON "Design"("design");

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyStep" ADD CONSTRAINT "StudyStep_idStudy_fkey" FOREIGN KEY ("idStudy") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencePairwiseComparison" ADD CONSTRAINT "PreferencePairwiseComparison_idStudyStep_fkey" FOREIGN KEY ("idStudyStep") REFERENCES "StudyStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencePairwiseComparison" ADD CONSTRAINT "PreferencePairwiseComparison_idA_fkey" FOREIGN KEY ("idA") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencePairwiseComparison" ADD CONSTRAINT "PreferencePairwiseComparison_idB_fkey" FOREIGN KEY ("idB") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speed" ADD CONSTRAINT "Speed_idStudyStep_fkey" FOREIGN KEY ("idStudyStep") REFERENCES "StudyStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprehension" ADD CONSTRAINT "Comprehension_idStudyStep_fkey" FOREIGN KEY ("idStudyStep") REFERENCES "StudyStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_idStudyStep_fkey" FOREIGN KEY ("idStudyStep") REFERENCES "StudyStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
