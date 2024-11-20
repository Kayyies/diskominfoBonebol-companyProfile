/*
  Warnings:

  - You are about to drop the column `desc` on the `Dokumen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dokumen" DROP COLUMN "desc",
ADD COLUMN     "content" TEXT DEFAULT '';
