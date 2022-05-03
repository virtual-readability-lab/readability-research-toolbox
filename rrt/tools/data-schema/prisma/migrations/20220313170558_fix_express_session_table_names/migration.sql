/*
  Warnings:

  - The primary key for the `UserSessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `UserSessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `UserSessions` table. All the data in the column will be lost.
  - Added the required column `sess` to the `UserSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sid` to the `UserSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSessions" DROP CONSTRAINT "UserSessions_pkey",
DROP COLUMN "data",
DROP COLUMN "session_id",
ADD COLUMN     "sess" JSONB NOT NULL,
ADD COLUMN     "sid" TEXT NOT NULL,
ADD CONSTRAINT "UserSessions_pkey" PRIMARY KEY ("sid");
