"use client";
import { analyzePage } from "./pdfAnalyze";

// pdf.js (the PDF reader) is loaded from a CDN only when someone imports a PDF,
// so it adds nothing to the website itself.
const VERSION = "6.4.299";
// the "legacy" build works in older browsers too
const BASE = process.env.NEXT_PUBLIC_PDFJS_BASE || `https://cdn.jsdelivr.net/npm/pdfjs-dist@${VERSION}/legacy/build`;

let libPromise = null;
function loadPdfJs() {
  if (!libPromise) {
    libPromise = import(/* webpackIgnore: true */ `${BASE}/pdf.min.mjs`).then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = `${BASE}/pdf.worker.min.mjs`;
      return lib;
    });
  }
  return libPromise;
}

async function renderRegion(page, r, targetWidth) {
  const scale = Math.min(3, Math.max(1, targetWidth / r.w));
  const viewport = page.getViewport({ scale, offsetX: -r.x * scale, offsetY: -r.y * scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(r.w * scale);
  canvas.height = Math.round(r.h * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, canvas, viewport }).promise;
  return canvas;
}

// Reads the PDF and returns { name, description, images: [{ preview, getFile(), w, h }] }
export async function readProjectPdf(file, onStep = () => {}) {
  onStep("Opening the PDF…");
  const lib = await loadPdfJs();
  const doc = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()), isEvalSupported: false }).promise;
  const page = await doc.getPage(1);
  onStep("Finding the text and images…");
  const info = await analyzePage(page, lib.OPS);

  const images = [];
  for (let i = 0; i < info.images.length; i++) {
    onStep(`Preparing image ${i + 1} of ${info.images.length}…`);
    const r = info.images[i];
    const small = await renderRegion(page, r, 360);
    images.push({
      ...r,
      preview: small.toDataURL("image/jpeg", 0.8),
      // full-size version is only made when the image is actually used
      getFile: async () => {
        const big = await renderRegion(page, r, 2000);
        const blob = await new Promise((res) => big.toBlob(res, "image/jpeg", 0.88));
        return new File([blob], `${(info.name || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}.jpg`, { type: "image/jpeg" });
      },
    });
  }
  return { name: info.name, description: info.description, images, pages: doc.numPages };
}
