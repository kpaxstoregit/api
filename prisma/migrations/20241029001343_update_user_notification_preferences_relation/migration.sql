/*
  Warnings:

  - You are about to drop the column `lightMode` on the `NotificationPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotificationPreferences" DROP COLUMN "lightMode",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'Light';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationPreferencesId" UUID;
