/*
  Warnings:

  - Added the required column `prescriberName` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DOCTOR';

-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "prescriberName" TEXT NOT NULL;
