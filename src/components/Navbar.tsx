"use client";

import { ShieldCheck, LogOut, Settings, PhoneCall, Globe } from "lucide-react";
import { Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onQuickExit: () => void;
  onOpenSettings: () => void;
  onOpenEmergency: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "SR", label: "SR · Srpski" },
  { code: "BS", label: "BS · Bosanski" },
  { code: "HR", label: "HR · Hrvatski" },
  { code: "ME", label: "ME · Crnogorski" },
  { code: "AL", label: "AL · Shqip" },
  { code: "MK", label: "MK · Македонски" },
];

export function Navbar({
  language,
  onLanguageChange,
  onQuickExit,
  onOpenSettings,
  onOpenEmergency,
}: NavbarProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#132238] text-white shadow-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600/25 text-teal-300 ring-1 ring-teal-500/40 sm:h-9 sm:w-9">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold tracking-tight sm:text-base">
              {t.appName}
            </span>
            <span className="hidden text-[11px] text-slate-300 sm:block">
              {t.appTagline}
            </span>
          </div>
        </div>

        {/* Compact Controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Compact Language Selector */}
          <div className="relative flex items-center rounded-lg bg-slate-800/90 ring-1 ring-slate-700">
            <Globe className="pointer-events-none ml-2 h-3.5 w-3.5 text-teal-300" />
            <select
              aria-label="Language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="cursor-pointer appearance-none bg-transparent py-1.5 pr-5 pl-1.5 text-xs font-semibold text-white focus:outline-none"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option
                  key={opt.code}
                  value={opt.code}
                  className="bg-slate-900 text-white"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 text-[10px] text-slate-400">
              ▾
            </span>
          </div>

          {/* SOS Emergency */}
          <button
            type="button"
            onClick={onOpenEmergency}
            className="hidden h-8 items-center gap-1 rounded-lg bg-amber-500 px-2.5 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-400 sm:flex sm:h-9"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{t.sosBtn}</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            title={t.settings}
            aria-label={t.settings}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 ring-1 ring-slate-700 transition-colors hover:bg-slate-700 hover:text-white sm:h-9 sm:w-9"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Quick Exit */}
          <button
            type="button"
            onClick={onQuickExit}
            className="hidden h-9 items-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-bold tracking-wide text-white shadow-sm transition-colors hover:bg-red-700 sm:flex"
          >
            <LogOut className="h-4 w-4" />
            <span>{t.quickExit}</span>
            <span className="rounded bg-red-800/70 px-1.5 py-0.5 text-[10px] font-medium">
              {t.quickExitHint}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
