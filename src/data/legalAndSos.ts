import { CountryCode, CountryLegalProfile, Language } from "@/types";

function loc(
  sr: string,
  al: string,
  mk: string,
  overrides?: Partial<Record<Language, string>>
): Record<Language, string> {
  return {
    SR: sr,
    BS: overrides?.BS ?? sr,
    HR: overrides?.HR ?? sr,
    ME: overrides?.ME ?? sr,
    AL: al,
    MK: mk,
  };
}

export const COUNTRIES: Record<CountryCode, CountryLegalProfile> = {
  SRB: {
    code: "SRB",
    names: loc("Srbija", "Serbia", "Србија"),
    criminalCodeName: loc(
      "Krivični zakonik Republike Srbije",
      "Kodi Penal i Republikës së Serbisë",
      "Кривичен законик на Република Србија",
      { HR: "Kazneni zakonik Republike Srbije" }
    ),
    keyArticles: [
      { article: "Član 138a", topic: "Proganjanje (uhođenje putem interneta)" },
      { article: "Član 138", topic: "Ugrožavanje sigurnosti (pretnje napadom)" },
      {
        article: "Član 145",
        topic:
          "Neovlašćeno objavljivanje i prikazivanje tuđeg spisa, portreta i snimka",
      },
      { article: "Član 214", topic: "Iznuda (ucena / sextortion)" },
    ],
    contacts: [
      {
        name: "ASTRA — Akcija protiv trgovine ljudima i eksploatacije",
        role: loc(
          "SOS podrška i pravno savetovanje za žrtve nasilja i digitalne eksploatacije",
          "Mbështetje SOS dhe këshillim ligjor",
          "SOS поддршка и правно советување",
          {
            BS: "SOS podrška i pravno savjetovanje za žrtve nasilja",
            HR: "SOS podrška i pravno savjetovanje za žrtve nasilja",
            ME: "SOS podrška i pravno savjetovanje za žrtve nasilja",
          }
        ),
        phone: "+381 11 785 0000",
        email: "sos@astra.rs",
        website: "https://astra.rs",
      },
      {
        name: "Autonomni ženski centar (AŽC)",
        role: loc(
          "Besplatna pravna i psihološka podrška ženama",
          "Mbështetje juridike dhe psikologjike falas për gratë",
          "Бесплатна правна и психолошка поддршка за жени"
        ),
        phone: "0800 100 007",
        website: "https://www.womenngo.org.rs",
      },
      {
        name: "Posebno tužilaštvo za visokotehnološki kriminal (VTK)",
        role: loc(
          "Prijava krivičnih dela izvršenih putem interneta",
          "Raportimi i krimeve kibernetike",
          "Пријавување на компјутерски криминал",
          {
            BS: "Prijava krivičnih djela izvršenih putem interneta",
            HR: "Prijava kaznenih djela počinjenih putem interneta",
            ME: "Prijava krivičnih djela izvršenih putem interneta",
          }
        ),
        email: "vtk@beograd.vtk.jt.rs",
        phone: "192 (Policija)",
      },
    ],
  },

  BIH: {
    code: "BIH",
    names: loc("Bosna i Hercegovina", "Bosnja dhe Hercegovina", "Босна и Херцеговина"),
    criminalCodeName: loc(
      "Krivični zakon FBiH / RS / Brčko distrikta",
      "Kodi Penal i Bosnjës dhe Hercegovinës",
      "Кривичен законик на Босна и Херцеговина",
      { HR: "Kazneni zakon FBiH / RS / Brčko distrikta" }
    ),
    keyArticles: [
      { article: "Član 183 KZ FBiH / Član 150 KZ RS", topic: "Ugrožavanje sigurnosti" },
      { article: "Član 144 KZ RS", topic: "Proganjanje" },
      {
        article: "Član 189 KZ FBiH / Član 156 KZ RS",
        topic: "Neovlašteno fotografisanje / snimanje i zloupotreba snimaka",
      },
      { article: "Član 295 KZ FBiH / Član 232 KZ RS", topic: "Iznuda i ucjena" },
    ],
    contacts: [
      {
        name: "SOS Telefon FBiH",
        role: loc(
          "24/7 besplatna SOS linija za žrtve nasilja",
          "Linjë SOS falas 24/7",
          "24/7 бесплатна SOS линија"
        ),
        phone: "1265",
        hours: "24/7",
      },
      {
        name: "SOS Telefon Republika Srpska",
        role: loc(
          "24/7 besplatna SOS linija za žrtve nasilja",
          "Linjë SOS falas 24/7",
          "24/7 бесплатна SOS линија"
        ),
        phone: "1264",
        hours: "24/7",
      },
      {
        name: "Fondacija Udružene žene / Policija",
        role: loc(
          "Pravna pomoć i hitna intervencija policije",
          "Ndihmë ligjore dhe polici",
          "Правна помош и полиција"
        ),
        phone: "122 (Policija)",
        website: "https://unitedwomenbl.org",
      },
      {
        name: "Agencija za ravnopravnost spolova BiH",
        role: loc(
          "Institucionalna podrška i zaštita od nasilja",
          "Mbështetje institucionale dhe mbrojtje",
          "Институционална поддршка и заштита"
        ),
        website: "https://www.arsbih.gov.ba/",
      },
    ],
  },

  MNE: {
    code: "MNE",
    names: loc("Crna Gora", "Mali i Zi", "Црна Гора"),
    criminalCodeName: loc(
      "Krivični zakonik Crne Gore",
      "Kodi Penal i Malit të Zi",
      "Кривичен законик на Црна Гора",
      { HR: "Kazneni zakonik Crne Gore" }
    ),
    keyArticles: [
      { article: "Član 168a", topic: "Proganjanje" },
      { article: "Član 168", topic: "Ugrožavanje sigurnosti" },
      {
        article: "Član 174",
        topic: "Neovlašćeno objavljivanje i prikazivanje tuđeg spisa, portreta i snimka",
      },
      { article: "Član 250 / 251", topic: "Iznuda i ucjena" },
    ],
    contacts: [
      {
        name: "Nacionalna SOS linija za žrtve nasilja",
        role: loc(
          "Besplatna, anonimna i dostupna 24/7 podrška",
          "Mbështetje falas dhe anonime 24/7",
          "Бесплатна и анонимна поддршка 24/7"
        ),
        phone: "080 111 111",
        hours: "24/7",
      },
      {
        name: "Sigurna ženska kuća (Podgorica)",
        role: loc(
          "Pravna i psihološka podrška ženama",
          "Mbështetje juridike dhe psikologjike",
          "Правна и психолошка поддршка"
        ),
        phone: "+382 20 234 253",
        website: "https://uzk.co.me",
      },
      {
        name: "Uprava policije — Sektor za borbu protiv kriminala",
        role: loc(
          "Hitna prijava nasilja i visokotehnološkog kriminala",
          "Raportim urgjent në polici",
          "Итна пријава во полиција",
          { HR: "Žurna prijava nasilja i kibernetičkog kriminala" }
        ),
        phone: "122",
      },
    ],
  },

  HRV: {
    code: "HRV",
    names: loc("Hrvatska", "Kroacia", "Хрватска"),
    criminalCodeName: loc(
      "Kazneni zakon Republike Hrvatske",
      "Kodi Penal i Republikës së Kroacisë",
      "Кривичен законик на Република Хрватска"
    ),
    keyArticles: [
      {
        article: "Članak 144.a",
        topic: "Zlouporaba snimke spolno eksplicitnog sadržaja (osvetnička pornografija)",
      },
      { article: "Članak 140.", topic: "Nametljivo ponašanje (cyberstalking)" },
      { article: "Članak 139.", topic: "Prijetnja" },
      { article: "Članak 243.", topic: "Iznuda" },
    ],
    contacts: [
      {
        name: "Nacionalni pozivni centar za žrtve kaznenih djela",
        role: loc(
          "Besplatna i anonimna linija podrške 24/7",
          "Linjë falas 24/7 për viktimat",
          "Бесплатна линија за жртви 24/7"
        ),
        phone: "116 006",
        hours: "24/7",
      },
      {
        name: "B.a.B.e. — Budi aktivna. Budi emancipiran.",
        role: loc(
          "Pravno savetovanje i podrška protiv online nasilja (NEON)",
          "Këshillim ligjor kundër dhunës online",
          "Правно советување против онлајн насилство",
          {
            BS: "Pravno savjetovanje i podrška protiv online nasilja (NEON)",
            HR: "Pravno savjetovanje i podrška protiv online nasilja (NEON)",
            ME: "Pravno savjetovanje i podrška protiv online nasilja (NEON)",
          }
        ),
        phone: "+385 1 4663 666",
        website: "https://babe.hr",
      },
      {
        name: "Policija — Služba kibernetičke sigurnosti",
        role: loc(
          "Hitna prijava krivičnih dela",
          "Raportim urgjent në polici",
          "Итна пријава во полиција",
          {
            BS: "Hitna prijava krivičnih djela",
            HR: "Žurna prijava kaznenih djela",
            ME: "Hitna prijava krivičnih djela",
          }
        ),
        phone: "192",
      },
    ],
  },

  MKD: {
    code: "MKD",
    names: loc("Severna Makedonija", "Maqedonia e Veriut", "Северна Македонија", {
      BS: "Sjeverna Makedonija",
      HR: "Sjeverna Makedonija",
      ME: "Sjeverna Makedonija",
    }),
    criminalCodeName: loc(
      "Krivični zakonik Severne Makedonije",
      "Kodi Penal i Maqedonisë së Veriut",
      "Кривичен законик на Република Северна Македонија",
      {
        BS: "Krivični zakonik Sjeverne Makedonije",
        HR: "Kazneni zakonik Sjeverne Makedonije",
        ME: "Krivični zakonik Sjeverne Makedonije",
      }
    ),
    keyArticles: [
      { article: "Член 144-а", topic: "Демнење (вклучително преку интернет)" },
      { article: "Член 144", topic: "Загрозување на сигурноста" },
      {
        article: "Член 152",
        topic: "Неовластено снимање и злоупотреба на интимни снимки",
      },
      { article: "Член 258 / 259", topic: "Изнуда и уцена" },
    ],
    contacts: [
      {
        name: "Национална SOS линија за жртви на насилство",
        role: loc(
          "24/7 poverljiva podrška i savetovanje",
          "Mbështetje konfidenciale 24/7",
          "24/7 доверлива поддршка и советување",
          {
            BS: "24/7 povjerljiva podrška i savjetovanje",
            HR: "24/7 povjerljiva podrška i savjetovanje",
            ME: "24/7 povjerljiva podrška i savjetovanje",
          }
        ),
        phone: "141 700 / 070 230 245",
        hours: "24/7",
      },
      {
        name: "Национална мрежа против насилство врз жени",
        role: loc(
          "Besplatna pravna i psihološka pomoć",
          "Ndihmë juridike dhe psikologjike falas",
          "Бесплатна правна и психолошка помош"
        ),
        website: "https://glasprotivnasilstvo.org.mk",
      },
      {
        name: "МВР — Сектор за компјутерски криминал и дигитална форензика",
        role: loc(
          "Prijava digitalnog nasilja i krivičnih dela",
          "Raportimi i krimit kibernetik",
          "Пријавување на компјутерски криминал",
          {
            BS: "Prijava digitalnog nasilja i krivičnih djela",
            HR: "Prijava digitalnog nasilja i kaznenih djela",
            ME: "Prijava digitalnog nasilja i krivičnih djela",
          }
        ),
        phone: "192",
        email: "cybercrime@moi.gov.mk",
      },
    ],
  },

  ALB: {
    code: "ALB",
    names: loc("Albanija", "Shqipëria", "Албанија"),
    criminalCodeName: loc(
      "Krivični zakonik Republike Albanije",
      "Kodi Penal i Republikës së Shqipërisë",
      "Кривичен законик на Република Албанија",
      { HR: "Kazneni zakonik Republike Albanije" }
    ),
    keyArticles: [
      { article: "Neni 121/a", topic: "Përndjekja (Cyberstalking)" },
      { article: "Neni 84", topic: "Kanosja (Kërcënimi)" },
      {
        article: "Neni 121",
        topic: "Ndërhyrja e padrejtë në jetën private dhe publikimi i imazheve",
      },
      { article: "Neni 109/b", topic: "Shtrëngimi me anë të kanosjes (Shantazhi / Sextortion)" },
    ],
    contacts: [
      {
        name: "Linja Kombëtare e Këshillimit për Gra dhe Vajza",
        role: loc(
          "24/7 nacionalna SOS linija za žene i devojke",
          "Linja kombëtare 24/7 falas dhe konfidenciale",
          "24/7 национална SOS линија за жени и девојки",
          {
            BS: "24/7 nacionalna SOS linija za žene i djevojke",
            HR: "24/7 nacionalna SOS linija za žene i djevojke",
            ME: "24/7 nacionalna SOS linija za žene i đevojke",
          }
        ),
        phone: "116 117",
        hours: "24/7",
      },
      {
        name: "AWEN — Albanian Women Empowerment Network",
        role: loc(
          "Pravna i psihosocijalna podrška",
          "Mbështetje ligjore dhe psikosociale",
          "Правна и психосоцијална поддршка"
        ),
        website: "https://awenetwork.org/eng",
      },
      {
        name: "iSIGURT.AL — CRCA / ECPAT Albania",
        role: loc(
          "Centar za bezbedniji internet i podršku žrtvama",
          "Qendra për Internet më të Sigurt dhe mbështetje për viktimat",
          "Центар за побезбеден интернет и поддршка на жртви",
          {
            BS: "Centar za sigurniji internet i podršku žrtvama",
            HR: "Centar za sigurniji internet i podršku žrtvama",
            ME: "Centar za bezbjedniji internet i podršku žrtvama",
          }
        ),
        website: "https://www.crca.al/",
      },
      {
        name: "Policia e Shtetit — Njësia e Krimit Kibernetik",
        role: loc(
          "Hitna prijava i jedinica za sajber kriminal",
          "Raportim urgjent dhe krimi kibernetik",
          "Итна пријава и сајбер криминал",
          { HR: "Žurna prijava i jedinica za kibernetički kriminal" }
        ),
        phone: "129",
        website: "https://asp.gov.al/denonco-krimin-kompjuterik/",
      },
    ],
  },
};
