/*
  Warnings:

  - You are about to drop the column `lostItemId` on the `claims` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_lostItemId_fkey";

-- AlterTable
ALTER TABLE "claims" DROP COLUMN "lostItemId";

-- AlterTable
ALTER TABLE "foundItems" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "lostItems" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
