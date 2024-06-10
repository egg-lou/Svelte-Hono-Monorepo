/*
  Warnings:

  - The primary key for the `childimmunization` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `childimmunization` DROP PRIMARY KEY,
    MODIFY `vaccineDate` VARCHAR(191) NOT NULL,
    MODIFY `nextVisitDate` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`vaccineDate`, `vaccineName`, `childId`);
