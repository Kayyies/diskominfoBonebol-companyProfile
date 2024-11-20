/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Dokumen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dokumen_slug_key" ON "Dokumen"("slug");
