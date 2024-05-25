/*
  Warnings:

  - Added the required column `date` to the `lostItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lostItems" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" TEXT DEFAULT 'Hello',
ALTER COLUMN "name" DROP NOT NULL;
