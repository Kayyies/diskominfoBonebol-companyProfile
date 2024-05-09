import { Prisma } from "@prisma/client";

export const getProfil = async () => {
  try {
    const profil = await prisma.profil.findMany();
    return profil;
  } catch (error) {
    throw new Error("Gagal fetch data profil");
  }
};
