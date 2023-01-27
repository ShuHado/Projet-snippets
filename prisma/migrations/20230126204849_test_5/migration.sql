/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `updatedAt` DATETIME(0) NOT NULL;
