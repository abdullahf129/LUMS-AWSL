-- AlterTable
ALTER TABLE `AdoptionApplications` MODIFY `Approved` BOOLEAN NULL DEFAULT false,
    MODIFY `ApprovedAt` DATETIME(3) NULL;
