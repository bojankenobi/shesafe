"use client";

import { useState } from "react";
import { X, Cpu, KeyRound } from "lucide-react";
import { Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { saveCustomPin } from "@/utils/pinAuth";

export type AiProvider = "auto" | "demo" | "openrouter" | "gemini";

export interface AiSettings {
  provider: AiProvider;
  apiKey: string;
  model: string;
}

interface SettingsModalProps {
  language: Language;
  settings: AiSettings;
  onSave: (next: AiSettings) => void;
  onClose: () => void;
}

const FREE_OPENROUTER_MODELS = [
  "google/gemma-3-27b-it:free",
  "qwen/qwen2.5-vl-72b-instruct:free",
  "google/gemma-3-12b-it:free",
];

export function SettingsModal({
  language,
  settings,
  onSave,
  onClose,
}: SettingsModalProps) {
  const t = TRANSLATIONS[language].settingsModal;
  const [provider, setProvider] = useState<AiProvider>(settings.provider);
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [model, setModel] = useState(settings.model);
  const [newPin, setNewPin] = useState("");
  const [trustedPhone, setTrustedPhone] = useState(() => {
    try {
      return localStorage.getItem("calc_trusted_contact") || "";
    } catch {
      return "";
    }
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{4,}$/.test(newPin.trim())) {
      await saveCustomPin(newPin.trim());
    }
    try {
      const cleanedPhone = trustedPhone.trim();
      if (cleanedPhone) {
        localStorage.setItem("calc_trusted_contact", cleanedPhone);
      } else {
        localStorage.removeItem("calc_trusted_contact");
      }
    } catch {
      // Ignore storage errors
    }
    onSave({ provider, apiKey: apiKey.trim(), model: model.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <Cpu className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold">{t.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-slate-600">{t.desc}</p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t.providerLabel}
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as AiProvider)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            >
              <option value="auto">Auto (Server Key max 2x / Demo)</option>
              <option value="demo">{t.providerDemo}</option>
              <option value="openrouter">{t.providerOpenRouter}</option>
              <option value="gemini">{t.providerGemini}</option>
            </select>
          </div>

          {(provider === "openrouter" || provider === "gemini") && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  {t.apiKeyLabel}
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={t.apiKeyPlaceholder}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              {provider === "openrouter" && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    {t.modelLabel}
                  </label>
                  <input
                    type="text"
                    list="openrouter-free-models"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                  <datalist id="openrouter-free-models">
                    {FREE_OPENROUTER_MODELS.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    {t.costNote}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Custom Calculator PIN */}
          <div className="border-t border-slate-200 pt-3">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <KeyRound className="h-3.5 w-3.5 text-teal-600" />
              <span>{t.pinLabel}</span>
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
              placeholder={t.pinPlaceholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-slate-500">{t.pinHint}</p>
          </div>

          {/* Trusted Contact for SOS SMS */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t.trustedContactLabel}
            </label>
            <input
              type="tel"
              value={trustedPhone}
              onChange={(e) => setTrustedPhone(e.target.value)}
              placeholder={t.trustedContactPlaceholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.closeBtn}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
              {t.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
