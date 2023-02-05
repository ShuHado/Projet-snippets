/*
  Warnings:

  - You are about to alter the column `createdAt` on the `snippets` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `snippets` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `snippets` MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` DATETIME(0) NOT NULL;
