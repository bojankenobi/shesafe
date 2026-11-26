"use client";

import { ShieldCheck, LogOut, Settings, PhoneCall } from "lucide-react";
import { Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onQuickExit: () => void;
  onOpenSettings: () => void;
  onOpenEmergency: () => void;
}

const LANGUAGES: Language[] = ["BCMS", "AL", "MK"];

export function Navbar({
  language,
  onLanguageChange,
  onQuickExit,
  onOpenSettings,
  onOpenEmergency,
}: NavbarProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600/20 text-teal-400 ring-1 ring-teal-500/40">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight sm:text-base">
              {t.appName}
            </span>
            <span className="hidden text-[11px] text-slate-300 sm:block">
              {t.appTagline}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div
            className="flex rounded-lg bg-slate-800 p-0.5 ring-1 ring-slate-700"
            role="group"
            aria-label="Language"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  language === lang
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* SOS Emergency */}
          <button
            type="button"
            onClick={onOpenEmergency}
            className="flex h-9 items-center gap-1 rounded-lg bg-amber-500 px-2.5 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-400"
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
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 ring-1 ring-slate-700 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Quick Exit */}
          <button
            type="button"
            onClick={onQuickExit}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-bold tracking-wide text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
          >
            <LogOut className="h-4 w-4" />
            <span>{t.quickExit}</span>
            <span className="hidden rounded bg-red-800/70 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
              {t.quickExitHint}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
