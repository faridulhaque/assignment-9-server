-- AlterTable
ALTER TABLE "lostItems" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "lostDate" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "imgUrl" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
