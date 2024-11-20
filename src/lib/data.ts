//@/lib/data"

import { prisma } from "@/lib/prisma";

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

export const getBannerById = async (id: string) => {
  try {
    const item = await prisma?.banner.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getLayananById = async (id: string) => {
  try {
    const item = await prisma?.layanan.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getDokumenById = async (id: string) => {
  try {
    const item = await prisma?.dokumen.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
export const getBeritaHoaxById = async (id: string) => {
  try {
    const item = await prisma?.beritaHoax.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
export const getUserById = async (id: string) => {
  try {
    const item = await prisma?.user.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
