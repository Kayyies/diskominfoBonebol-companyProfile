/*
  Warnings:

  - You are about to drop the column `desc` on the `Profil` table. All the data in the column will be lost.
  - Added the required column `content` to the `Profil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "desc",
ADD COLUMN     "content" TEXT NOT NULL;
