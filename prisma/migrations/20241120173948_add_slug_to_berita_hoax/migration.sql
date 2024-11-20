/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BeritaHoax` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BeritaHoax_slug_key" ON "BeritaHoax"("slug");
