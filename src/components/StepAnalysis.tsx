"use client";

import { useState } from "react";
import {
  Scale,
  Clock,
  CheckSquare,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Pencil,
  Check,
} from "lucide-react";
import { AnalysisResult, Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

interface StepAnalysisProps {
  language: Language;
  analysis: AnalysisResult;
  onUpdateAnalysis: (next: AnalysisResult) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepAnalysis({
  language,
  analysis,
  onUpdateAnalysis,
  onBack,
  onNext,
}: StepAnalysisProps) {
  const t = TRANSLATIONS[language].step2;
  const [isEditing, setIsEditing] = useState(false);

  const severityBadgeClass =
    analysis.severity_code === "critical"
      ? "bg-red-100 text-red-800 border-red-200"
      : analysis.severity_code === "high"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-teal-100 text-teal-800 border-teal-200";

  return (
    <div className="space-y-5">
      {analysis.is_fallback && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900 sm:text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span>{t.fallbackBanner}</span>
        </div>
      )}

      {/* Summary Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              {t.title}
            </h1>
            <p className="mt-0.5 text-sm text-slate-600">{t.subtitle}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              analysis.is_demo
                ? "bg-slate-100 text-slate-700"
                : "bg-teal-100 text-teal-800"
            }`}
          >
            {analysis.is_demo ? t.demoBadge : `${t.liveBadge} (${analysis.model_used})`}
          </span>
        </div>

        <div className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {t.categoryLabel}
            </span>
            <p className="mt-1 text-base font-bold text-slate-900">
              {analysis.violence_category}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {t.severityLabel}
            </span>
            <div className="mt-1.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${severityBadgeClass}`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                {analysis.severity_level}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {t.summaryLabel}
            </span>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              {isEditing ? (
                <>
                  <Check className="h-3.5 w-3.5 text-teal-600" />
                  <span>{t.saveEditBtn}</span>
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5 text-teal-600" />
                  <span>{t.editBtn}</span>
                </>
              )}
            </button>
          </div>
          {isEditing ? (
            <textarea
              rows={3}
              value={analysis.summary}
              onChange={(e) =>
                onUpdateAnalysis({ ...analysis, summary: e.target.value })
              }
              className="mt-1.5 w-full rounded-xl border border-teal-400 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none"
            />
          ) : (
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {analysis.summary}
            </p>
          )}
        </div>

        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          {t.aiDisclaimer}
        </p>
      </div>

      {/* Legal Mapping */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-slate-900">
          <Scale className="h-5 w-5 text-teal-600" />
          <h2 className="text-base font-bold">{t.legalTitle}</h2>
        </div>
        <div className="space-y-3">
          {analysis.legal_mapping.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                  {item.article}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {item.title}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {item.relevance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-slate-900">
          <Clock className="h-5 w-5 text-teal-600" />
          <h2 className="text-base font-bold">{t.timelineTitle}</h2>
        </div>
        <div className="space-y-3">
          {analysis.extracted_evidence.map((ev, idx) => (
            <div
              key={idx}
              className="border-l-2 border-teal-600 pl-3.5 text-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {ev.timestamp}
                </span>
                <span>•</span>
                <span className="font-medium text-teal-700">{ev.sender}</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={ev.summary}
                  onChange={(e) => {
                    const updated = analysis.extracted_evidence.map((item, i) =>
                      i === idx ? { ...item, summary: e.target.value } : item
                    );
                    onUpdateAnalysis({
                      ...analysis,
                      extracted_evidence: updated,
                    });
                  }}
                  className="mt-1 w-full rounded-lg border border-teal-400 bg-white px-2.5 py-1.5 text-sm text-slate-900 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-slate-700">{ev.summary}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Preservation Checklist */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 shadow-xs sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-teal-950">
          <CheckSquare className="h-5 w-5 text-teal-700" />
          <h2 className="text-base font-bold">{t.checklistTitle}</h2>
        </div>
        <ul className="space-y-2">
          {analysis.preservation_advice.map((tip, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm text-slate-800"
            >
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
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
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
        >
          <span>{t.nextBtn}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
