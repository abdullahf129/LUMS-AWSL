-- DropForeignKey
ALTER TABLE `AdoptionApplications` DROP FOREIGN KEY `AdoptionApplications_AdoptionProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `AdoptionPictures` DROP FOREIGN KEY `AdoptionPictures_AdoptionProfileId_fkey`;

-- AddForeignKey
ALTER TABLE `AdoptionApplications` ADD CONSTRAINT `AdoptionApplications_AdoptionProfileId_fkey` FOREIGN KEY (`AdoptionProfileId`) REFERENCES `AdoptionProfiles`(`AdoptionProfileId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionPictures` ADD CONSTRAINT `AdoptionPictures_AdoptionProfileId_fkey` FOREIGN KEY (`AdoptionProfileId`) REFERENCES `AdoptionProfiles`(`AdoptionProfileId`) ON DELETE CASCADE ON UPDATE CASCADE;
