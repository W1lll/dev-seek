/*
  Warnings:

  - You are about to alter the column `discordId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `githubId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `discordId` INTEGER NULL,
    MODIFY `githubId` INTEGER NULL;
