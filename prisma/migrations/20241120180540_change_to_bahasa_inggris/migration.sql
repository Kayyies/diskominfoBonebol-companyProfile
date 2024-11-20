/*
  Warnings:

  - You are about to drop the column `judul` on the `BeritaHoax` table. All the data in the column will be lost.
  - You are about to drop the column `kategori` on the `BeritaHoax` table. All the data in the column will be lost.
  - You are about to drop the column `konten` on the `BeritaHoax` table. All the data in the column will be lost.
  - Added the required column `category` to the `BeritaHoax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenr` to the `BeritaHoax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BeritaHoax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BeritaHoax" DROP COLUMN "judul",
DROP COLUMN "kategori",
DROP COLUMN "konten",
ADD COLUMN     "category" "KategoriBerita" NOT NULL,
ADD COLUMN     "contenr" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
