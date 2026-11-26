# Digital Witness (Digitalni Svedok / Dëshmitari Digjital / Дигитален Сведок)

> **Hackathon MVP Notice:** This is a prototype developed for the **SheSafe Online Regional Hackathon**. It is not ready for real-world use without expert legal, safety, and security validation. All demonstrations use fictional/synthetic data.

## 1. Product Name & Purpose
**Digital Witness** (discreetly titled **Notes & Calc** in PWA manifest/browser tab) is a mobile-first, zero-storage Progressive Web App (PWA) designed to help women and girls in the Western Balkans structure and package digital evidence of technology-facilitated gender-based violence (TFGBV) into an organized PDF dossier for law enforcement and support organizations.

## 2. Core User Flow
1. **Discreet Entry (Calculator Mask):** The app opens as a functional calculator. Entering the user's PIN (default demo PIN: `1919`) + `=` unlocks the tool. Entering any wrong 4+ digit PIN + `=` silently wipes session/local memory.
2. **Step 1 — Evidence Input & Jurisdiction:** Select jurisdiction (`SRB`, `BIH`, `MNE`, `HRV`, `MKD`, `ALB`), upload up to 5 screenshots (compressed client-side for AI, originals kept in RAM with SHA-256 hash), paste or dictate text (`Web Speech API`), or load the fictional demo scenario.
3. **Step 2 — Preliminary AI Analysis & Legal Mapping:** `/api/analyze` returns structured categorization, preliminary Criminal Code references, extracted timeline, and a forensic preservation checklist — or falls back visibly to Demo Mode if no API key is configured.
4. **Step 3 — PDF Dossier & Verified Local Help:** Generates a Unicode PDF (`jsPDF` + `DejaVuSans`) directly on the device with blank manual fields for personal identity, embedded screenshots + SHA-256 hashes, and country-specific SOS/cybercrime contacts. Includes 1-tap `BRZI IZLAZ` (double-ESC) to clear memory and return to the calculator.

## 3. Technologies & Dependencies
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling & Icons:** Tailwind CSS v4, `lucide-react`
- **PDF Generation:** `jspdf` + local `DejaVuSans.ttf` / `DejaVuSans-Bold.ttf` (supports BCMS `č ć š đ ž`, Albanian `ë ç`, Macedonian Cyrillic `ѓ ќ ѕ љ њ џ`)
- **AI Integration (Optional):** Stateless `/api/analyze` proxy supporting OpenRouter (`:free` vision models like `google/gemma-3-27b-it:free`) and Google AI Studio (`gemini-2.5-flash`)

## 4. How to Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`. Enter `1919` then `=` on the calculator to unlock.

### Configuration (Secrets)
No API keys are committed to the repository. To enable live Vision AI locally or on Vercel, copy `.env.local.example` to `.env.local` and set `OPENROUTER_API_KEY` or `GEMINI_API_KEY` (or enter a session-only key in the UI Settings modal).

## 5. Test Data
Click **"Učitaj demo primer" / "Ngarko shembullin demo" / "Вчитај демо пример"** in Step 1 to populate fictional test data. Do not enter real survivor reports or personal identities during hackathon testing.

## 6. What Works, What Is Simulated, and Known Limitations
- **Implemented & Working:** Calculator camouflage + SHA-256 PIN lock + silent wipe on wrong PIN; BCMS/AL/MK UI & PDF localization; client-side image compression + SHA-256 hashing; Unicode PDF export + Web Share; `/api/analyze` serverless proxy; SOS modal (`tel:` dialer, `navigator.geolocation` SMS link, live `MediaRecorder`).
- **Simulated / Fallback:** When no API key is provided (or an external API fails), Step 2 uses a deterministic, clearly labelled Demo/Fallback analysis (`buildDemoAnalysis`).
- **Known Limitations:**
  - **Quick Exit:** Clears in-app state and storage, but **cannot** erase browser history, OS-level notifications, or already downloaded PDF files.
  - **PWA OS Limits:** Browsers on iOS/Android cannot listen for voice triggers when the screen is locked or place silent calls/SMS without user confirmation.
  - **Legal & SOS Data:** Criminal Code articles and SOS contacts in `src/data/legalAndSos.ts` require formal verification by regional legal/NGO partners before public deployment.
  - **Preliminary AI Output:** AI categorization is informational preparation only, not a formal legal assessment.

## 7. Data Flow & Retention
- **Zero-Database:** No user accounts, no database, and no server-side logging of uploaded images or text.
- **In-Memory Processing:** Original images and text stay in browser RAM; compressed copies are sent to `/api/analyze` only if live AI is enabled.
- **PIN Storage:** If a custom PIN is set, only its SHA-256 hash is stored in `localStorage` under `calc_prefs`.

## 8. How It Was Checked
- `npm run lint` (ESLint)
- `npm run build` (Next.js TypeScript & production bundle)
- `npm test` (`node --test tests/core.test.mjs` — PIN hashing, Unicode PDF generation for BCMS/AL/MK, regional data coverage)

## 9. Next Steps (Post-Hackathon)
1. Formal legal and subject-matter review of `legalAndSos.ts` with ASTRA and regional partners.
2. Controlled usability testing under partner safeguarding protocols.
3. Optional Phase 2 native mobile module for background voice-triggered SOS if required.
