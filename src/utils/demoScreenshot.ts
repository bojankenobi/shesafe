import { Language, UploadedImage } from "@/types";
import { DEMO_INPUTS } from "@/data/demoAnalysis";
import { processUploadedImage } from "./imageCompressor";

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function createSyntheticDemoImage(
  language: Language
): Promise<UploadedImage | null> {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 460;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Phone chat header
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 0, 720, 460);

  ctx.fillStyle = "#1E293B";
  ctx.fillRect(0, 0, 720, 74);

  ctx.fillStyle = "#94A3B8";
  ctx.beginPath();
  ctx.arc(46, 37, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("@marko_anon_991", 80, 34);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "14px sans-serif";
  ctx.fillText("18.11.2026 • 21:15", 80, 56);

  // Fictional demo watermark
  ctx.fillStyle = "#0D9488";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("SYNTHETIC DEMO DATA", 520, 42);

  // Incoming threat bubble
  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.roundRect(32, 110, 580, 190, 18);
  ctx.fill();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "19px sans-serif";
  const lines = wrapCanvasText(ctx, DEMO_INPUTS[language].messageText, 530);
  let y = 152;
  for (const line of lines.slice(0, 5)) {
    ctx.fillText(line, 56, y);
    y += 28;
  }

  ctx.fillStyle = "#94A3B8";
  ctx.font = "13px sans-serif";
  ctx.fillText("21:15", 545, 285);

  // Footer note
  ctx.fillStyle = "#64748B";
  ctx.font = "13px sans-serif";
  ctx.fillText(
    "Fictional screenshot generated for SheSafe Online Hackathon demo",
    32,
    430
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  if (!blob) return null;

  const file = new File([blob], "demo-chat-synthetic.png", {
    type: "image/png",
  });
  return processUploadedImage(file);
}
