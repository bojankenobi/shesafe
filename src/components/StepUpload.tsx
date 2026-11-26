"use client";

import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  Trash2,
  Sparkles,
  Loader2,
  AlertCircle,
  FlaskConical,
  ClipboardPaste,
  ChevronDown,
  Zap,
  Mic,
  Square,
} from "lucide-react";
import { CountryCode, Language, UploadedImage } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COUNTRIES } from "@/data/legalAndSos";
import { processUploadedImage } from "@/utils/imageCompressor";

interface StepUploadProps {
  language: Language;
  country: CountryCode;
  onCountryChange: (c: CountryCode) => void;
  images: UploadedImage[];
  onImagesChange: (imgs: UploadedImage[]) => void;
  messageText: string;
  onMessageTextChange: (val: string) => void;
  suspectHandle: string;
  onSuspectHandleChange: (val: string) => void;
  incidentDate: string;
  onIncidentDateChange: (val: string) => void;
  onLoadDemo: () => void;
  onAnalyze: () => void;
  onExpressPdf: () => void;
  isAnalyzing: boolean;
}

const COUNTRY_ORDER: CountryCode[] = ["SRB", "BIH", "MNE", "HRV", "MKD", "ALB"];

function extractHandleOrUrl(text: string): string | null {
  const urlMatch = text.match(/https?:\/\/[^\s]+/i);
  if (urlMatch) return urlMatch[0];
  const handleMatch = text.match(/@[a-zA-Z0-9._]{2,}/);
  if (handleMatch) return handleMatch[0];
  return null;
}

export function StepUpload({
  language,
  country,
  onCountryChange,
  images,
  onImagesChange,
  messageText,
  onMessageTextChange,
  suspectHandle,
  onSuspectHandleChange,
  incidentDate,
  onIncidentDateChange,
  onLoadDemo,
  onAnalyze,
  onExpressPdf,
  isAnalyzing,
}: StepUploadProps) {
  const t = TRANSLATIONS[language].step1;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const speechLocale: Record<Language, string> = {
    BCMS: "sr-RS",
    AL: "sq-AL",
    MK: "mk-MK",
  };

  const messageRef = useRef(messageText);
  useEffect(() => {
    messageRef.current = messageText;
  }, [messageText]);

  const handleToggleDictation = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onresult: (e: {
          resultIndex?: number;
          results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>;
        }) => void;
        onerror: () => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      };
      webkitSpeechRecognition?: new () => {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onresult: (e: {
          resultIndex?: number;
          results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>;
        }) => void;
        onerror: () => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      };
    };

    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRec) {
      setErrorMsg(t.dictateUnsupported);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = speechLocale[language];
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const startIndex = event.resultIndex ?? 0;
      let transcript = "";
      for (let i = startIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      const trimmed = transcript.trim();
      if (trimmed) {
        const current = messageRef.current;
        const next = current ? `${current}\n${trimmed}` : trimmed;
        messageRef.current = next;
        handleMessageChange(next);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setErrorMsg(null);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg(null);
    const remaining = 5 - images.length;
    if (remaining <= 0) return;

    const selected = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);

    const processed = await Promise.all(selected.map(processUploadedImage));
    const nextImages = [...images, ...processed];
    onImagesChange(nextImages);

    // Auto-fill incident date from screenshot file timestamp if empty
    if (!incidentDate && processed[0]?.capturedAt) {
      onIncidentDateChange(processed[0].capturedAt);
    }
  };

  const handleMessageChange = (val: string) => {
    onMessageTextChange(val);
    // Auto-extract @username or URL from pasted text if suspectHandle is empty
    if (!suspectHandle.trim()) {
      const detected = extractHandleOrUrl(val);
      if (detected) {
        onSuspectHandleChange(detected);
      }
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const combined = messageText ? `${messageText}\n${text}` : text;
        handleMessageChange(combined);
      }
    } catch {
      // Clipboard read permission denied or unsupported
    }
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  const validate = () => {
    if (images.length === 0 && !messageText.trim()) {
      setErrorMsg(t.validationError);
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onAnalyze();
  };

  const handleExpressClick = () => {
    if (validate()) onExpressPdf();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[#E6E1D6] bg-white p-4 shadow-xs sm:space-y-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[#132238] sm:text-xl">
            {t.title}
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setErrorMsg(null);
            onLoadDemo();
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100"
        >
          <FlaskConical className="h-4 w-4" />
          {t.loadDemo}
        </button>
      </div>

      {/* 1-Tap Country Pills */}
      <div>
        <span className="mb-2 block text-sm font-semibold text-[#132238]">
          {t.countryLabel}
        </span>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
          role="radiogroup"
          aria-label={t.countryLabel}
        >
          {COUNTRY_ORDER.map((code) => {
            const active = country === code;
            return (
              <button
                key={code}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onCountryChange(code)}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all ${
                  active
                    ? "border-[#0F766E] bg-[#0F766E]/8 text-[#132238] ring-1 ring-[#0F766E]"
                    : "border-[#E6E1D6] bg-[#FBF9F6] text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="truncate text-xs font-semibold sm:text-sm">
                  {COUNTRIES[code].names[language]}
                </span>
                <span
                  className={`ml-2 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                    active
                      ? "bg-[#0F766E] text-white"
                      : "bg-slate-200/80 text-slate-600"
                  }`}
                >
                  {code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Upload Dropzone (Mobile Gallery Friendly) */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800">
            {t.uploadLabel}
          </label>
          <span className="text-xs font-medium text-slate-500">
            {t.uploadMax.replace("{count}", String(images.length))}
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 text-center transition-colors active:bg-teal-50 ${
            isDragging
              ? "border-teal-600 bg-teal-50"
              : "border-slate-300 bg-slate-50/70 hover:border-teal-500 hover:bg-slate-50"
          }`}
        >
          <UploadCloud className="mb-1.5 h-8 w-8 text-teal-600" />
          <p className="text-sm font-medium text-slate-700">{t.uploadHint}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.compressedDataUrl}
                  alt={img.name}
                  className="h-20 w-full object-cover sm:h-24"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                  title={t.removeImage}
                  aria-label={t.removeImage}
                  className="absolute top-1 right-1 rounded-md bg-slate-900/80 p-1.5 text-white transition-colors hover:bg-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Textarea + 1-Tap Mobile Paste */}
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <label
            htmlFor="message-text"
            className="text-sm font-semibold text-slate-800"
          >
            {t.messageLabel}
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleDictation}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                isListening
                  ? "bg-red-100 text-red-700 ring-1 ring-red-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isListening ? (
                <>
                  <Square className="h-3 w-3 fill-red-600 text-red-600" />
                  <span>{t.dictateStop}</span>
                </>
              ) : (
                <>
                  <Mic className="h-3.5 w-3.5 text-teal-600" />
                  <span>{t.dictateBtn}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 active:bg-slate-300"
            >
              <ClipboardPaste className="h-3.5 w-3.5 text-teal-600" />
              <span>{t.pasteBtn}</span>
            </button>
          </div>
        </div>
        <textarea
          id="message-text"
          rows={3}
          value={messageText}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder={t.messagePlaceholder}
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
        />
      </div>

      {/* Collapsible Optional Fields (Auto-filled when possible) */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60">
        <button
          type="button"
          onClick={() => setShowOptional((prev) => !prev)}
          className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700"
        >
          <span>
            {t.optionalToggle}
            {(suspectHandle || incidentDate) && " ✓"}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showOptional ? "rotate-180" : ""
            }`}
          />
        </button>

        {showOptional && (
          <div className="grid gap-3 border-t border-slate-200 p-3.5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="suspect-handle"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                {t.suspectLabel}
              </label>
              <input
                id="suspect-handle"
                type="text"
                value={suspectHandle}
                onChange={(e) => onSuspectHandleChange(e.target.value)}
                placeholder={t.suspectPlaceholder}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="incident-date"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                {t.dateLabel}
              </label>
              <input
                id="incident-date"
                type="text"
                value={incidentDate}
                onChange={(e) => onIncidentDateChange(e.target.value)}
                placeholder={t.datePlaceholder}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Express 1-Click + Standard Analyze */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleExpressClick}
          disabled={isAnalyzing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t.analyzingBtn}</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              <span>{t.expressBtn}</span>
            </>
          )}
        </button>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t.analyzingBtn}</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span>{t.analyzeBtn}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
