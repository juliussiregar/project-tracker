/*
  Warnings:

  - You are about to alter the column `status` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `progress` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Project` MODIFY `status` ENUM('DRAFT', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'DRAFT',
    MODIFY `progress` DOUBLE NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'DRAFT',
    `weight` INTEGER NOT NULL DEFAULT 1,
    `projectId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
