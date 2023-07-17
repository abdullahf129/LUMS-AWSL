/*
  Warnings:

  - Added the required column `Image` to the `CATalogue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortDescription` to the `CATalogue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CATalogue` ADD COLUMN `Image` VARCHAR(191) NOT NULL,
    ADD COLUMN `ShortDescription` VARCHAR(191) NOT NULL;
