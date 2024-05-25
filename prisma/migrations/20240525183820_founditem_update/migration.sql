/*
  Warnings:

  - You are about to drop the column `lostDate` on the `claims` table. All the data in the column will be lost.
  - Made the column `location` on table `foundItems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foundDate` on table `foundItems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "claims" DROP COLUMN "lostDate";

-- AlterTable
ALTER TABLE "foundItems" ADD COLUMN     "email" TEXT,
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "foundDate" SET NOT NULL;
