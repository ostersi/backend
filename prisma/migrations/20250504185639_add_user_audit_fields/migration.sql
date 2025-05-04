/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdByUser" INTEGER,
ADD COLUMN     "deletedByUser" INTEGER,
ADD COLUMN     "updatedByUser" INTEGER;

-- DropTable
DROP TABLE "AuditLog";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deletedByUser_fkey" FOREIGN KEY ("deletedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
