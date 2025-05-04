-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "createdByUser" INTEGER,
ADD COLUMN     "deletedByUser" INTEGER,
ADD COLUMN     "updatedByUser" INTEGER;

-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "createdByUser" INTEGER,
ADD COLUMN     "deletedByUser" INTEGER,
ADD COLUMN     "updatedByUser" INTEGER;

-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "createdByUser" INTEGER,
ADD COLUMN     "deletedByUser" INTEGER,
ADD COLUMN     "updatedByUser" INTEGER;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "createdByUser" INTEGER,
ADD COLUMN     "deletedByUser" INTEGER,
ADD COLUMN     "updatedByUser" INTEGER;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_deletedByUser_fkey" FOREIGN KEY ("deletedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_deletedByUser_fkey" FOREIGN KEY ("deletedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_deletedByUser_fkey" FOREIGN KEY ("deletedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_deletedByUser_fkey" FOREIGN KEY ("deletedByUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
