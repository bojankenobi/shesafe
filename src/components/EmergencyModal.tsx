"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  PhoneCall,
  MapPin,
  Mic,
  Square,
  Download,
  AlertTriangle,
} from "lucide-react";
import { CountryCode, Language } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

interface EmergencyModalProps {
  language: Language;
  country: CountryCode;
  onClose: () => void;
}

const POLICE_NUMBERS: Record<CountryCode, string> = {
  SRB: "192",
  BIH: "122",
  MNE: "122",
  HRV: "192",
  MKD: "192",
  ALB: "129",
};

export function EmergencyModal({
  language,
  country,
  onClose,
}: EmergencyModalProps) {
  const t = TRANSLATIONS[language].emergencyModal;
  const policeNum = POLICE_NUMBERS[country];

  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [smsHref, setSmsHref] = useState<string>("");

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus("error");
      return;
    }
    setLocStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const msg = `SOS! Hitno mi je potrebna pomoc. Moja trenutna lokacija: ${mapsLink}`;
        setSmsHref(`sms:?body=${encodeURIComponent(msg)}`);
        setLocStatus("ready");
      },
      () => {
        setLocStatus("error");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleToggleRecording = async () => {
    if (isRecording && recorderRef.current) {
      recorderRef.current.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      // Microphone permission denied
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-base font-bold">{t.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-xs text-slate-600">{t.subtitle}</p>

        <div className="space-y-3">
          {/* 1-Tap Call Police */}
          <a
            href={`tel:${policeNum}`}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-700"
          >
            <PhoneCall className="h-5 w-5" />
            <span>
              {t.callPolice} ({policeNum})
            </span>
          </a>

          {/* 1-Tap GPS Location -> SMS */}
          {locStatus !== "ready" ? (
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locStatus === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <MapPin className="h-4 w-4 text-teal-400" />
              <span>{locStatus === "loading" ? t.locating : t.shareLocation}</span>
            </button>
          ) : (
            <a
              href={smsHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-teal-700"
            >
              <MapPin className="h-4 w-4" />
              <span>{t.locationReady}</span>
            </a>
          )}

          {locStatus === "error" && (
            <p className="text-center text-xs text-red-600">{t.locationError}</p>
          )}

          {/* Live Audio Evidence Recorder */}
          <button
            type="button"
            onClick={handleToggleRecording}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              isRecording
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            }`}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4 fill-red-600 text-red-600" />
                <span>{t.stopRecording}</span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 text-teal-600" />
                <span>{t.recordAudio}</span>
              </>
            )}
          </button>

          {audioUrl && (
            <a
              href={audioUrl}
              download="evidence-audio.webm"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 ring-1 ring-teal-200 hover:bg-teal-100"
            >
              <Download className="h-4 w-4" />
              <span>{t.downloadAudio}</span>
            </a>
          )}
        </div>

        <p className="mt-4 rounded-lg bg-slate-50 p-2.5 text-[11px] leading-relaxed text-slate-600">
          {t.pwaLimitationNote}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          {t.closeBtn}
        </button>
      </div>
    </div>
  );
}
