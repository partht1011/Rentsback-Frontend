"use server"; // ✅ Ensure this file is treated as a server action

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 600000,
});

// ✅ Ensure only async functions are exported
export async function uploadImage(file, folder) {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "auto", folder }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
      .end(bytes);
  });
}

export async function deleteImage(id) {
  return cloudinary.v2.uploader.destroy(id);
}
