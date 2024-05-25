/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `itemCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "lostItems" ADD COLUMN     "isFound" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "itemCategories_name_key" ON "itemCategories"("name");
