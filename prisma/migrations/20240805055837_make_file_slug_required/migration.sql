/*
  Warnings:

  - Made the column `file` on table `Dokumen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Dokumen` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dokumen" ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;
