"use server";

import { z } from "zod";
import prisma from "./db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { generateDateTimeString } from "./generatedTimes";

// PDF to image (PDF-LIB)
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { Buffer } from "buffer";

// Layanan schema for zod
const UploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "image must less than 4MB",
    }),
  desc: z.string().min(1),
  link: z.string().min(1),
});

// Banner Schema for zod
const BannerUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "image must less than 4MB",
    }),
  desc: z.string().min(1),
});

// Dokumen Schema for Zod
enum DokumenCategory {
  SK_GUBERNUR = "SK_GUBERNUR",
  SK_BUPATI = "SK_BUPATI",
  BONEBOL_SEPEKAN = "BONEBOL_SEPEKAN",
}

const DokumenUploadSchema = z.object({
  title: z.string().min(1),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDFs are allowed",
    })
    .refine((file) => file.size < 10000000, {
      message: "File must be less than 10MB",
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must be less than 4MB",
    }),
  category: z.nativeEnum(DokumenCategory),
});

// Dokumen - Extract pdf to img
const extractFirstPageAsImage = async (
  pdfBuffer: ArrayBuffer,
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const firstPage = pdfDoc.getPages()[0];
  const singlePagePdf = await PDFDocument.create();
  const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [0]);
  singlePagePdf.addPage(copiedPage);
  return await singlePagePdf.save();
};

export const createLayanan = async (prevState: unknown, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
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

export const createBanner = async (prevState: unknown, formData: FormData) => {
  const validatedFields = BannerUploadSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, desc } = validatedFields.data;

  console.log("Validated data", { image, desc });

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

// export const createDokumen = async (prevState: unknown, formData: FormData) => {
//   const validatedFields = DokumenUploadSchema.safeParse(
//     Object.fromEntries(formData.entries()),
//   );

//   if (!validatedFields.success) {
//     return {
//       error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { title, category, file } = validatedFields.data;

//   // Read file data as ArrayBuffer
//   const pdfBuffer = await file.arrayBuffer();

//   try {
//     // Extract the first page as an image buffer
//     const imageBuffer = await extractFirstPageAsImage(pdfBuffer);

//     // Save the image to a file or upload it
//     const imagePath = `/uploads/${file.name}-cover.pdf`;
//     fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

//     // Upload the original PDF and get the URL
//     const { url: fileUrl } = await put(file.name, Buffer.from(pdfBuffer), {
//       access: "public",
//       multipart: true,
//     });

//     // Save the image URL as well
//     const { url: imageUrl } = await put(
//       `${file.name}-cover.pdf`,
//       Buffer.from(imageBuffer),
//       {
//         access: "public",
//         multipart: true,
//       },
//     );

//     // Save the document info to the database
//     await prisma.dokumen.create({
//       data: {
//         title,
//         file: fileUrl,
//         image: imageUrl,
//         category,
//         createdAt: new Date(),
//       },
//     });

//     revalidatePath("/admin/dokumen");
//     redirect("/admin/dokumen");
//   } catch (error) {
//     return { message: "Failed to create document" };
//   }
// };

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
