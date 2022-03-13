/*
  Warnings:

  - You are about to drop the column `end` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `StudyStep` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `StudyStep` table. All the data in the column will be lost.
  - Added the required column `idPassageSet` to the `Passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPassage` to the `Speed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen` to the `Speed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seconds` to the `Speed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wpm` to the `Speed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passage" ADD COLUMN     "idPassageSet" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Speed" ADD COLUMN     "idPassage" INTEGER NOT NULL,
ADD COLUMN     "screen" INTEGER NOT NULL,
ADD COLUMN     "seconds" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wpm" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StudyStep" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "training" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PassageSet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassageSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PassageSet_name_key" ON "PassageSet"("name");

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_idPassageSet_fkey" FOREIGN KEY ("idPassageSet") REFERENCES "PassageSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speed" ADD CONSTRAINT "Speed_idPassage_fkey" FOREIGN KEY ("idPassage") REFERENCES "Passage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
