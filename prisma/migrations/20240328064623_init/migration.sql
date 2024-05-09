-- CreateEnum
CREATE TYPE "ProfilCategory" AS ENUM ('diskominfoBonebol', 'sejarahDiskominfoBonebol', 'JajaranDiskominfoBonebol');

-- CreateTable
CREATE TABLE "Profil" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "category" "ProfilCategory" NOT NULL,
    "image" TEXT,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);
