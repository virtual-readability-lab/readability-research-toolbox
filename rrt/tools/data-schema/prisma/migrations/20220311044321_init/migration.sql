/*
  Warnings:

  - Added the required column `end` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "design" JSONB NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Design_name_key" ON "Design"("name");
