/*
  Warnings:

  - Changed the type of `category` on the `Dokumen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Profil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProfilCategory" AS ENUM ('DISKOMINFO_BONE_BOLANGO', 'SEJARAH_DISKOMINFO_BONE_BOLANGO', 'JAJARAN_DISKOMINFO_BONE_BOLANGO');

-- CreateEnum
CREATE TYPE "DokumenCategory" AS ENUM ('SK_GUBERNUR', 'SK_BUPATI', 'BONEBOL_SEPEKAN');

-- AlterTable
ALTER TABLE "Dokumen" DROP COLUMN "category",
ADD COLUMN     "category" "DokumenCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "category",
ADD COLUMN     "category" "ProfilCategory" NOT NULL;

-- DropEnum
DROP TYPE "Category";
