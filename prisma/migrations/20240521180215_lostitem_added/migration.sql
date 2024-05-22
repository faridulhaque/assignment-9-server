/*
  Warnings:

  - You are about to drop the column `foundItemName` on the `lostItems` table. All the data in the column will be lost.
  - Added the required column `lostItemName` to the `lostItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lostItems" DROP COLUMN "foundItemName",
ADD COLUMN     "lostItemName" TEXT NOT NULL;
