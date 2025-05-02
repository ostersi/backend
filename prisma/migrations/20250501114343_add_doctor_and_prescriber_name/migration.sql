/*
  Warnings:

  - The values [DOCTOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `prescriberName` on the `Prescription` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'PHARMACIST', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "prescriberName";
