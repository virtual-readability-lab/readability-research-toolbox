/*
  Warnings:

  - The primary key for the `UserSessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expiresAt` on the `UserSessions` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserSessions` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `UserSessions` table. All the data in the column will be lost.
  - Added the required column `expires` to the `UserSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `UserSessions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `data` on the `UserSessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "UserSessions_sid_key";

-- AlterTable
ALTER TABLE "UserSessions" DROP CONSTRAINT "UserSessions_pkey",
DROP COLUMN "expiresAt",
DROP COLUMN "id",
DROP COLUMN "sid",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL,
DROP COLUMN "data",
ADD COLUMN     "data" JSONB NOT NULL,
ADD CONSTRAINT "UserSessions_pkey" PRIMARY KEY ("session_id");
