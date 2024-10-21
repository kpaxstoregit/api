/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('NOVIDADE', 'HOT');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
ADD COLUMN     "benefit" TEXT,
ADD COLUMN     "classification" INTEGER,
ADD COLUMN     "composition" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "promotion" DOUBLE PRECISION,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'NOVIDADE',
ADD COLUMN     "suggestionOfUse" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
