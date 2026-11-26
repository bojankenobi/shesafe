"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnalysisResult,
  CountryCode,
  Language,
  UploadedImage,
} from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { DEMO_INPUTS } from "@/data/demoAnalysis";
import { Navbar } from "@/components/Navbar";
import { SafetyBanner } from "@/components/SafetyBanner";
import { StepUpload } from "@/components/StepUpload";
import { StepAnalysis } from "@/components/StepAnalysis";
import { StepExport } from "@/components/StepExport";
import { AiSettings, SettingsModal } from "@/components/SettingsModal";
import { CalculatorMask } from "@/components/CalculatorMask";
import { EmergencyModal } from "@/components/EmergencyModal";
import { generateEvidencePdf } from "@/utils/pdfGenerator";
import { clearPinStorage } from "@/utils/pinAuth";
import { createSyntheticDemoImage } from "@/utils/demoScreenshot";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("BCMS");
  const [country, setCountry] = useState<CountryCode>("SRB");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [suspectHandle, setSuspectHandle] = useState("");
  const [incidentDate, setIncidentDate] = useState("");

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isMasked, setIsMasked] = useState(true);
  const [aiSettings, setAiSettings] = useState<AiSettings>({
    provider: "demo",
    apiKey: "",
    model: "google/gemma-3-27b-it:free",
  });

  const lastEscRef = useRef<number>(0);

  const clearAllMemory = useCallback((wipePin = false) => {
    setImages([]);
    setMessageText("");
    setSuspectHandle("");
    setIncidentDate("");
    setAnalysis(null);
    setAiSettings((prev) => ({ ...prev, apiKey: "" }));
    setStep(1);
    try {
      sessionStorage.clear();
      if (wipePin) {
        localStorage.clear();
        clearPinStorage();
      }
    } catch {
      // Ignore storage access errors in restricted modes
    }
  }, []);

  const handleQuickExit = useCallback(() => {
    clearAllMemory();
    setShowSettings(false);
    setShowEmergency(false);
    setIsMasked(true);
  }, [clearAllMemory]);

  // Register minimal PWA service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Double-ESC Quick Exit listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const now = Date.now();
        if (now - lastEscRef.current < 600) {
          handleQuickExit();
        } else {
          lastEscRef.current = now;
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleQuickExit]);

  const handleLoadDemo = async () => {
    const demo = DEMO_INPUTS[language];
    setMessageText(demo.messageText);
    setSuspectHandle(demo.suspectHandle);
    setIncidentDate(demo.incidentDate);
    if (images.length === 0) {
      const syntheticImg = await createSyntheticDemoImage(language);
      if (syntheticImg) {
        setImages([syntheticImg]);
      }
    }
  };

  const runAnalysisRequest = async (): Promise<AnalysisResult> => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country,
        language,
        images: images.map((img) => img.compressedDataUrl),
        messageText,
        suspectHandle,
        incidentDate,
        provider: aiSettings.provider,
        apiKey: aiSettings.apiKey,
        model: aiSettings.model,
      }),
    });
    return (await res.json()) as AnalysisResult;
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const data = await runAnalysisRequest();
      setAnalysis(data);
      setStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExpressPdf = async () => {
    setIsAnalyzing(true);
    try {
      const data = await runAnalysisRequest();
      setAnalysis(data);
      await generateEvidencePdf({
        language,
        country,
        suspectHandle,
        incidentDate,
        analysis: data,
        images,
      });
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const t = TRANSLATIONS[language];

  if (isMasked) {
    return (
      <CalculatorMask
        onUnlock={() => setIsMasked(false)}
        onWipeAll={() => clearAllMemory(true)}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onQuickExit={handleQuickExit}
        onOpenSettings={() => setShowSettings(true)}
        onOpenEmergency={() => setShowEmergency(true)}
      />

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-5 px-3 py-5 sm:px-6 sm:py-7">
        <SafetyBanner language={language} />

        {/* Stepper */}
        <nav aria-label="Progress" className="grid grid-cols-3 gap-2">
          {[
            { num: 1 as const, label: t.steps.upload },
            { num: 2 as const, label: t.steps.analyze },
            { num: 3 as const, label: t.steps.export },
          ].map((item) => {
            const isActive = step === item.num;
            const isDone = step > item.num;
            return (
              <div
                key={item.num}
                className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-colors sm:text-sm ${
                  isActive
                    ? "border-teal-600 bg-teal-600 text-white shadow-xs"
                    : isDone
                    ? "border-teal-200 bg-teal-50 text-teal-800"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </nav>

        {step === 1 && (
          <StepUpload
            language={language}
            country={country}
            onCountryChange={setCountry}
            images={images}
            onImagesChange={setImages}
            messageText={messageText}
            onMessageTextChange={setMessageText}
            suspectHandle={suspectHandle}
            onSuspectHandleChange={setSuspectHandle}
            incidentDate={incidentDate}
            onIncidentDateChange={setIncidentDate}
            onLoadDemo={handleLoadDemo}
            onAnalyze={handleAnalyze}
            onExpressPdf={handleExpressPdf}
            isAnalyzing={isAnalyzing}
          />
        )}

        {step === 2 && analysis && (
          <StepAnalysis
            language={language}
            analysis={analysis}
            onUpdateAnalysis={setAnalysis}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && analysis && (
          <StepExport
            language={language}
            country={country}
            suspectHandle={suspectHandle}
            incidentDate={incidentDate}
            analysis={analysis}
            images={images}
            onBack={() => setStep(2)}
            onClearAll={clearAllMemory}
          />
        )}
      </main>

      {showSettings && (
        <SettingsModal
          language={language}
          settings={aiSettings}
          onSave={setAiSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showEmergency && (
        <EmergencyModal
          language={language}
          country={country}
          onClose={() => setShowEmergency(false)}
        />
      )}
    </div>
  );
}
