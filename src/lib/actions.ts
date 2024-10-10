//action.ts
"use server";

import { z } from "zod";
import prisma from "./db";
import { ProfilCategory, DokumenCategory, Role } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { hash } from "bcryptjs"; // bcryptjs untuk hash password
import { generateDateTimeString } from "./generatedTimes";

// PDF to image (PDF-LIB)
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { Buffer } from "buffer";

const extractImageUrls = (content: string): string[] => {
  const regex = /<img[^>]+src="([^">]+)"/g;
  let matches;
  const urls: string[] = [];

  while ((matches = regex.exec(content)) !== null) {
    urls.push(matches[1]); // match[1] berisi URL gambar
  }

  return urls;
};

// Layanan schema for zod
// Layanan schema for create and update
const LayananSchema = (isEdit: boolean, existingImage?: string) =>
  z.object({
    title: z.string().min(1, { message: "Title is required" }),
    image: z
      .instanceof(File)
      .optional() // Optional on edit
      .refine(
        (file) => {
          // Skip validation for empty file if it's an edit and the image already exists
          if (isEdit && existingImage && file?.size === 0) return true;

          // Enforce that the image is required for new uploads
          if (!isEdit) return file?.size > 0;

          // For all other cases, ensure the file size is greater than 0
          return file?.size > 0;
        },
        { message: "Image is required" },
      )
      .refine(
        (file) => {
          // Skip type validation for empty file in edit mode
          if (file?.size === 0) return true;

          // Only allow image types
          return file === undefined || file.type.startsWith("image/");
        },
        { message: "Only images are allowed" },
      )
      .refine(
        (file) => {
          // Skip size validation for empty file in edit mode
          if (file?.size === 0) return true;

          // Validate file size (only if not empty)
          return file === undefined || file.size < 4000000;
        },
        { message: "Image must be less than 4MB" },
      ),
    desc: z.string().min(1, { message: "Description is required" }),
    link: z.string().min(1, { message: "Link is required" }),
  });

export const createLayanan = async (prevState: unknown, formData: FormData) => {
  const validatedFields = LayananSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, image, desc, link } = validatedFields.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.layanan.create({
      data: {
        title,
        image: url,
        desc,
        link,
      },
    });
  } catch (error) {
    return { message: "failed to create data" };
  }

  revalidatePath("/admin/layanan");
  redirect("/admin/layanan");
};

// Layanan Update
export const updateLayanan = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  // Get the existing Layanan from the database
  const existingLayanan = await prisma.layanan.findUnique({
    where: { id },
  });

  if (!existingLayanan) {
    return { message: "Layanan not found" };
  }

  // Pass the edit flag and existing image to the Zod schema
  const validatedFields = LayananSchema(
    true, // isEdit = true
    existingLayanan.image, // Existing image from database
  ).safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, image, desc, link } = validatedFields.data;

  let imageUrl = existingLayanan.image;

  // If a new image is uploaded, process it
  if (image && image.size > 0) {
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imageUrl = url;
  }

  // Update the Layanan with the new data
  try {
    await prisma.layanan.update({
      data: {
        title,
        image: imageUrl,
        desc,
        link,
      },
      where: { id },
    });
  } catch (error) {
    console.error("Failed to update data:", error);
    return { message: "Failed to update data" };
  }

  revalidatePath("/admin/layanan");
  redirect("/admin/layanan");
};

//=================================================================
//Banner
//=================================================================
// Banner Schema for zod
// Zod schema for banner
const BannerUploadSchema = (isEdit: boolean, existingImage?: string) =>
  z.object({
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          // Skip validation for empty file if it's an edit and the image already exists
          if (isEdit && existingImage && file?.size === 0) return true;

          // Enforce that the image is required for new uploads
          if (!isEdit) return file?.size > 0;

          // For all other cases, ensure the file size is greater than 0
          return file?.size > 0;
        },
        { message: "Image is required" },
      )
      .refine(
        (file) => {
          // Skip type validation for empty file in edit mode
          if (file?.size === 0) return true;

          // Only allow image types
          return file === undefined || file.type.startsWith("image/");
        },
        { message: "Only images are allowed" },
      )
      .refine(
        (file) => {
          // Skip size validation for empty file in edit mode
          if (file?.size === 0) return true;

          // Validate file size (only if not empty)
          return file === undefined || file.size < 4000000;
        },
        { message: "Image must be less than 4MB" },
      ),

    desc: z.string().min(1, { message: "Description is required" }),
  });

// Banner Create
export const createBanner = async (prevState: unknown, formData: FormData) => {
  const validatedFields = BannerUploadSchema(false).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, desc } = validatedFields.data;

  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.banner.create({
      data: {
        image: url,
        desc,
      },
    });
  } catch (error) {
    return { message: "failed to create data" };
  }

  revalidatePath("/admin/banner");
  redirect("/admin/banner");
};
// Banner Update
export const updateBanner = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  // Get the existing banner from the database
  const existingBanner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!existingBanner) {
    return { message: "Banner not found" };
  }

  // Pass the edit flag and existing image to the Zod schema
  const validatedFields = BannerUploadSchema(
    true,
    existingBanner.image,
  ).safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, desc } = validatedFields.data;

  let imageUrl = existingBanner.image;

  // If a new image is uploaded, process it
  if (image && image.size > 0) {
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imageUrl = url;
  }

  // Update the banner with the new data
  try {
    await prisma.banner.update({
      data: {
        image: imageUrl,
        desc,
      },
      where: { id },
    });
  } catch (error) {
    console.error("Failed to update data:", error);
    return { message: "Failed to update data" };
  }

  revalidatePath("/admin/banner");
  redirect("/admin/banner");
};

//=================================================================
// Dokumen
//=================================================================
// Dokumen Schema for Zod
const DokumenUploadSchema = (
  isEdit: boolean,
  existingImage?: string,
  existingFile?: string,
) =>
  z.object({
    title: z.string().min(1, { message: "Nama dokumen diperlukan" }),

    // Schema untuk file dokumen
    file: z
      .instanceof(File)
      .optional() // Optional jika dalam mode edit
      .refine(
        (file) => {
          // Jika sedang edit dan file tidak di-upload, izinkan menggunakan file yang sudah ada
          if (isEdit && existingFile && !file) return true;

          // File diperlukan untuk create
          if (!isEdit) return file?.size > 0;

          return file?.size > 0;
        },
        { message: "File dokumen diperlukan" },
      )
      .refine(
        (file) => {
          if (file?.size === 0) return true;
          return file === undefined || file.type === "application/pdf";
        },
        { message: "Hanya file PDF yang diperbolehkan" },
      )
      .refine(
        (file) => {
          if (file?.size === 0) return true;
          return file === undefined || file.size < 10000000;
        },
        { message: "File harus kurang dari 10MB" },
      ),

    // Schema untuk image
    image: z
      .instanceof(File)
      .optional() // Optional jika dalam mode edit
      .refine(
        (file) => {
          // Jika sedang edit dan image tidak di-upload, izinkan menggunakan image yang sudah ada
          if (isEdit && existingImage && !file) return true;

          // Image diperlukan untuk create
          if (!isEdit) return file?.size > 0;

          return file?.size > 0;
        },
        { message: "Cover dokumen diperlukan" },
      )
      .refine(
        (file) => {
          if (file?.size === 0) return true;
          return file === undefined || file.type.startsWith("image/");
        },
        { message: "Hanya file gambar yang diperbolehkan" },
      )
      .refine(
        (file) => {
          if (file?.size === 0) return true;
          return file === undefined || file.size < 4000000;
        },
        { message: "Cover dokumen harus kurang dari 4MB" },
      ),

    // Kategori dokumen
    category: z.nativeEnum(DokumenCategory, { message: "Kategori diperlukan" }),
  });

// Dokumen Create
export const createDokumen = async (prevState: unknown, formData: FormData) => {
  console.log("createDokumen called");
  const validatedFields = DokumenUploadSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(
      "Validation failed",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, image, file, category } = validatedFields.data;

  const baseSlug = slugify(title, { lower: true, strict: true });
  // const timeForSlug = generateDateTimeString();
  // const uniqueSlug = `${baseSlug}-${timeForSlug}`;

  const { url: imageUrl } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  const { url: fileUrl } = await put(file.name, file, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.dokumen.create({
      data: {
        title,
        image: imageUrl,
        file: fileUrl,
        category,
        slug: baseSlug,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
    return { message: "Failed to create document" };
  }

  revalidatePath("/admin/dokumen");
  redirect("/admin/dokumen");
};

export const updateDokumen = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  // Fetch dokumen existing dari database
  const existingDokumen = await prisma.dokumen.findUnique({
    where: { id },
  });

  if (!existingDokumen) {
    return { message: "Dokumen tidak ditemukan" };
  }

  // Validasi form menggunakan Zod schema
  const validatedFields = DokumenUploadSchema(
    true, // mode edit
    existingDokumen.image, // existing image
    existingDokumen.file, // existing file
  ).safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, image, file, category } = validatedFields.data;

  let imageUrl = existingDokumen.image;
  let fileUrl = existingDokumen.file;

  // Jika ada image baru yang di-upload
  if (image && image.size > 0) {
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imageUrl = url;
  }

  // Jika ada file dokumen baru yang di-upload
  if (file && file.size > 0) {
    const { url } = await put(file.name, file, {
      access: "public",
      multipart: true,
    });
    fileUrl = url;
  }

  // Update dokumen dengan data yang baru
  try {
    await prisma.dokumen.update({
      where: { id },
      data: {
        title,
        image: imageUrl,
        file: fileUrl,
        category,
      },
    });
  } catch (error) {
    console.error("Failed to update data:", error);
    return { message: "Gagal memperbarui data dokumen" };
  }

  // Revalidate dan redirect ke halaman dokumen
  revalidatePath("/admin/dokumen");
  redirect("/admin/dokumen");
};

//=================================================================
// Dokumen
//=================================================================
// Profil Schema for Zod
const ProfilUploadSchema = z.object({
  category: z.nativeEnum(ProfilCategory),
  title: z.string().min(1, { message: "Title is required" }),
  content: z
    .string()
    .min(1, { message: "Content is required" }) // Validasi konten HTML yang dihasilkan
    .refine((value) => value.trim().length > 0, {
      message: "Content cannot be empty",
    }),
});

export const createProfil = async (prevState: unknown, formData: FormData) => {
  console.log("createProfil  called");

  // Validasi form menggunakan Zod
  const validatedFields = ProfilUploadSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { category, title, content } = validatedFields.data;
  console.log("validated data", { category, title, content });

  // Ambil URL gambar dari konten
  const imageUrls = extractImageUrls(content);

  // Base URL untuk gambar (sesuaikan dengan URL server yang sesuai)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Validasi setiap URL gambar
  for (let url of imageUrls) {
    // Tambahkan base URL jika gambar menggunakan URL relatif
    if (!url.startsWith("http")) {
      url = `${baseUrl}${url}`;
    }

    console.log("Checking URL:", url);
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error(
          `Gambar dengan URL ${url} tidak valid atau tidak bisa diakses.`,
        );
      }
    } catch (error) {
      console.log("Error during image validation:", error);
      return { error: `Error saat memvalidasi URL gambar: ${url}` };
    }
  }

  console.log("Image validation passed, proceeding to save data.");

  // Jika semua URL gambar valid, lanjutkan menyimpan ke database
  try {
    await prisma.profil.create({
      data: {
        category,
        title,
        content,
      },
    });
    console.log("Document created in database");
  } catch (error) {
    console.error("Error occurred while saving to the database:", error);
    return { message: "Failed to create data" };
  }

  revalidatePath("/admin/profil");
  redirect("/admin/profil");
};

//=================================================================
// User
//=================================================================
const UserSchema = (isEdit: boolean) =>
  z.object({
    username: z
      .string()
      .min(3, { message: "Username harus memiliki minimal 3 karakter" })
      .nonempty({ message: "Username harus diisi" }),

    password: z
      .string()
      .min(6, { message: "Password harus memiliki minimal 6 karakter" })
      .nonempty({ message: "Password harus diisi" })
      .optional()
      .refine((value) => isEdit || value, {
        message: "Password harus diisi pada form tambah user",
      }),

    role: z.nativeEnum(Role, {
      errorMap: () => ({ message: "Role harus dipilih" }),
    }),
  });

export const createUser = async (prevState: unknown, formData: FormData) => {
  // Validasi input form dengan Zod UserSchema
  const validatedFields = UserSchema(false).safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("formData entries:", Array.from(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password, role } = validatedFields.data;

  // Hash password sebelum menyimpan ke database
  const hashedPassword = await hash(password, 10);

  try {
    // Simpan user baru ke dalam database
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    console.error("Error occurred while creating user:", error);
    return { message: "Failed to create user" };
  }

  // Revalidate dan redirect setelah berhasil
  revalidatePath("/admin/user");
  redirect("/admin/user");
};

export const updateUser = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  // Ambil data user dari database berdasarkan ID
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    return { message: "User not found" };
  }

  // Validasi input form dengan Zod UserSchema
  const validatedFields = UserSchema(true).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password, role } = validatedFields.data;

  // Hash password hanya jika password baru diisi
  let hashedPassword = existingUser.password;
  if (password) {
    hashedPassword = await hash(password, 10);
  }

  try {
    // Update data user di database
    await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    return { message: "Failed to update user" };
  }

  // Revalidate dan redirect setelah berhasil
  revalidatePath("/admin/user");
  redirect("/admin/user");
};
