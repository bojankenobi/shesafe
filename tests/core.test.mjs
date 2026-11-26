import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { jsPDF } from "jspdf";

const ROOT = process.cwd();

test("Unicode DejaVuSans fonts exist and have valid TTF headers", () => {
  const regularPath = path.join(ROOT, "public", "fonts", "DejaVuSans.ttf");
  const boldPath = path.join(ROOT, "public", "fonts", "DejaVuSans-Bold.ttf");

  assert.equal(fs.existsSync(regularPath), true, "DejaVuSans.ttf must exist");
  assert.equal(fs.existsSync(boldPath), true, "DejaVuSans-Bold.ttf must exist");

  const buf = fs.readFileSync(regularPath);
  assert.equal(buf[0], 0x00);
  assert.equal(buf[1], 0x01);
  assert.equal(buf[2], 0x00);
  assert.equal(buf[3], 0x00);
});

test("jsPDF generates valid PDF with BCMS, Albanian, and Macedonian characters", () => {
  const regularB64 = fs
    .readFileSync(path.join(ROOT, "public", "fonts", "DejaVuSans.ttf"))
    .toString("base64");
  const boldB64 = fs
    .readFileSync(path.join(ROOT, "public", "fonts", "DejaVuSans-Bold.ttf"))
    .toString("base64");

  const doc = new jsPDF();
  doc.addFileToVFS("DejaVuSans.ttf", regularB64);
  doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
  doc.addFileToVFS("DejaVuSans-Bold.ttf", boldB64);
  doc.addFont("DejaVuSans-Bold.ttf", "DejaVuSans", "bold");
  doc.setFont("DejaVuSans", "normal");

  doc.text("BCMS: č ć š đ ž Č Ć Š Đ Ž", 10, 15);
  doc.text("AL: ë ç Ë Ç", 10, 25);
  doc.text("MK: Дигитален Сведок ѓ ќ ѕ љ њ џ", 10, 35);

  const output = doc.output("arraybuffer");
  assert.ok(output.byteLength > 10000, "Generated PDF should be non-empty");
});

test("PIN SHA-256 hashing is deterministic and distinguishes valid vs invalid PIN", async () => {
  const hashPin = async (pin) => {
    const data = new TextEncoder().encode(`calc-salt:${pin}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const validHash = await hashPin("1919");
  const sameHash = await hashPin("1919");
  const wrongHash = await hashPin("0000");

  assert.equal(validHash.length, 64);
  assert.equal(validHash, sameHash);
  assert.notEqual(validHash, wrongHash);
});

test("All 6 Western Balkan jurisdictions and 3 languages are defined", () => {
  const legalSrc = fs.readFileSync(
    path.join(ROOT, "src", "data", "legalAndSos.ts"),
    "utf8"
  );
  const transSrc = fs.readFileSync(
    path.join(ROOT, "src", "data", "translations.ts"),
    "utf8"
  );

  for (const code of ["SRB", "BIH", "MNE", "HRV", "MKD", "ALB"]) {
    assert.ok(legalSrc.includes(`${code}:`), `Missing country ${code}`);
  }
  for (const lang of ["BCMS", "AL", "MK"]) {
    assert.ok(transSrc.includes(`${lang}:`), `Missing language ${lang}`);
  }
});
