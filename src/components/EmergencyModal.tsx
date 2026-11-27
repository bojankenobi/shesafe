"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  PhoneCall,
  MapPin,
  Mic,
  Square,
  Download,
  Share2,
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

function formatDuration(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

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
  const [elapsedSec, setElapsedSec] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioSha256, setAudioSha256] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
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
        const { latitude, longitude, accuracy } = pos.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const accText = accuracy ? ` (±${Math.round(accuracy)}m)` : "";
        const msg = `${t.smsTemplate}${accText}: ${mapsLink}`;

        let recipient = "";
        try {
          recipient = (localStorage.getItem("calc_trusted_contact") || "").replace(
            /[^\d+]/g,
            ""
          );
        } catch {
          // Ignore storage errors
        }

        setSmsHref(`sms:${recipient}?body=${encodeURIComponent(msg)}`);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredMime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "";

      const recorder = preferredMime
        ? new MediaRecorder(stream, { mimeType: preferredMime })
        : new MediaRecorder(stream);

      const ext = preferredMime.includes("mp4") ? "m4a" : "webm";
      const outMime = preferredMime || "audio/webm";
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: outMime });
        const file = new File([blob], `evidence-audio.${ext}`, {
          type: outMime,
        });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        setAudioFile(file);

        try {
          if (crypto?.subtle) {
            const buf = await blob.arrayBuffer();
            const digest = await crypto.subtle.digest("SHA-256", buf);
            const hex = Array.from(new Uint8Array(digest))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");
            setAudioSha256(hex);
          }
        } catch {
          setAudioSha256(null);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      setElapsedSec(0);
      recorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } catch {
      // Microphone permission denied
    }
  };

  const handleShareAudio = async () => {
    if (!audioFile || !navigator.share) return;
    try {
      if (navigator.canShare && navigator.canShare({ files: [audioFile] })) {
        await navigator.share({ files: [audioFile] });
      }
    } catch {
      // User cancelled share
    }
  };

  const canShareAudio =
    typeof navigator !== "undefined" &&
    "share" in navigator &&
    audioFile !== null;

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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#132238] px-4 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <MapPin className="h-4 w-4 text-teal-400" />
              <span>{locStatus === "loading" ? t.locating : t.shareLocation}</span>
            </button>
          ) : (
            <a
              href={smsHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3.5 text-sm font-bold text-white hover:bg-teal-700"
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
                <span>
                  {t.stopRecording} ({formatDuration(elapsedSec)})
                </span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 text-teal-600" />
                <span>{t.recordAudio}</span>
              </>
            )}
          </button>

          {audioUrl && audioFile && (
            <div className="space-y-2 rounded-xl border border-teal-200 bg-teal-50/70 p-3">
              <audio controls src={audioUrl} className="h-9 w-full" />
              {audioSha256 && (
                <p className="truncate font-mono text-[10px] text-slate-600">
                  SHA-256: {audioSha256}
                </p>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href={audioUrl}
                  download={audioFile.name}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-teal-800 ring-1 ring-teal-200 hover:bg-teal-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{t.downloadAudio}</span>
                </a>
                {canShareAudio && (
                  <button
                    type="button"
                    onClick={handleShareAudio}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#132238] px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    <Share2 className="h-3.5 w-3.5 text-teal-300" />
                    <span>{t.shareAudio}</span>
                  </button>
                )}
              </div>
            </div>
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
