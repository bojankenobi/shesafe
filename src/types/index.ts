export type Language = "SR" | "BS" | "HR" | "ME" | "AL" | "MK";

export type CountryCode = "SRB" | "BIH" | "MNE" | "HRV" | "MKD" | "ALB";

export interface UploadedImage {
  id: string;
  name: string;
  originalDataUrl: string;
  compressedDataUrl: string;
  sizeBytes: number;
  sha256?: string;
  capturedAt?: string;
}

export interface TimelineItem {
  timestamp: string;
  sender: string;
  summary: string;
}

export interface LegalReference {
  article: string;
  title: string;
  relevance: string;
}

export interface AnalysisResult {
  violence_category: string;
  severity_level: string;
  severity_code: "critical" | "high" | "moderate";
  summary: string;
  legal_mapping: LegalReference[];
  extracted_evidence: TimelineItem[];
  preservation_advice: string[];
  is_demo?: boolean;
  is_fallback?: boolean;
  model_used?: string;
}

export interface EvidenceSubmission {
  country: CountryCode;
  language: Language;
  images: UploadedImage[];
  messageText: string;
  suspectHandle: string;
  incidentDate: string;
}

export interface SosContact {
  name: string;
  role: Record<Language, string>;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
}

export interface CountryLegalProfile {
  code: CountryCode;
  names: Record<Language, string>;
  criminalCodeName: Record<Language, string>;
  keyArticles: {
    article: string;
    topic: string;
  }[];
  contacts: SosContact[];
}
