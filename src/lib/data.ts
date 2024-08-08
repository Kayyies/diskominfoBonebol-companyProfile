import { Prisma } from "@prisma/client";

export const getLayanan = async () => {
  try {
    const response = await fetch("/api/layanan");
    const data = await response.json();
    return data.map((item) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }
};

export const getProfil = async () => {
  try {
    const response = await fetch("/api/profil");
    const data = await response.json();
    return data.map((item) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }
};
