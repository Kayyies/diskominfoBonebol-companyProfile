/*
  Warnings:

  - Added the required column `updatedAt` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Dokumen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Dokumen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Layanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Dokumen" 
ADD COLUMN "desc" TEXT NOT NULL DEFAULT 'No description provided',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Layanan" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profil" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

