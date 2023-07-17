/*
  Warnings:

  - Added the required column `Name` to the `AWSLMembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AWSLMembers` ADD COLUMN `Name` VARCHAR(191) NOT NULL;
