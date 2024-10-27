/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `benefit` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `composition` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `suggestionOfUse` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "benefit" SET NOT NULL,
ALTER COLUMN "composition" SET NOT NULL,
ALTER COLUMN "suggestionOfUse" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
