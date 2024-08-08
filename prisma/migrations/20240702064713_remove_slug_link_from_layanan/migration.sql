/*
  Warnings:

  - You are about to drop the column `slugLink` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `slugLink` on the `Dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `slugLink` on the `Layanan` table. All the data in the column will be lost.
  - You are about to drop the column `slugLink` on the `Profil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "slugLink";

-- AlterTable
ALTER TABLE "Dokumen" DROP COLUMN "slugLink";

-- AlterTable
ALTER TABLE "Layanan" DROP COLUMN "slugLink";

-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "slugLink";
