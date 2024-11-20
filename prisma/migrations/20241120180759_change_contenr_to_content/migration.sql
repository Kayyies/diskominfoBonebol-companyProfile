/*
  Warnings:

  - You are about to drop the column `contenr` on the `BeritaHoax` table. All the data in the column will be lost.
  - Added the required column `content` to the `BeritaHoax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BeritaHoax" DROP COLUMN "contenr",
ADD COLUMN     "content" TEXT NOT NULL;
