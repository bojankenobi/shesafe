import { jsPDF } from "jspdf";
import { AnalysisResult, CountryCode, Language, UploadedImage } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COUNTRIES } from "@/data/legalAndSos";

let cachedRegularFont: string | null = null;
let cachedBoldFont: string | null = null;

async function fetchFontAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load font: ${url}`);
  }
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function ensureUnicodeFonts(doc: jsPDF): Promise<boolean> {
  try {
    if (!cachedRegularFont) {
      cachedRegularFont = await fetchFontAsBase64("/fonts/DejaVuSans.ttf");
    }
    if (!cachedBoldFont) {
      cachedBoldFont = await fetchFontAsBase64("/fonts/DejaVuSans-Bold.ttf");
    }
    doc.addFileToVFS("DejaVuSans.ttf", cachedRegularFont);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.addFileToVFS("DejaVuSans-Bold.ttf", cachedBoldFont);
    doc.addFont("DejaVuSans-Bold.ttf", "DejaVuSans", "bold");
    doc.setFont("DejaVuSans", "normal");
    return true;
  } catch {
    return false;
  }
}

function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.width || 800, height: img.height || 600 });
    img.onerror = () => resolve({ width: 800, height: 600 });
    img.src = dataUrl;
  });
}

export interface PdfExportParams {
  language: Language;
  country: CountryCode;
  suspectHandle: string;
  incidentDate: string;
  analysis: AnalysisResult;
  images: UploadedImage[];
}

export async function buildEvidencePdfFile(
  params: PdfExportParams
): Promise<File> {
  const { language, country, suspectHandle, incidentDate, analysis, images } =
    params;
  const t = TRANSLATIONS[language].pdf;
  const countryProfile = COUNTRIES[country];

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const hasUnicode = await ensureUnicodeFonts(doc);
  const fontFamily = hasUnicode ? "DejaVuSans" : "helvetica";

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageHeight - 20) {
      doc.addPage();
      y = 18;
    }
  };

  const drawWrappedText = (
    text: string,
    fontSize: number,
    style: "normal" | "bold" = "normal",
    color: [number, number, number] = [30, 41, 59],
    indent = 0
  ) => {
    doc.setFont(fontFamily, style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth - indent) as string[];
    const lineHeight = fontSize * 0.45;
    for (const line of lines) {
      ensureSpace(lineHeight + 2);
      doc.text(line, margin + indent, y);
      y += lineHeight;
    }
  };

  const drawSectionHeading = (title: string) => {
    ensureSpace(14);
    y += 3;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y - 4.5, contentWidth, 7.5, "F");
    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(0.8);
    doc.line(margin, y - 4.5, margin, y + 3);
    doc.setFont(fontFamily, "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin + 3, y + 0.5);
    y += 8;
  };

  // Top Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setFillColor(13, 148, 136);
  doc.rect(0, 28, pageWidth, 1.5, "F");

  doc.setFont(fontFamily, "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(t.reportTitle, margin, 13);

  doc.setFont(fontFamily, "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225);
  doc.text(t.reportSubtitle, margin, 20);

  y = 37;

  // Metadata Box
  const nowStr = new Date().toLocaleString("en-GB");
  const metaRows = [
    `${t.generatedAt}: ${nowStr}`,
    `${t.jurisdiction}: ${countryProfile.names[language]} (${countryProfile.criminalCodeName[language]})`,
    `${t.suspectInfo}: ${suspectHandle.trim() || t.notProvided}`,
    `${t.incidentDate}: ${incidentDate.trim() || t.notProvided}`,
  ];

  for (const row of metaRows) {
    drawWrappedText(row, 9.5, "normal", [51, 65, 85]);
    y += 1;
  }
  y += 3;

  // Manual Victim Info Box (Blank for Privacy)
  ensureSpace(34);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(margin, y, contentWidth, 30);
  y += 6;
  drawWrappedText(t.victimSectionTitle, 9.5, "bold", [15, 23, 42], 3);
  y += 1.5;
  drawWrappedText(t.victimName, 9, "normal", [51, 65, 85], 3);
  y += 1.5;
  drawWrappedText(t.victimId, 9, "normal", [51, 65, 85], 3);
  y += 1.5;
  drawWrappedText(t.victimContact, 9, "normal", [51, 65, 85], 3);
  y += 2;
  drawWrappedText(t.victimNote, 8, "normal", [100, 116, 139], 3);
  y += 4;

  // Section 1: Classification & Summary
  drawSectionHeading(t.classificationSection);
  drawWrappedText(`${t.category}: ${analysis.violence_category}`, 10, "bold", [15, 23, 42]);
  y += 1.5;
  drawWrappedText(`${t.severity}: ${analysis.severity_level}`, 9.5, "bold", [185, 28, 28]);
  y += 2;
  drawWrappedText(`${t.summary}: ${analysis.summary}`, 9.5, "normal", [30, 41, 59]);
  y += 2;

  // Section 2: Legal Mapping
  drawSectionHeading(t.legalSection);
  for (const item of analysis.legal_mapping) {
    drawWrappedText(`• ${item.article} — ${item.title}`, 9.5, "bold", [15, 23, 42], 2);
    y += 0.8;
    drawWrappedText(item.relevance, 9, "normal", [51, 65, 85], 5);
    y += 2;
  }

  // Section 3: Timeline
  drawSectionHeading(t.timelineSection);
  for (const ev of analysis.extracted_evidence) {
    drawWrappedText(
      `• [${ev.timestamp}] ${ev.sender}`,
      9.5,
      "bold",
      [15, 23, 42],
      2
    );
    y += 0.8;
    drawWrappedText(ev.summary, 9, "normal", [51, 65, 85], 5);
    y += 2;
  }

  // Section 4: Preservation Checklist
  drawSectionHeading(t.checklistSection);
  for (const tip of analysis.preservation_advice) {
    drawWrappedText(`• ${tip}`, 9, "normal", [51, 65, 85], 2);
    y += 1.5;
  }

  // Section 5: Embedded Screenshots
  if (images.length > 0) {
    drawSectionHeading(t.evidenceSection);
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const dims = await getImageDimensions(img.originalDataUrl);
      const maxImgWidth = contentWidth;
      const maxImgHeight = 110;
      const ratio = Math.min(maxImgWidth / dims.width, maxImgHeight / dims.height);
      const renderW = dims.width * ratio;
      const renderH = dims.height * ratio;

      ensureSpace(renderH + 16);
      drawWrappedText(
        `${t.attachmentLabel} #${i + 1}: ${img.name}`,
        9,
        "bold",
        [51, 65, 85]
      );
      y += 1.5;

      const format = img.originalDataUrl.startsWith("data:image/png")
        ? "PNG"
        : "JPEG";
      doc.addImage(img.originalDataUrl, format, margin, y, renderW, renderH);
      y += renderH + 3;
      if (img.sha256) {
        drawWrappedText(
          `${t.sha256Label}: ${img.sha256}`,
          7.5,
          "normal",
          [100, 116, 139]
        );
      }
      y += 4;
    }
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const footerLines = doc.splitTextToSize(
      t.footerDisclaimer,
      contentWidth - 15
    ) as string[];
    doc.text(footerLines, margin, pageHeight - 11);
    doc.text(`${p} / ${totalPages}`, pageWidth - margin - 8, pageHeight - 8);
  }

  const fileDate = new Date().toISOString().slice(0, 10);
  const filename = `digital-witness-dossier-${country.toLowerCase()}-${fileDate}.pdf`;
  const blob = doc.output("blob");
  return new File([blob], filename, { type: "application/pdf" });
}

export async function generateEvidencePdf(params: PdfExportParams): Promise<void> {
  const file = await buildEvidencePdfFile(params);
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
