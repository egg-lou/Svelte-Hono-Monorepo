-- AlterTable
ALTER TABLE `childimmunization` MODIFY `vaccineDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `childmedicalhistory` MODIFY `diagnosisDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
