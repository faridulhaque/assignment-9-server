/*
  Warnings:

  - You are about to drop the column `distinguishingFeatures` on the `claims` table. All the data in the column will be lost.
  - You are about to drop the column `foundItemName` on the `foundItems` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `lostItems` table. All the data in the column will be lost.
  - You are about to drop the column `lostItemName` on the `lostItems` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lostDate` to the `lostItems` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "claims" DROP COLUMN "distinguishingFeatures";

-- AlterTable
ALTER TABLE "foundItems" DROP COLUMN "foundItemName",
ADD COLUMN     "foundDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lostItems" DROP COLUMN "date",
DROP COLUMN "lostItemName",
ADD COLUMN     "lostDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "username" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
