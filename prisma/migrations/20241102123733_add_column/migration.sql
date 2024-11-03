-- AlterTable
ALTER TABLE "Banner" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Dokumen" ALTER COLUMN "desc" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Layanan" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Profil" ALTER COLUMN "updatedAt" DROP DEFAULT;
