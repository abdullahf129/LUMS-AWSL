/*
  Warnings:

  - Added the required column `ApprovedAt` to the `AdoptionApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AdoptionApplications` ADD COLUMN `Approved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ApprovedAt` DATETIME(3) NOT NULL;
