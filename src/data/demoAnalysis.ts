import { AnalysisResult, CountryCode, Language } from "@/types";
import { COUNTRIES } from "./legalAndSos";

export const DEMO_INPUTS: Record<
  Language,
  { messageText: string; suspectHandle: string; incidentDate: string }
> = {
  BCMS: {
    messageText:
      "Ako mi se ne javiš do večeras u 22h i ne obrišeš blokadu, poslaću tvoje privatne fotografije svima na poslu i tvojoj porodici. Imam sve sačuvano.",
    suspectHandle: "https://instagram.com/marko_anon_991 (@marko_anon_991)",
    incidentDate: "18.11.2026. oko 21:15",
  },
  AL: {
    messageText:
      "Nëse nuk më përgjigjesh sonte deri në orën 22:00 dhe nuk ma heq bllokun, do t'i dërgoj fotot e tua private te të gjithë në punë dhe te familja jote. I kam të gjitha të ruajtura.",
    suspectHandle: "https://instagram.com/marko_anon_991 (@marko_anon_991)",
    incidentDate: "18.11.2026 rreth orës 21:15",
  },
  MK: {
    messageText:
      "Ако не ми се јавиш вечерва до 22 часот и не ме одблокираш, ќе ги испратам твоите приватни фотографии до сите на работа и до твоето семејство. Сè имам зачувано.",
    suspectHandle: "https://instagram.com/marko_anon_991 (@marko_anon_991)",
    incidentDate: "18.11.2026 околу 21:15",
  },
};

export function buildDemoAnalysis(
  country: CountryCode,
  language: Language,
  suspectHandle?: string,
  incidentDate?: string,
  messageText?: string
): AnalysisResult {
  const profile = COUNTRIES[country];
  const handle = suspectHandle?.trim() || "@marko_anon_991";
  const dateStr = incidentDate?.trim() || "18.11.2026 21:15";
  const snippet =
    messageText?.trim().slice(0, 140) ||
    DEMO_INPUTS[language].messageText.slice(0, 140);

  if (language === "AL") {
    return {
      violence_category:
        "Shantazh seksual / Kërcënim me publikim të imazheve intime (Sextortion)",
      severity_level: "Kritike",
      severity_code: "critical",
      summary: `Analiza tregon elemente të qarta të shantazhit digjital dhe kërcënimit me shpërndarjen e paautorizuar të materialeve private nga llogaria ${handle}. Sipas ${profile.criminalCodeName.AL}, kjo përbën bazë për kallëzim penal urgjent.`,
      legal_mapping: profile.keyArticles.slice(0, 3).map((art) => ({
        article: art.article,
        title: art.topic,
        relevance: `Përputhet me kërcënimin e drejtpërdrejtë për publikimin e përmbajtjes private me qëllim detyrimin e kontaktit (${profile.names.AL}).`,
      })),
      extracted_evidence: [
        {
          timestamp: dateStr,
          sender: handle,
          summary: `Mesazh kërcënues: "${snippet}${snippet.length >= 140 ? "..." : ""}"`,
        },
        {
          timestamp: dateStr,
          sender: handle,
          summary: "Ultimatum kohor dhe presion psikologjik për heqjen e bllokimit.",
        },
      ],
      preservation_advice: [
        "Mos e fshini bisedën dhe mos e bllokoni profilin para se të kopjoni URL-në e saktë të profilit të autorit.",
        "Bëni pamje ekrani ku duken qartë data, ora, emri i përdoruesit dhe URL-ja ose ID-ja e llogarisë.",
        "Ruani skedarët origjinalë të imazheve/videove në një pajisje të sigurt ose cloud privat për verifikim forenzik.",
      ],
      is_demo: true,
      model_used: "Demo Mode (0 €)",
    };
  }

  if (language === "MK") {
    return {
      violence_category:
        "Сексуална изнуда / Закана со објавување интимни снимки (Sextortion)",
      severity_level: "Критично",
      severity_code: "critical",
      summary: `Анализата покажува јасни елементи на дигитална уцена и закана со неовластено споделување приватни материјали од профилот ${handle}. Според ${profile.criminalCodeName.MK}, ова претставува основ за итна кривична пријава.`,
      legal_mapping: profile.keyArticles.slice(0, 3).map((art) => ({
        article: art.article,
        title: art.topic,
        relevance: `Се совпаѓа со директната закана за објавување приватна содржина со цел принуда (${profile.names.MK}).`,
      })),
      extracted_evidence: [
        {
          timestamp: dateStr,
          sender: handle,
          summary: `Заканувачка порака: „${snippet}${snippet.length >= 140 ? "..." : ""}“`,
        },
        {
          timestamp: dateStr,
          sender: handle,
          summary: "Поставен временски ултиматум и притисок врз жртвата.",
        },
      ],
      preservation_advice: [
        "Не ја бришете преписката и не го блокирајте профилот пред да го копирате точниот URL линк на профилот.",
        "Направете слики од екран каде јасно се гледаат датумот, времето и корисничкото име.",
        "Зачувајте ги оригиналните датотеки без дополнително уредување или сечење.",
      ],
      is_demo: true,
      model_used: "Demo Mode (0 €)",
    };
  }

  return {
    violence_category:
      "Iznuda i pretnja neovlašćenim objavljivanjem privatnih snimaka (Sextortion)",
    severity_level: "Kritično",
    severity_code: "critical",
    summary: `Analiza ukazuje na jasne elemente digitalne ucene i pretnje neovlašćenim deljenjem intimnog sadržaja sa profila ${handle}. Prema ${profile.criminalCodeName.BCMS}, ovo predstavlja osnov za hitnu krivičnu prijavu.`,
    legal_mapping: profile.keyArticles.slice(0, 3).map((art) => ({
      article: art.article,
      title: art.topic,
      relevance: `Odgovara direktnoj pretnji objavljivanjem privatnog sadržaja radi iznuđivanja kontakta (${profile.names.BCMS}).`,
    })),
    extracted_evidence: [
      {
        timestamp: dateStr,
        sender: handle,
        summary: `Preteća poruka: "${snippet}${snippet.length >= 140 ? "..." : ""}"`,
      },
      {
        timestamp: dateStr,
        sender: handle,
        summary: "Postavljen vremenski ultimatum i pritisak za uklanjanje blokade.",
      },
    ],
    preservation_advice: [
      "Ne brišite prepisku i ne blokirajte počinioca pre nego što kopirate tačan URL link njegovog profila (korisničko ime se može promeniti).",
      "Napravite skrinšotove na kojima se jasno vide datum, vreme i identitet profila, bez isecanja ekrana.",
      "Sačuvajte originalne fajlove u memoriji ili na sigurnom mestu radi eventualnog veštačenja metapodataka.",
    ],
    is_demo: true,
    model_used: "Demo Mode (0 €)",
  };
}
