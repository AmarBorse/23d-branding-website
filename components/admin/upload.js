"use client";
import { upload } from "@vercel/blob/client";

// Makes big photos lighter (max 2400px, good-quality JPEG) before uploading, so the site stays fast.
async function shrink(file, max = 2400) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) return file;
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d");
  if (file.type === "image/png") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.86));
  return blob ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file;
}

export async function uploadImage(file, folder = "projects") {
  const small = await shrink(file);
  const safe = small.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const res = await upload(`${folder}/${safe}`, small, { access: "public", handleUploadUrl: "/api/admin/upload" });
  return res.url;
}
