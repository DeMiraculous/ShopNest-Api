-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_reset_time" TIMESTAMP,
ADD COLUMN     "reset_pin_verified" BOOLEAN NOT NULL DEFAULT false;
