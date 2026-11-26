"use client";

import { useState } from "react";
import { Lock, ChevronDown } from "lucide-react";
import { Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

export function SafetyBanner({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-teal-200/80 bg-teal-50/70 px-3 py-2 text-slate-800">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex min-w-0 items-center gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0 text-teal-700" />
          <span className="truncate text-xs font-medium text-teal-950">
            {t.zeroStorageShort}
          </span>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-teal-700 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="mt-2 border-t border-teal-200/70 pt-2 text-xs leading-relaxed text-slate-700">
          <p>{t.zeroStorageDesc}</p>
          <p className="mt-1 text-[11px] text-slate-600">{t.zeroStorageLimit}</p>
        </div>
      )}
    </div>
  );
}
