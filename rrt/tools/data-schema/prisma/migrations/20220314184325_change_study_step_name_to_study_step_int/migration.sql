/*
  Warnings:

  - You are about to drop the column `name` on the `StudyStep` table. All the data in the column will be lost.
  - Added the required column `studyStep` to the `StudyStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudyStep" DROP COLUMN "name",
ADD COLUMN     "studyStep" INTEGER NOT NULL;
