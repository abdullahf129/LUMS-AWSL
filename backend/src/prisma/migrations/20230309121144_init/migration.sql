-- CreateTable
CREATE TABLE `AWSLMembers` (
    `AWSLMemberId` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DepartmentId` INTEGER NOT NULL,

    UNIQUE INDEX `AWSLMembers_Email_key`(`Email`),
    PRIMARY KEY (`AWSLMemberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AWSLAdmins` (
    `AWSLAdminId` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AWSLAdmins_Email_key`(`Email`),
    PRIMARY KEY (`AWSLAdminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incidents` (
    `IncidentId` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `LocationDescription` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `ResolvedAt` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `LocationId` INTEGER NOT NULL,
    `ResolvedById` INTEGER NOT NULL,

    PRIMARY KEY (`IncidentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctors` (
    `DoctorId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Contact` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`DoctorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdoptionProfiles` (
    `AdoptionProfileId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Age` INTEGER NOT NULL,
    `Location` VARCHAR(191) NOT NULL,
    `ShortDescription` VARCHAR(191) NOT NULL,
    `LongDescription` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`AdoptionProfileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdoptionApplications` (
    `AdoptionApplicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Contact` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `AdoptionProfileId` INTEGER NOT NULL,

    PRIMARY KEY (`AdoptionApplicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdoptionPictures` (
    `AdoptionPictureId` INTEGER NOT NULL AUTO_INCREMENT,
    `PhotoName` VARCHAR(191) NOT NULL,
    `AdoptionProfileId` INTEGER NOT NULL,

    PRIMARY KEY (`AdoptionPictureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CATalogue` (
    `CATalogueId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Sex` VARCHAR(191) NOT NULL,
    `Age` INTEGER NOT NULL,
    `LongDescription` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`CATalogueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `DepartmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`DepartmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `LocationId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`LocationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AWSLMembers` ADD CONSTRAINT `AWSLMembers_DepartmentId_fkey` FOREIGN KEY (`DepartmentId`) REFERENCES `Departments`(`DepartmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidents` ADD CONSTRAINT `Incidents_LocationId_fkey` FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`LocationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidents` ADD CONSTRAINT `Incidents_ResolvedById_fkey` FOREIGN KEY (`ResolvedById`) REFERENCES `AWSLMembers`(`AWSLMemberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionApplications` ADD CONSTRAINT `AdoptionApplications_AdoptionProfileId_fkey` FOREIGN KEY (`AdoptionProfileId`) REFERENCES `AdoptionProfiles`(`AdoptionProfileId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionPictures` ADD CONSTRAINT `AdoptionPictures_AdoptionProfileId_fkey` FOREIGN KEY (`AdoptionProfileId`) REFERENCES `AdoptionProfiles`(`AdoptionProfileId`) ON DELETE RESTRICT ON UPDATE CASCADE;
