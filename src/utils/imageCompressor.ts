import { UploadedImage } from "@/types";

const MAX_AI_WIDTH = 1024;
const AI_JPEG_QUALITY = 0.72;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

async function computeSha256(file: File): Promise<string | undefined> {
  try {
    if (!crypto?.subtle) return undefined;
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return undefined;
  }
}

function compressDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = img.width > MAX_AI_WIDTH ? MAX_AI_WIDTH / img.width : 1;
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", AI_JPEG_QUALITY));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Keeps full-resolution originalDataUrl and SHA-256 forensic hash in memory,
 * extracts file timestamp, and builds a lightweight compressedDataUrl for Vision AI.
 */
export async function processUploadedImage(file: File): Promise<UploadedImage> {
  const [originalDataUrl, sha256] = await Promise.all([
    readFileAsDataUrl(file),
    computeSha256(file),
  ]);
  const compressedDataUrl = await compressDataUrl(originalDataUrl);

  const capturedAt = file.lastModified
    ? new Date(file.lastModified).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    originalDataUrl,
    compressedDataUrl,
    sizeBytes: file.size,
    sha256,
    capturedAt,
  };
}
