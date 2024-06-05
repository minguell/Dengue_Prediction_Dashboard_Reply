-- CreateTable
CREATE TABLE `district` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `realCase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `latitude` INTEGER NULL,
    `longitude` INTEGER NULL,
    `districtName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `predictedCase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `districtName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mosquito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inspectionMosquito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `gender` INTEGER NOT NULL DEFAULT 1,
    `inspectionId` INTEGER NOT NULL,
    `mosquitoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `virus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inspectionVirus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `inspectionId` INTEGER NOT NULL,
    `virusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inspection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `week` INTEGER NOT NULL,
    `region_id` INTEGER NOT NULL,
    `trapId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `realCase` ADD CONSTRAINT `realCase_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `district`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `predictedCase` ADD CONSTRAINT `predictedCase_districtName_fkey` FOREIGN KEY (`districtName`) REFERENCES `district`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionMosquito` ADD CONSTRAINT `inspectionMosquito_inspectionId_fkey` FOREIGN KEY (`inspectionId`) REFERENCES `inspection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionMosquito` ADD CONSTRAINT `inspectionMosquito_mosquitoId_fkey` FOREIGN KEY (`mosquitoId`) REFERENCES `mosquito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionVirus` ADD CONSTRAINT `inspectionVirus_inspectionId_fkey` FOREIGN KEY (`inspectionId`) REFERENCES `inspection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionVirus` ADD CONSTRAINT `inspectionVirus_virusId_fkey` FOREIGN KEY (`virusId`) REFERENCES `virus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspection` ADD CONSTRAINT `inspection_trapId_fkey` FOREIGN KEY (`trapId`) REFERENCES `trap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
