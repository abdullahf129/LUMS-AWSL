/*
  Warnings:

  - Added the required column `Email` to the `Incidents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Incidents` ADD COLUMN `Email` VARCHAR(191) NOT NULL;
