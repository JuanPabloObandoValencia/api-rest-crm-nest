/*
  Warnings:

  - You are about to drop the `item_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `third_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `third_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_item_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_sale_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `thirds` DROP FOREIGN KEY `thirds_third_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `thirds` DROP FOREIGN KEY `thirds_third_type_id_fkey`;

-- DropIndex
DROP INDEX `items_item_type_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `sales_sale_status_id_fkey` ON `sales`;

-- DropIndex
DROP INDEX `thirds_third_status_id_fkey` ON `thirds`;

-- DropIndex
DROP INDEX `thirds_third_type_id_fkey` ON `thirds`;

-- DropTable
DROP TABLE `item_types`;

-- DropTable
DROP TABLE `sale_statuses`;

-- DropTable
DROP TABLE `third_statuses`;

-- DropTable
DROP TABLE `third_types`;

-- CreateTable
CREATE TABLE `thirds_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thirds_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `thirds` ADD CONSTRAINT `thirds_third_type_id_fkey` FOREIGN KEY (`third_type_id`) REFERENCES `thirds_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thirds` ADD CONSTRAINT `thirds_third_status_id_fkey` FOREIGN KEY (`third_status_id`) REFERENCES `thirds_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_item_type_id_fkey` FOREIGN KEY (`item_type_id`) REFERENCES `items_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_sale_status_id_fkey` FOREIGN KEY (`sale_status_id`) REFERENCES `sales_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
