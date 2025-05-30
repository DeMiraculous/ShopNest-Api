/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "login_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verification_attempts" INTEGER,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
