"use client";

import { useState } from "react";
import {
  FileDown,
  Share2,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowLeft,
  RotateCcw,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import {
  AnalysisResult,
  CountryCode,
  Language,
  UploadedImage,
} from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COUNTRIES } from "@/data/legalAndSos";
import {
  buildEvidencePdfFile,
  generateEvidencePdf,
} from "@/utils/pdfGenerator";

interface StepExportProps {
  language: Language;
  country: CountryCode;
  suspectHandle: string;
  incidentDate: string;
  analysis: AnalysisResult;
  images: UploadedImage[];
  onBack: () => void;
  onClearAll: () => void;
}

export function StepExport({
  language,
  country,
  suspectHandle,
  incidentDate,
  analysis,
  images,
  onBack,
  onClearAll,
}: StepExportProps) {
  const t = TRANSLATIONS[language].step3;
  const countryProfile = COUNTRIES[country];
  const [isGenerating, setIsGenerating] = useState(false);
  const canShareFiles =
    typeof navigator !== "undefined" && "share" in navigator;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateEvidencePdf({
        language,
        country,
        suspectHandle,
        incidentDate,
        analysis,
        images,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const file = await buildEvidencePdfFile({
        language,
        country,
        suspectHandle,
        incidentDate,
        analysis,
        images,
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: TRANSLATIONS[language].pdf.reportTitle,
        });
      } else {
        await generateEvidencePdf({
          language,
          country,
          suspectHandle,
          incidentDate,
          analysis,
          images,
        });
      }
    } catch {
      // User cancelled share sheet
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* PDF Download Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          {t.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{t.subtitle}</p>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:opacity-70 sm:text-base"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{t.generatingPdf}</span>
              </>
            ) : (
              <>
                <FileDown className="h-5 w-5" />
                <span>{t.downloadPdf}</span>
              </>
            )}
          </button>

          {canShareFiles && (
            <button
              type="button"
              onClick={handleShare}
              disabled={isGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:opacity-70 sm:text-base"
            >
              <Share2 className="h-5 w-5 text-teal-400" />
              <span>{t.sharePdf}</span>
            </button>
          )}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          {t.pdfNote}
        </p>
      </div>

      {/* SOS & Legal Contacts */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-1 flex items-center gap-2 text-slate-900">
          <ShieldAlert className="h-5 w-5 text-teal-600" />
          <h2 className="text-base font-bold">{t.sosTitle}</h2>
        </div>
        <p className="mb-4 text-xs text-slate-600 sm:text-sm">
          {t.sosSubtitle}{" "}
          <span className="font-semibold text-slate-900">
            {countryProfile.names[language]}
          </span>
        </p>

        <div className="space-y-3">
          {countryProfile.contacts.map((contact, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <h3 className="text-sm font-bold text-slate-900">
                {contact.name}
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                {contact.role[language]}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-slate-800 ring-1 ring-slate-200 hover:bg-teal-50 hover:text-teal-800"
                  >
                    <Phone className="h-3.5 w-3.5 text-teal-600" />
                    <span>
                      {t.phoneLabel}: {contact.phone}
                    </span>
                  </a>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-slate-800 ring-1 ring-slate-200 hover:bg-teal-50 hover:text-teal-800"
                  >
                    <Mail className="h-3.5 w-3.5 text-teal-600" />
                    <span>
                      {t.emailLabel}: {contact.email}
                    </span>
                  </a>
                )}

                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-slate-800 ring-1 ring-slate-200 hover:bg-teal-50 hover:text-teal-800"
                  >
                    <Globe className="h-3.5 w-3.5 text-teal-600" />
                    <span>{t.webLabel}</span>
                  </a>
                )}

                {contact.hours && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1.5 text-teal-800">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {t.hoursLabel}: {contact.hours}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
          <a
            href="https://shesafe.online/en/baza-aktera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:underline"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{t.directoryLink}</span>
          </a>
          <p className="mt-1.5 text-[11px] text-slate-500">
            {t.directoryDisclaimer}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.backBtn}</span>
        </button>

        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{t.clearAllBtn}</span>
        </button>
      </div>
    </div>
  );
}
