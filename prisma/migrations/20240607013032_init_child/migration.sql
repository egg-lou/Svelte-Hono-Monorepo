-- CreateTable
CREATE TABLE `ChildInformation` (
    `childId` INTEGER NOT NULL AUTO_INCREMENT,
    `childName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `birthPlace` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `birthHeight` DOUBLE NOT NULL,
    `birthWeight` DOUBLE NOT NULL,
    `sex` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`childId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaccine` (
    `vaccineName` VARCHAR(191) NOT NULL,
    `doseNumber` INTEGER NOT NULL,
    `recommendedAge` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vaccine_vaccineName_key`(`vaccineName`),
    PRIMARY KEY (`vaccineName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChildImmunization` (
    `vaccineDate` DATETIME(3) NOT NULL,
    `vaccineName` VARCHAR(191) NOT NULL,
    `childId` INTEGER NOT NULL,
    `nextVisitDate` DATETIME(3) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vaccineDate`, `vaccineName`, `childId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChildMedicalHistory` (
    `childDiagnosisId` INTEGER NOT NULL AUTO_INCREMENT,
    `diagnosisDate` DATETIME(3) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `childId` INTEGER NOT NULL,

    PRIMARY KEY (`childDiagnosisId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChildImmunization` ADD CONSTRAINT `ChildImmunization_vaccineName_fkey` FOREIGN KEY (`vaccineName`) REFERENCES `Vaccine`(`vaccineName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChildImmunization` ADD CONSTRAINT `ChildImmunization_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `ChildInformation`(`childId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChildMedicalHistory` ADD CONSTRAINT `ChildMedicalHistory_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `ChildInformation`(`childId`) ON DELETE RESTRICT ON UPDATE CASCADE;
