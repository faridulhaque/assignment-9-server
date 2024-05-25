/*
  Warnings:

  - Added the required column `email` to the `lostItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `lostItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `lostItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lostItems" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
