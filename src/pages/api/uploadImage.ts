import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // untuk memberikan nama unik pada file
import { IncomingForm } from "formidable"; // Correct import

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to handle files with formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const form = new IncomingForm(); // Correct usage of IncomingForm

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log("Form parsing error:", err); // Log error jika parsing form gagal
        return res.status(500).json({ message: "File upload error" });
      }

      console.log("Files received:", files); // Log file yang diterima
      const file = files.image;

      // Handle file array or single file case
      const fileToHandle = Array.isArray(file) ? file[0] : file;

      if (fileToHandle) {
        const tempPath = fileToHandle.filepath; // Temporary path
        const fileExt = path.extname(fileToHandle.originalFilename || ".jpg");
        const filename = `${uuidv4()}${fileExt}`; // Generate unique filename
        const savePath = path.join(process.cwd(), "public/uploads", filename);

        console.log("Temporary file path:", tempPath); // Log path sementara
        console.log("New file path:", savePath); // Log path di mana file akan disimpan

        fs.copyFile(tempPath, savePath, (err) => {
          if (err) {
            console.log("File saving error:", err); // Log error jika gagal menyimpan file
            return res.status(500).json({ message: "Failed to upload image" });
          }

          console.log("File uploaded successfully:", savePath); // Log jika file berhasil diupload
          const imageUrl = `/uploads/${filename}`;
          return res.status(200).json({ url: imageUrl });
        });
      } else {
        console.log("No file uploaded or file array is invalid"); // Log jika tidak ada file atau format salah
        return res.status(400).json({ message: "No file uploaded" });
      }
    });
  } else {
    console.log("Invalid method:", req.method); // Log jika method tidak didukung
    return res.status(405).json({ message: "Method not allowed" });
  }
}
