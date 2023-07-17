-- DropForeignKey
ALTER TABLE `Incidents` DROP FOREIGN KEY `Incidents_ResolvedById_fkey`;

-- AlterTable
ALTER TABLE `Incidents` MODIFY `ResolvedAt` DATETIME(3) NULL,
    MODIFY `ResolvedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Incidents` ADD CONSTRAINT `Incidents_ResolvedById_fkey` FOREIGN KEY (`ResolvedById`) REFERENCES `AWSLMembers`(`AWSLMemberId`) ON DELETE SET NULL ON UPDATE CASCADE;
