import { Language } from "@/types";

export interface TranslationDict {
  appName: string;
  appTagline: string;
  quickExit: string;
  quickExitHint: string;
  sosBtn: string;
  settings: string;
  zeroStorageTitle: string;
  zeroStorageShort: string;
  zeroStorageDesc: string;
  zeroStorageLimit: string;
  steps: {
    upload: string;
    analyze: string;
    export: string;
  };
  step1: {
    title: string;
    subtitle: string;
    countryLabel: string;
    uploadLabel: string;
    uploadHint: string;
    uploadMax: string;
    removeImage: string;
    messageLabel: string;
    messagePlaceholder: string;
    suspectLabel: string;
    suspectPlaceholder: string;
    dateLabel: string;
    datePlaceholder: string;
    loadDemo: string;
    pasteBtn: string;
    pasteImageBtn: string;
    pasteImageEmpty: string;
    dictateBtn: string;
    dictateStop: string;
    dictateUnsupported: string;
    optionalToggle: string;
    analyzeBtn: string;
    expressBtn: string;
    analyzingBtn: string;
    validationError: string;
  };
  step2: {
    title: string;
    subtitle: string;
    demoBadge: string;
    liveBadge: string;
    fallbackBanner: string;
    aiDisclaimer: string;
    editBtn: string;
    saveEditBtn: string;
    categoryLabel: string;
    severityLabel: string;
    summaryLabel: string;
    legalTitle: string;
    timelineTitle: string;
    checklistTitle: string;
    backBtn: string;
    nextBtn: string;
  };
  step3: {
    title: string;
    subtitle: string;
    downloadPdf: string;
    sharePdf: string;
    generatingPdf: string;
    pdfNote: string;
    sosTitle: string;
    sosSubtitle: string;
    phoneLabel: string;
    emailLabel: string;
    webLabel: string;
    hoursLabel: string;
    directoryLink: string;
    directoryDisclaimer: string;
    backBtn: string;
    clearAllBtn: string;
  };
  settingsModal: {
    title: string;
    desc: string;
    providerLabel: string;
    providerDemo: string;
    providerOpenRouter: string;
    providerGemini: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    modelLabel: string;
    pinLabel: string;
    pinPlaceholder: string;
    pinHint: string;
    trustedContactLabel: string;
    trustedContactPlaceholder: string;
    saveBtn: string;
    closeBtn: string;
    costNote: string;
  };
  emergencyModal: {
    title: string;
    subtitle: string;
    callPolice: string;
    shareLocation: string;
    locating: string;
    locationReady: string;
    locationError: string;
    recordAudio: string;
    stopRecording: string;
    downloadAudio: string;
    shareAudio: string;
    smsTemplate: string;
    pwaLimitationNote: string;
    closeBtn: string;
  };
  pdf: {
    reportTitle: string;
    reportSubtitle: string;
    generatedAt: string;
    jurisdiction: string;
    suspectInfo: string;
    incidentDate: string;
    notProvided: string;
    victimSectionTitle: string;
    victimName: string;
    victimId: string;
    victimContact: string;
    victimNote: string;
    classificationSection: string;
    category: string;
    severity: string;
    summary: string;
    legalSection: string;
    timelineSection: string;
    checklistSection: string;
    evidenceSection: string;
    attachmentLabel: string;
    sha256Label: string;
    footerDisclaimer: string;
  };
}

const SR_BASE: TranslationDict = {
  appName: "Digitalni Svedok",
  appTagline: "Sigurno prikupljanje i pravno pakovanje dokaza digitalnog nasilja",
  quickExit: "BRZI IZLAZ",
  quickExitHint: "ESC ×2",
  sosBtn: "SOS",
  settings: "AI Podešavanja",
  zeroStorageTitle: "Zero-Storage Politika Privatnosti",
  zeroStorageShort: "Zero-Storage • Dokazi ostaju samo u memoriji uređaja",
    zeroStorageDesc:
      "Vaši skrinšotovi i poruke obrađuju se isključivo u memoriji uređaja i nikada se ne čuvaju na serveru ili u bazi podataka.",
    zeroStorageLimit:
      "Napomena: Brzi izlaz briše memoriju aplikacije, ali ne briše sistemsku istoriju pretraživača ni već preuzete fajlove. Za demo koristite fiktivne podatke.",
    steps: {
      upload: "1. Unos dokaza",
      analyze: "2. AI Analiza",
      export: "3. PDF & Pomoć",
    },
    step1: {
      title: "Unos dokaza i izbor države",
      subtitle:
        "Izaberite državu radi mapiranja zakona, otpremite skrinšotove ili nalepite tekst pretnji.",
      countryLabel: "Država (Jurisdikcija)",
      uploadLabel: "Otpremite skrinšotove (maks. 5 slika)",
      uploadHint: "Dodirnite ili prevucite slike ovde (PNG, JPG, WEBP)",
      uploadMax: "Učitano {count}/5 slika",
      removeImage: "Ukloni",
      messageLabel: "Tekst pretnji, poruke ili kontekst događaja",
      messagePlaceholder:
        "Nalepite tekst pretećih poruka, linkove ka objavama ili kratko opišite šta se dogodilo...",
      suspectLabel: "Korisničko ime / URL profila počinioca (opciono)",
      suspectPlaceholder: "npr. https://instagram.com/korisnik ili @ime",
      dateLabel: "Približan datum i vreme (opciono)",
      datePlaceholder: "npr. 18.11.2026. oko 22:30",
      loadDemo: "Učitaj demo primer",
      pasteBtn: "Nalepi tekst",
      pasteImageBtn: "Nalepi skrinšot",
      pasteImageEmpty: "Nema slike u clipboard-u ili je pristup odbijen.",
      dictateBtn: "Diktiraj glasom",
      dictateStop: "Zaustavi diktat",
      dictateUnsupported: "Glasovni unos nije podržan u ovom pretraživaču.",
      optionalToggle: "Detalji počinioca i vreme (automatski ili ručno)",
      analyzeBtn: "Analiziraj dokaze",
      expressBtn: "Brzi izveštaj (1 klik: Analiza + PDF)",
      analyzingBtn: "Analiziram dokaze...",
      validationError:
        "Molimo otpremite bar jedan skrinšot ili unesite tekst poruke za analizu.",
    },
    step2: {
      title: "Pravna analiza i hronologija",
      subtitle:
        "Pregledajte klasifikaciju dela, relevantne članove zakona i forenzičke savete.",
      demoBadge: "Demo režim (bez API poziva)",
      liveBadge: "AI Analiza uživo",
      fallbackBanner:
        "Automatska AI analiza trenutno nije dostupna — prikazan je demonstracioni primer za izabranu državu.",
      aiDisclaimer:
        "Važno: Ovo je preliminarna AI priprema dokaza i ne predstavlja konačnu pravnu kvalifikaciju. Proverite detalje sa pravnikom, SOS organizacijom ili tužilaštvom.",
      editBtn: "Izmeni tekst",
      saveEditBtn: "Sačuvaj izmene",
      categoryLabel: "Prepoznati tip nasilja",
      severityLabel: "Nivo hitnosti",
      summaryLabel: "Sažetak incidenta",
      legalTitle: "Relevantni članovi Krivičnog zakonika",
      timelineTitle: "Izdvojena hronologija i dokazi",
      checklistTitle: "Forenzička ček-lista (pre blokiranja)",
      backBtn: "Nazad na unos",
      nextBtn: "Nastavi na PDF i SOS",
    },
    step3: {
      title: "Zvanični PDF izveštaj i SOS kontakti",
      subtitle:
        "Preuzmite strukturirani dokument za policiju ili tužilaštvo i pronađite lokalnu podršku.",
      downloadPdf: "Preuzmi zvanični PDF izveštaj",
      sharePdf: "Pošalji bezbedno (Share)",
      generatingPdf: "Generišem PDF...",
      pdfNote:
        "Polja za vaše lične podatke u PDF-u su ostavljena prazna radi privatnosti — možete ih popuniti ručno pre predaje policiji.",
      sosTitle: "Verifikovani kontakti za pomoć i prijavu",
      sosSubtitle: "Organizacije i institucije za izabranu državu:",
      phoneLabel: "Telefon",
      emailLabel: "Email",
      webLabel: "Veb-sajt",
      hoursLabel: "Radno vreme",
      directoryLink: "Sve organizacije u regionu (SheSafe Online baza — 388 aktera)",
      directoryDisclaimer:
        "Ovo je informativni direktorijum, a ne hitna služba. U slučaju neposredne opasnosti pozovite lokalnu policiju.",
      backBtn: "Nazad na analizu",
      clearAllBtn: "Obriši sve iz memorije",
    },
    settingsModal: {
      title: "Podešavanje AI modela (0 € troškova)",
      desc: "Aplikacija podrazumevano radi u Demo režimu. Za živu analizu slika možete uneti besplatan OpenRouter ili Google AI Studio ključ (ostaje samo u memoriji ove sesije).",
      providerLabel: "AI Provajder",
      providerDemo: "Demo režim (Ugrađeni primer, 0 €)",
      providerOpenRouter: "OpenRouter (:free Vision modeli)",
      providerGemini: "Google AI Studio (Gemini 2.5 Flash Free)",
      apiKeyLabel: "API Ključ (opciono, ne čuva se trajno)",
      apiKeyPlaceholder: "Nalepite sk-or-v1-... ili AIza...",
      modelLabel: "Model ID (OpenRouter)",
      pinLabel: "Tajni PIN za otključavanje digitrona (4+ cifara)",
      pinPlaceholder: "Podrazumevano: 1919",
      pinHint: "Unos pogrešnog PIN-a na digitronu (=) automatski briše sve podatke. Prečica 112= poziva hitnu pomoć.",
      trustedContactLabel: "Broj osobe od poverenja za SOS SMS (opciono)",
      trustedContactPlaceholder: "npr. +381601234567",
      saveBtn: "Sačuvaj za sesiju",
      closeBtn: "Zatvori",
      costNote:
        "Preporučeni besplatni Vision modeli: google/gemma-3-27b-it:free ili qwen/qwen2.5-vl-72b-instruct:free.",
    },
    emergencyModal: {
      title: "Hitna SOS Pomoć i Lokacija",
      subtitle: "Brze akcije u slučaju neposredne fizičke opasnosti.",
      callPolice: "Pozovi Policiju",
      shareLocation: "Pošalji GPS lokaciju (SMS)",
      locating: "Pronalazim GPS lokaciju...",
      locationReady: "Lokacija spremna — otvori SMS",
      locationError: "Nije moguće pristupiti GPS lokaciji.",
      recordAudio: "Snimi audio dokaz (uživo)",
      stopRecording: "Zaustavi snimanje",
      downloadAudio: "Preuzmi audio snimak",
      shareAudio: "Pošalji audio (Share)",
      smsTemplate: "SOS! Hitno mi je potrebna pomoc. Moja lokacija",
      pwaLimitationNote:
        "Napomena: Zbog bezbednosnih pravila telefona (iOS/Android), web aplikacija zahteva vaš dodir za poziv/SMS i ne može snimati dok je ekran zaključan.",
      closeBtn: "Zatvori",
    },
    pdf: {
      reportTitle: "DOKAZNI IZVEŠTAJ — DIGITALNO NASILJE",
      reportSubtitle: "Pripremni dokument za policiju i tužilaštvo",
      generatedAt: "Datum generisanja",
      jurisdiction: "Jurisdikcija",
      suspectInfo: "Podaci o profilu počinioca",
      incidentDate: "Vreme incidenta",
      notProvided: "Nije navedeno",
      victimSectionTitle: "PODACI O PODNOSIOCU PRIJAVE (Popuniti ručno)",
      victimName: "Ime i prezime: ___________________________________________",
      victimId: "JMBG / Broj lične karte: ___________________________________",
      victimContact: "Kontakt telefon / Adresa: ________________________________",
      victimNote:
        "Napomena: Radi zaštite privatnosti, lični podaci nisu unošeni u aplikaciju.",
      classificationSection: "1. KLASIFIKACIJA I SAŽETAK",
      category: "Kategorija dela",
      severity: "Nivo hitnosti",
      summary: "Sažetak",
      legalSection: "2. RELEVANTNE ZAKONSKE ODREDBE",
      timelineSection: "3. HRONOLOGIJA I IZDVOJENI DOKAZI",
      checklistSection: "4. FORENZIČKA NAPOMENA",
      evidenceSection: "5. PRILOŽENI VIZUELNI DOKAZI (SKRINŠOTOVI)",
      attachmentLabel: "Prilog",
      sha256Label: "SHA-256 digitalni otisak originala",
    footerDisclaimer:
      "Generisano pomoću alata Digitalni Svedok (Zero-Storage). Ovaj dokument služi kao strukturirana priprema dokaza i ne zamenjuje zvaničnu izjavu u policiji/tužilaštvu.",
  },
};

const AL_BASE: TranslationDict = {
    appName: "Dëshmitari Digjital",
    appTagline: "Mbledhja e sigurt dhe strukturimi ligjor i provave të dhunës digjitale",
    quickExit: "DALJE E SHPEJTË",
    quickExitHint: "ESC ×2",
    sosBtn: "SOS",
    settings: "Cilësimet e AI",
    zeroStorageTitle: "Politika e Privatësisë Zero-Storage",
    zeroStorageShort: "Zero-Storage • Provat mbeten vetëm në memorien e pajisjes",
    zeroStorageDesc:
      "Pamjet dhe tekstet tuaja përpunohen vetëm në memorien e pajisjes dhe nuk ruhen kurrë në server apo bazë të dhënash.",
    zeroStorageLimit:
      "Shënim: Dalja e shpejtë fshin memorien e aplikacionit, por nuk fshin historikun e shfletuesit apo skedarët e shkarkuar. Përdorni të dhëna fiktive për demo.",
    steps: {
      upload: "1. Ngarkimi",
      analyze: "2. Analiza AI",
      export: "3. PDF & Ndihmë",
    },
    step1: {
      title: "Ngarkimi i provave dhe zgjedhja e shtetit",
      subtitle:
        "Zgjidhni shtetin për hartëzimin ligjor, ngarkoni pamje ekrani ose ngjitni tekstin e kërcënimeve.",
      countryLabel: "Shteti (Juridiksioni)",
      uploadLabel: "Ngarkoni pamje ekrani (maks. 5 imazhe)",
      uploadHint: "Prekni ose tërhiqni imazhet këtu (PNG, JPG, WEBP)",
      uploadMax: "Ngarkuar {count}/5 imazhe",
      removeImage: "Hiq",
      messageLabel: "Teksti i kërcënimeve, mesazhet ose konteksti",
      messagePlaceholder:
        "Ngjitni tekstin e mesazheve kërcënuese, lidhjet ose përshkruani shkurt çfarë ndodhi...",
      suspectLabel: "Emri i përdoruesit / URL e profilit të autorit (opsionale)",
      suspectPlaceholder: "p.sh. https://instagram.com/perdoruesi ose @emri",
      dateLabel: "Data dhe ora e përafërt (opsionale)",
      datePlaceholder: "p.sh. 18.11.2026 rreth orës 22:30",
      loadDemo: "Ngarko shembullin demo",
      pasteBtn: "Ngjit tekstin",
      pasteImageBtn: "Ngjit pamjen",
      pasteImageEmpty: "Nuk ka imazh në clipboard ose qasja u refuzua.",
      dictateBtn: "Dikto me zë",
      dictateStop: "Ndalo diktimin",
      dictateUnsupported: "Njohja e zërit nuk mbështetet në këtë shfletues.",
      optionalToggle: "Detajet e autorit dhe koha (automatike ose me dorë)",
      analyzeBtn: "Analizo provat",
      expressBtn: "Raport i shpejtë (1 klik: Analiza + PDF)",
      analyzingBtn: "Duke analizuar provat...",
      validationError:
        "Ju lutemi ngarkoni të paktën një pamje ekrani ose shkruani tekstin e mesazhit.",
    },
    step2: {
      title: "Analiza ligjore dhe kronologjia",
      subtitle:
        "Shikoni klasifikimin e veprës, nenet përkatëse të kodit penal dhe këshillat forenzike.",
      demoBadge: "Modaliteti Demo (pa thirrje API)",
      liveBadge: "Analizë AI Live",
      fallbackBanner:
        "Analiza automatike me AI nuk është e disponueshme tani — po shfaqet një shembull demonstrues për shtetin e zgjedhur.",
      aiDisclaimer:
        "E rëndësme: Kjo është përgatitje paraprake me AI dhe nuk përbën vlerësim përfundimtar ligjor. Verifikoni detajet me një jurist ose organizatë SOS.",
      editBtn: "Ndrysho tekstin",
      saveEditBtn: "Ruaj ndryshimet",
      categoryLabel: "Lloji i dhunës së zbuluar",
      severityLabel: "Niveli i urgjencës",
      summaryLabel: "Përmbledhje e incidentit",
      legalTitle: "Nenet përkatëse të Kodit Penal",
      timelineTitle: "Kronologjia dhe provat e nxjerra",
      checklistTitle: "Lista forenzike (para bllokimit)",
      backBtn: "Kthehu te ngarkimi",
      nextBtn: "Vazhdo te PDF dhe SOS",
    },
    step3: {
      title: "Raporti zyrtar PDF dhe kontaktet SOS",
      subtitle:
        "Shkarkoni dokumentin e strukturuar për policinë ose prokurorinë dhe gjeni ndihmë lokale.",
      downloadPdf: "Shkarko Raportin Zyrtar PDF",
      sharePdf: "Dërgo në mënyrë të sigurt (Share)",
      generatingPdf: "Duke gjeneruar PDF...",
      pdfNote:
        "Fushat për të dhënat tuaja personale në PDF janë lënë bosh për privatësi — mund t'i plotësoni me dorë para dorëzimit në polici.",
      sosTitle: "Kontakte të verifikuara për ndihmë dhe raportim",
      sosSubtitle: "Organizatat dhe institucionet për shtetin e zgjedhur:",
      phoneLabel: "Telefoni",
      emailLabel: "Email",
      webLabel: "Uebfaqja",
      hoursLabel: "Orari",
      directoryLink: "Të gjitha organizatat në rajon (Baza SheSafe Online — 388 aktorë)",
      directoryDisclaimer:
        "Ky është një drejtori informues, jo shërbim emergjence. Në rast rreziku të menjëhershëm kontaktoni policinë lokale.",
      backBtn: "Kthehu te analiza",
      clearAllBtn: "Fshi gjithçka nga memoria",
    },
    settingsModal: {
      title: "Cilësimet e modelit AI (Kosto 0 €)",
      desc: "Aplikacioni funksionon si parazgjedhje në modalitetin Demo. Për analizë live të imazheve mund të vendosni një çelës falas të OpenRouter ose Google AI Studio (ruhet vetëm në memorien e sesionit).",
      providerLabel: "Ofruesi AI",
      providerDemo: "Modaliteti Demo (Shembull i integruar, 0 €)",
      providerOpenRouter: "OpenRouter (Modele Vision :free)",
      providerGemini: "Google AI Studio (Gemini 2.5 Flash Free)",
      apiKeyLabel: "Çelësi API (opsionale, nuk ruhet përgjithmonë)",
      apiKeyPlaceholder: "Ngjitni sk-or-v1-... ose AIza...",
      modelLabel: "Model ID (OpenRouter)",
      pinLabel: "Kodi sekret PIN për zhbllokimin e kalkulatorit (4+ shifra)",
      pinPlaceholder: "Parazgjedhur: 1919",
      pinHint: "Vendosja e një PIN-i të gabuar (=) fshin automatikisht të gjitha të dhënat. Shkurtorja 112= thërret emergjencën.",
      trustedContactLabel: "Numri i kontaktit të besuar për SMS SOS (opsionale)",
      trustedContactPlaceholder: "p.sh. +355691234567",
      saveBtn: "Ruaj për sesionin",
      closeBtn: "Mbyll",
      costNote:
        "Modele Vision falas të rekomanduara: google/gemma-3-27b-it:free ose qwen/qwen2.5-vl-72b-instruct:free.",
    },
    emergencyModal: {
      title: "Ndihma Urgjente SOS dhe Vendndodhja",
      subtitle: "Veprime të shpejta në rast rreziku të menjëhershëm fizik.",
      callPolice: "Telefono Policinë",
      shareLocation: "Dërgo vendndodhjen GPS (SMS)",
      locating: "Duke gjetur vendndodhjen GPS...",
      locationReady: "Vendndodhja gati — hap SMS",
      locationError: "Nuk mund të qaset vendndodhja GPS.",
      recordAudio: "Regjistro provë audio (live)",
      stopRecording: "Ndalo regjistrimin",
      downloadAudio: "Shkarko regjistrimin audio",
      shareAudio: "Dërgo audion (Share)",
      smsTemplate: "SOS! Kam nevoje urgjente per ndihme. Vendndodhja ime",
      pwaLimitationNote:
        "Shënim: Për shkak të rregullave të sigurisë së telefonit (iOS/Android), aplikacioni web kërkon prekjen tuaj për thirrje/SMS dhe nuk regjistron me ekran të kyçur.",
      closeBtn: "Mbyll",
    },
    pdf: {
      reportTitle: "RAPORTI I PROVAVE — DHUNA DIGJITALE",
      reportSubtitle: "Dokument përgatitor për policinë dhe prokurorinë",
      generatedAt: "Data e gjenerimit",
      jurisdiction: "Juridiksioni",
      suspectInfo: "Të dhënat e profilit të autorit",
      incidentDate: "Koha e incidentit",
      notProvided: "Nuk është specifikuar",
      victimSectionTitle: "TË DHËNAT E DENONCUESES (Plotësohen me dorë)",
      victimName: "Emri dhe mbiemri: _______________________________________",
      victimId: "Numri personal / ID: ____________________________________",
      victimContact: "Telefoni / Adresa: _______________________________________",
      victimNote:
        "Shënim: Për mbrojtjen e privatësisë, të dhënat personale nuk janë futur në aplikacion.",
      classificationSection: "1. KLASIFIKIMI DHE PËRMBLEDHJA",
      category: "Kategoria e veprës",
      severity: "Niveli i urgjencës",
      summary: "Përmbledhja",
      legalSection: "2. DISPOZITAT LIGJORE PËRKATËSE",
      timelineSection: "3. KRONOLOGJIA DHE PROVAT E NXJERRA",
      checklistSection: "4. SHËNIME FORENZIKE",
      evidenceSection: "5. PROVAT VIZUALE TË BASHKËNGJITURA",
      attachmentLabel: "Shtojca",
      sha256Label: "Gjurma digjitale SHA-256 e origjinalit",
    footerDisclaimer:
      "Gjeneruar me Dëshmitari Digjital (Zero-Storage). Ky dokument shërben si përgatitje e strukturuar e provave dhe nuk zëvendëson deklaratën zyrtare.",
  },
};

const MK_BASE: TranslationDict = {
    appName: "Дигитален Сведок",
    appTagline: "Безбедно собирање и правно пакување докази за дигитално насилство",
    quickExit: "БРЗ ИЗЛЕЗ",
    quickExitHint: "ESC ×2",
    sosBtn: "SOS",
    settings: "AI Поставки",
    zeroStorageTitle: "Zero-Storage Политика за приватност",
    zeroStorageShort: "Zero-Storage • Доказите остануваат само во меморијата на уредот",
    zeroStorageDesc:
      "Вашите слики и пораки се обработуваат исклучиво во меморијата на уредот и никогаш не се зачувуваат на сервер или база на податоци.",
    zeroStorageLimit:
      "Напомена: Брзиот излез ја брише меморијата на апликацијата, но не ја брише историјата на прелистувачот ниту веќе преземените датотеки. Користете фиктивни податоци за демо.",
    steps: {
      upload: "1. Внес на докази",
      analyze: "2. AI Анализа",
      export: "3. PDF и Помош",
    },
    step1: {
      title: "Внес на докази и избор на држава",
      subtitle:
        "Изберете држава за правно мапирање, прикачете слики од екран или внесете текст со закани.",
      countryLabel: "Држава (Јурисдикција)",
      uploadLabel: "Прикачете слики од екран (макс. 5 слики)",
      uploadHint: "Допрете или повлечете слики овде (PNG, JPG, WEBP)",
      uploadMax: "Прикачени {count}/5 слики",
      removeImage: "Отстрани",
      messageLabel: "Текст на закани, пораки или контекст",
      messagePlaceholder:
        "Внесете го текстот на заканувачките пораки, линкови или кратко опишете што се случило...",
      suspectLabel: "Корисничко име / URL на профилот на сторителот (опционално)",
      suspectPlaceholder: "пр. https://instagram.com/korisnik или @ime",
      dateLabel: "Приближен датум и време (опционално)",
      datePlaceholder: "пр. 18.11.2026 околу 22:30",
      loadDemo: "Вчитај демо пример",
      pasteBtn: "Залепи текст",
      pasteImageBtn: "Залепи слика",
      pasteImageEmpty: "Нема слика во clipboard или пристапот е одбиен.",
      dictateBtn: "Диктирај со глас",
      dictateStop: "Стоп диктирање",
      dictateUnsupported: "Гласовниот внес не е поддржан во овој прелистувач.",
      optionalToggle: "Детали за сторителот и време (автоматски или рачно)",
      analyzeBtn: "Анализирај докази",
      expressBtn: "Брз извештај (1 клик: Анализа + PDF)",
      analyzingBtn: "Анализирам докази...",
      validationError:
        "Ве молиме прикачете барем една слика од екран или внесете текст на пораката.",
    },
    step2: {
      title: "Правна анализа и хронологија",
      subtitle:
        "Прегледајте ја класификацијата на делото, релевантните членови од законот и форензичките совети.",
      demoBadge: "Демо режим (без API повик)",
      liveBadge: "AI Анализа во живо",
      fallbackBanner:
        "Автоматската AI анализа моментално не е достапна — прикажан е демонстративен пример за избраната држава.",
      aiDisclaimer:
        "Важно: Ова е прелиминарна AI подготовка на докази и не претставува конечна правна квалификација. Проверете ги деталите со правник или SOS организација.",
      editBtn: "Уреди текст",
      saveEditBtn: "Зачувај промени",
      categoryLabel: "Препознаен тип на насилство",
      severityLabel: "Ниво на итност",
      summaryLabel: "Краток преглед на инцидентот",
      legalTitle: "Релевантни членови од Кривичниот законик",
      timelineTitle: "Издвоена хронологија и докази",
      checklistTitle: "Форензичка чек-листа (пред блокирање)",
      backBtn: "Назад кон внес",
      nextBtn: "Продолжи кон PDF и SOS",
    },
    step3: {
      title: "Официјален PDF извештај и SOS контакти",
      subtitle:
        "Преземете структуриран документ за полиција или обвинителство и пронајдете локална поддршка.",
      downloadPdf: "Преземи официјален PDF извештај",
      sharePdf: "Испрати безбедно (Share)",
      generatingPdf: "Генерирам PDF...",
      pdfNote:
        "Полињата за вашите лични податоци во PDF се оставени празни заради приватност — можете да ги пополните рачно пред предавање.",
      sosTitle: "Верификувани контакти за помош и пријавување",
      sosSubtitle: "Организации и институции за избраната држава:",
      phoneLabel: "Телефон",
      emailLabel: "Е-пошта",
      webLabel: "Веб-страница",
      hoursLabel: "Работно време",
      directoryLink: "Сите организации во регионот (SheSafe Online база — 388 актери)",
      directoryDisclaimer:
        "Ова е информативен директориум, а не итна служба. Во случај на непосредна опасност повикајте локална полиција.",
      backBtn: "Назад кон анализа",
      clearAllBtn: "Избриши сè од меморија",
    },
    settingsModal: {
      title: "Поставки на AI моделот (0 € трошоци)",
      desc: "Апликацијата стандардно работи во Демо режим. За анализа во живо можете да внесете бесплатен OpenRouter или Google AI Studio клуч (останува само во меморијата на сесијата).",
      providerLabel: "AI Провајдер",
      providerDemo: "Демо режим (Вграден пример, 0 €)",
      providerOpenRouter: "OpenRouter (:free Vision модели)",
      providerGemini: "Google AI Studio (Gemini 2.5 Flash Free)",
      apiKeyLabel: "API Клуч (опционално, не се зачувува трајно)",
      apiKeyPlaceholder: "Внесете sk-or-v1-... или AIza...",
      modelLabel: "Model ID (OpenRouter)",
      pinLabel: "Таен PIN за отклучување на калкулаторот (4+ цифри)",
      pinPlaceholder: "Стандардно: 1919",
      pinHint: "Внесувањето погрешен PIN (=) автоматски ги брише сите податоци. Кратенка 112= повикува итна помош.",
      trustedContactLabel: "Број на доверливо лице за SOS SMS (опционално)",
      trustedContactPlaceholder: "пр. +38970123456",
      saveBtn: "Зачувај за сесијата",
      closeBtn: "Затвори",
      costNote:
        "Препорачани бесплатни Vision модели: google/gemma-3-27b-it:free или qwen/qwen2.5-vl-72b-instruct:free.",
    },
    emergencyModal: {
      title: "Итна SOS Помош и Локација",
      subtitle: "Брзи акции во случај на непосредна физичка опасност.",
      callPolice: "Повикај Полиција",
      shareLocation: "Испрати GPS локација (SMS)",
      locating: "Ја одредувам GPS локацијата...",
      locationReady: "Локацијата е подготвена — отвори SMS",
      locationError: "Не може да се пристапи до GPS локацијата.",
      recordAudio: "Сними аудио доказ (во живо)",
      stopRecording: "Запри снимање",
      downloadAudio: "Преземи аудио снимка",
      shareAudio: "Испрати аудио (Share)",
      smsTemplate: "SOS! Itno mi e potrebna pomos. Mojata lokacija",
      pwaLimitationNote:
        "Напомена: Поради безбедносните правила на телефонот (iOS/Android), веб-апликацијата бара ваш допир за повик/SMS и не може да снима при заклучен екран.",
      closeBtn: "Затвори",
    },
    pdf: {
      reportTitle: "ИЗВЕШТАЈ СО ДОКАЗИ — ДИГИТАЛНО НАСИЛСТВО",
      reportSubtitle: "Подготвителен документ за полиција и обвинителство",
      generatedAt: "Датум на генерирање",
      jurisdiction: "Јурисдикција",
      suspectInfo: "Податоци за профилот на сторителот",
      incidentDate: "Време на инцидентот",
      notProvided: "Не е наведено",
      victimSectionTitle: "ПОДАТОЦИ ЗА ПОДНОСИТЕЛОТ (Пополнете рачно)",
      victimName: "Име и презиме: ___________________________________________",
      victimId: "ЕМБГ / Број на лична карта: ________________________________",
      victimContact: "Контакт телефон / Адреса: ________________________________",
      victimNote:
        "Напомена: Заради заштита на приватноста, личните податоци не се внесуваат во апликацијата.",
      classificationSection: "1. КЛАСИФИКАЦИЈА И ПРЕГЛЕД",
      category: "Категорија на делото",
      severity: "Ниво на итност",
      summary: "Краток преглед",
      legalSection: "2. РЕЛЕВАНТНИ ЗАКОНСКИ ОДРЕДБИ",
      timelineSection: "3. ХРОНОЛОГИЈА И ИЗДВОЕНИ ДОКАЗИ",
      checklistSection: "4. ФОРЕНЗИЧКА НАПОМЕНА",
      evidenceSection: "5. ПРИЛОЖЕНИ ВИЗУЕЛНИ ДОКАЗИ",
      attachmentLabel: "Прилог",
      sha256Label: "SHA-256 дигитален отпечаток на оригиналот",
      footerDisclaimer:
        "Генерирано со Дигитален Сведок (Zero-Storage). Овој документ служи како структурирана подготовка на докази и не ја заменува официјалната изјава.",
  },
};

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  SR: SR_BASE,
  BS: {
    ...SR_BASE,
    appName: "Digitalni Svjedok",
    settings: "AI Postavke",
    zeroStorageShort: "Zero-Storage • Dokazi ostaju samo u memoriji uređaja",
    zeroStorageDesc:
      "Vaši snimci ekrana i poruke obrađuju se isključivo u memoriji uređaja i nikada se ne čuvaju na serveru ili u bazi podataka.",
    step1: {
      ...SR_BASE.step1,
      title: "Unos dokaza",
      subtitle:
        "Otpremite snimke ekrana ili nalijepite tekst prijetnji. Država se pamti automatski.",
      uploadLabel: "Otpremite snimke ekrana (maks. 5 slika)",
      messageLabel: "Tekst prijetnji, poruke ili kontekst događaja",
      messagePlaceholder:
        "Nalijepite tekst prijetećih poruka, linkove ka objavama ili kratko opišite šta se dogodilo...",
      suspectPlaceholder: "npr. https://instagram.com/korisnik ili @ime",
      loadDemo: "Učitaj demo primjer",
      pasteBtn: "Nalijepi tekst",
      pasteImageBtn: "Nalijepi snimak",
      pasteImageEmpty: "Nema slike u clipboardu ili je pristup odbijen.",
      optionalToggle: "Detalji počinioca i vrijeme (automatski ili ručno)",
      expressBtn: "Brzi izvještaj (1 klik: Analiza + PDF)",
    },
    step2: {
      ...SR_BASE.step2,
      subtitle:
        "Pregledajte klasifikaciju djela, relevantne članove zakona i forenzičke savjete.",
      demoBadge: "Demo režim (bez API poziva)",
      fallbackBanner:
        "Automatska AI analiza trenutno nije dostupna — prikazan je demonstracioni primjer za izabranu državu.",
      legalTitle: "Relevantni članovi Krivičnog zakona",
      nextBtn: "Nastavi na PDF i SOS",
    },
    step3: {
      ...SR_BASE.step3,
      title: "Zvanični PDF izvještaj i SOS kontakti",
      downloadPdf: "Preuzmi zvanični PDF izvještaj",
      sharePdf: "Pošalji sigurno (Share)",
      sosSubtitle: "Organizacije i institucije za izabranu državu:",
    },
    pdf: {
      ...SR_BASE.pdf,
      reportTitle: "DOKAZNI IZVJEŠTAJ — DIGITALNO NASILJE",
      reportSubtitle: "Pripremni dokument za policiju i tužilaštvo",
    },
  },
  HR: {
    ...SR_BASE,
    appName: "Digitalni Svjedok",
    appTagline: "Sigurno prikupljanje i pravno pakiranje dokaza digitalnog nasilja",
    settings: "AI Postavke",
    zeroStorageTitle: "Zero-Storage Politika Privatnosti",
    zeroStorageShort: "Zero-Storage • Dokazi ostaju samo u memoriji uređaja",
    zeroStorageDesc:
      "Vaše snimke zaslona i poruke obrađuju se isključivo u memoriji uređaja i nikada se ne pohranjuju na poslužitelju ili u bazi podataka.",
    zeroStorageLimit:
      "Napomena: Brzi izlaz briše memoriju aplikacije, ali ne briše povijest preglednika ni već preuzete datoteke. Za demo koristite fiktivne podatke.",
    step1: {
      ...SR_BASE.step1,
      title: "Unos dokaza",
      subtitle:
        "Prenesite snimke zaslona ili zalijepite tekst prijetnji. Država se pamti automatski.",
      countryLabel: "Država (Jurisdikcija)",
      uploadLabel: "Prenesite snimke zaslona (maks. 5 slika)",
      uploadHint: "Dodirnite ili povucite slike ovdje (PNG, JPG, WEBP)",
      uploadMax: "Učitano {count}/5 slika",
      messageLabel: "Tekst prijetnji, poruke ili kontekst događaja",
      messagePlaceholder:
        "Zalijepite tekst prijetećih poruka, poveznice na objave ili kratko opišite što se dogodilo...",
      suspectLabel: "Korisničko ime / URL profila počinitelja (neobvezno)",
      dateLabel: "Približan datum i vrijeme (neobvezno)",
      loadDemo: "Učitaj demo primjer",
      pasteBtn: "Zalijepi tekst",
      pasteImageBtn: "Zalijepi snimku",
      pasteImageEmpty: "Nema slike u međuspremniku ili je pristup odbijen.",
      optionalToggle: "Detalji počinitelja i vrijeme (automatski ili ručno)",
      expressBtn: "Brzo izvješće (1 klik: Analiza + PDF)",
      validationError:
        "Molimo prenesite barem jednu snimku zaslona ili unesite tekst poruke za analizu.",
    },
    step2: {
      ...SR_BASE.step2,
      subtitle:
        "Pregledajte klasifikaciju djela, relevantne članke zakona i forenzičke savjete.",
      fallbackBanner:
        "Automatska AI analiza trenutačno nije dostupna — prikazan je demonstracijski primjer za odabranu državu.",
      aiDisclaimer:
        "Važno: Ovo je preliminarna AI priprema dokaza i ne predstavlja konačnu pravnu kvalifikaciju. Provjerite detalje s odvjetnikom, SOS organizacijom ili državnim odvjetništvom.",
      legalTitle: "Relevantni članci Kaznenog zakona",
      checklistTitle: "Forenzička provjera (prije blokiranja)",
      saveEditBtn: "Spremi izmjene",
      nextBtn: "Nastavi na PDF i SOS",
    },
    step3: {
      ...SR_BASE.step3,
      title: "Službeno PDF izvješće i SOS kontakti",
      subtitle:
        "Preuzmite strukturirani dokument za policiju ili državno odvjetništvo i pronađite lokalnu podršku.",
      downloadPdf: "Preuzmi službeno PDF izvješće",
      sharePdf: "Pošalji sigurno (Share)",
      pdfNote:
        "Polja za vaše osobne podatke u PDF-u su ostavljena prazna radi privatnosti — možete ih ispuniti ručno prije predaje policiji.",
      sosTitle: "Provjereni kontakti za pomoć i prijavu",
      sosSubtitle: "Organizacije i institucije za odabranu državu:",
      clearAllBtn: "Obriši sve iz memorije",
    },
    pdf: {
      ...SR_BASE.pdf,
      reportTitle: "DOKAZNO IZVJEŠĆE — DIGITALNO NASILJE",
      reportSubtitle: "Pripremni dokument za policiju i državno odvjetništvo",
      victimSectionTitle: "PODACI O PODNOSITELJU PRIJAVE (Ispuniti ručno)",
      victimId: "OIB / Broj osobne iskaznice: ________________________________",
      victimNote:
        "Napomena: Radi zaštite privatnosti, osobni podaci nisu unošeni u aplikaciju.",
      evidenceSection: "5. PRILOŽENI VIZUALNI DOKAZI (SNIMKE ZASLONA)",
      footerDisclaimer:
        "Generirano pomoću alata Digitalni Svjedok (Zero-Storage). Ovaj dokument služi kao strukturirana priprema dokaza i ne zamjenjuje službenu izjavu u policiji.",
    },
  },
  ME: {
    ...SR_BASE,
    appName: "Digitalni Svjedok",
    appTagline: "Bezbjedno prikupljanje i pravno pakovanje dokaza digitalnog nasilja",
    zeroStorageShort: "Zero-Storage • Dokazi ostaju samo u memoriji uređaja",
    zeroStorageDesc:
      "Vaši snimci ekrana i poruke obrađuju se isključivo u memoriji uređaja i nikada se ne čuvaju na serveru ili u bazi podataka.",
    step1: {
      ...SR_BASE.step1,
      title: "Unos dokaza",
      subtitle:
        "Otpremite snimke ekrana ili nalijepite tekst prijetnji. Država se pamti automatski.",
      uploadLabel: "Otpremite snimke ekrana (maks. 5 slika)",
      messageLabel: "Tekst prijetnji, poruke ili kontekst događaja",
      messagePlaceholder:
        "Nalijepite tekst prijetećih poruka, linkove ka objavama ili kratko opišite šta se desilo...",
      loadDemo: "Učitaj demo primjer",
      pasteBtn: "Nalijepi tekst",
      pasteImageBtn: "Nalijepi snimak",
      pasteImageEmpty: "Nema slike u clipboardu ili je pristup odbijen.",
      optionalToggle: "Detalji počinioca i vrijeme (automatski ili ručno)",
      expressBtn: "Brzi izvještaj (1 klik: Analiza + PDF)",
    },
    step2: {
      ...SR_BASE.step2,
      subtitle:
        "Pregledajte klasifikaciju djela, relevantne članove zakona i forenzičke savjete.",
      fallbackBanner:
        "Automatska AI analiza trenutno nije dostupna — prikazan je demonstracioni primjer za izabranu državu.",
      legalTitle: "Relevantni članovi Krivičnog zakonika",
    },
    step3: {
      ...SR_BASE.step3,
      title: "Zvanični PDF izvještaj i SOS kontakti",
      downloadPdf: "Preuzmi zvanični PDF izvještaj",
      sharePdf: "Pošalji bezbjedno (Share)",
    },
    pdf: {
      ...SR_BASE.pdf,
      reportTitle: "DOKAZNI IZVJEŠTAJ — DIGITALNO NASILJE",
    },
  },
  AL: AL_BASE,
  MK: MK_BASE,
};
