"use client";

import { Lock } from "lucide-react";
import { Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

export function SafetyBanner({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/80 px-4 py-3 text-slate-800">
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
        <div className="text-xs leading-relaxed sm:text-sm">
          <p className="font-semibold text-teal-950">{t.zeroStorageTitle}</p>
          <p className="text-slate-700">{t.zeroStorageDesc}</p>
          <p className="mt-1 text-[11px] text-slate-600">{t.zeroStorageLimit}</p>
        </div>
      </div>
    </div>
  );
}
