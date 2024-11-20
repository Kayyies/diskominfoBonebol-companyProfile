-- CreateEnum
CREATE TYPE "KategoriBerita" AS ENUM ('POLITIK', 'EKONOMI', 'SOSIAL', 'KEBUDAYAAN', 'KESEHATAN', 'TEKNOLOGI', 'LINGKUNGAN', 'LOKAL');

-- AlterTable
ALTER TABLE "Dokumen" ALTER COLUMN "content" DROP DEFAULT;

-- CreateTable
CREATE TABLE "BeritaHoax" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "kategori" "KategoriBerita" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeritaHoax_pkey" PRIMARY KEY ("id")
);
