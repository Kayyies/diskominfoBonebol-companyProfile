/*
  Warnings:

  - You are about to drop the column `image` on the `Profil` table. All the data in the column will be lost.
  - Added the required column `slugLink` to the `Profil` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Profil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DISKOMINFO_BONE_BOLANGO', 'SEJARAH_DISKOMINFO_BONE_BOLANGO', 'JAJARAN_DISKOMINFO_BONE_BOLANGO');

-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "image",
ADD COLUMN     "slugLink" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- DropEnum
DROP TYPE "ProfilCategory";

-- CreateTable
CREATE TABLE "Layanan" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slugLink" TEXT NOT NULL,

    CONSTRAINT "Layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "slugLink" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dokumen" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "slugLink" TEXT NOT NULL,

    CONSTRAINT "Dokumen_pkey" PRIMARY KEY ("id")
);
