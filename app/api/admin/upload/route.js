import { handleUpload } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { COOKIE, isValidSession } from "@/lib/auth";
import { json } from "../_shared";

// Gives the admin's browser a short permission to upload one image straight to Vercel Blob.
export async function POST(req) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return json({ error: "Image storage is not connected yet (see the setup steps)." }, 500);
  const body = await req.json();
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        if (!(await isValidSession(cookies().get(COOKIE)?.value))) throw new Error("Please log in again.");
        return { allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"], maximumSizeInBytes: 15 * 1024 * 1024, addRandomSuffix: true };
      },
    });
    return json(result);
  } catch (e) {
    return json({ error: e.message || "Upload failed." }, 400);
  }
}
