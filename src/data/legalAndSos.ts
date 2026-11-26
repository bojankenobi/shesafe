import { CountryCode, CountryLegalProfile } from "@/types";

export const COUNTRIES: Record<CountryCode, CountryLegalProfile> = {
  SRB: {
    code: "SRB",
    names: {
      BCMS: "Srbija",
      AL: "Serbia",
      MK: "Србија",
    },
    criminalCodeName: {
      BCMS: "Krivični zakonik Republike Srbije",
      AL: "Kodi Penal i Republikës së Serbisë",
      MK: "Кривичен законик на Република Србија",
    },
    keyArticles: [
      { article: "Član 138a", topic: "Proganjanje (uhodjenje putem interneta)" },
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
        role: {
          BCMS: "SOS podrška i pravno savetovanje za žrtve nasilja i digitalne eksploatacije",
          AL: "Mbështetje SOS dhe këshillim ligjor",
          MK: "SOS поддршка и правно советување",
        },
        phone: "+381 11 785 0000",
        email: "sos@astra.rs",
        website: "https://astra.rs",
      },
      {
        name: "Autonomni ženski centar (AŽC)",
        role: {
          BCMS: "Besplatna pravna i psihološka podrška ženama",
          AL: "Mbështetje juridike dhe psikologjike falas për gratë",
          MK: "Бесплатна правна и психолошка поддршка за жени",
        },
        phone: "0800 100 007",
        website: "https://www.womenngo.org.rs",
      },
      {
        name: "Posebno tužilaštvo za visokotehnološki kriminal (VTK)",
        role: {
          BCMS: "Prijava krivičnih dela izvršenih putem interneta",
          AL: "Raportimi i krimeve kibernetike",
          MK: "Пријавување на компјутерски криминал",
        },
        email: "vtk@beograd.vtk.jt.rs",
        phone: "192 (Policija)",
      },
    ],
  },

  BIH: {
    code: "BIH",
    names: {
      BCMS: "Bosna i Hercegovina",
      AL: "Bosnja dhe Hercegovina",
      MK: "Босна и Херцеговина",
    },
    criminalCodeName: {
      BCMS: "Krivični zakon FBiH / RS / Brčko distrikta",
      AL: "Kodi Penal i Bosnjës dhe Hercegovinës",
      MK: "Кривичен законик на Босна и Херцеговина",
    },
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
        role: {
          BCMS: "24/7 besplatna SOS linija za žrtve nasilja",
          AL: "Linjë SOS falas 24/7",
          MK: "24/7 бесплатна SOS линија",
        },
        phone: "1265",
        hours: "24/7",
      },
      {
        name: "SOS Telefon Republika Srpska",
        role: {
          BCMS: "24/7 besplatna SOS linija za žrtve nasilja",
          AL: "Linjë SOS falas 24/7",
          MK: "24/7 бесплатна SOS линија",
        },
        phone: "1264",
        hours: "24/7",
      },
      {
        name: "Fondacija Udružene žene / Policija",
        role: {
          BCMS: "Pravna pomoć i hitna intervencija policije",
          AL: "Ndihmë ligjore dhe polici",
          MK: "Правна помош и полиција",
        },
        phone: "122 (Policija)",
        website: "https://unitedwomenbl.org",
      },
      {
        name: "Agencija za ravnopravnost spolova BiH",
        role: {
          BCMS: "Institucionalna podrška i zaštita od nasilja",
          AL: "Mbështetje institucionale dhe mbrojtje",
          MK: "Институционална поддршка и заштита",
        },
        website: "https://www.arsbih.gov.ba/",
      },
    ],
  },

  MNE: {
    code: "MNE",
    names: {
      BCMS: "Crna Gora",
      AL: "Mali i Zi",
      MK: "Црна Гора",
    },
    criminalCodeName: {
      BCMS: "Krivični zakonik Crne Gore",
      AL: "Kodi Penal i Malit të Zi",
      MK: "Кривичен законик на Црна Гора",
    },
    keyArticles: [
      { article: "Član 168a", topic: "Proganjanje" },
      { article: "Član 168", topic: "Ugrožavanje sigurnosti" },
      {
        article: "Član 174",
        topic: "Neovlašćeno objavljivanje i prikazivanje tuđeg spisa, portreta i snimka",
      },
      { article: "Član 250 / 251", topic: "Iznuda i ucena" },
    ],
    contacts: [
      {
        name: "Nacionalna SOS linija za žrtve nasilja",
        role: {
          BCMS: "Besplatna, anonimna i dostupna 24/7 podrška",
          AL: "Mbështetje falas dhe anonime 24/7",
          MK: "Бесплатна и анонимна поддршка 24/7",
        },
        phone: "080 111 111",
        hours: "24/7",
      },
      {
        name: "Sigurna ženska kuća (Podgorica)",
        role: {
          BCMS: "Pravna i psihološka podrška ženama",
          AL: "Mbështetje juridike dhe psikologjike",
          MK: "Правна и психолошка поддршка",
        },
        phone: "+382 20 234 253",
        website: "https://uzk.co.me",
      },
      {
        name: "Uprava policije — Sektor za borbu protiv kriminala",
        role: {
          BCMS: "Hitna prijava nasilja i visokotehnološkog kriminala",
          AL: "Raportim urgjent në polici",
          MK: "Итна пријава во полиција",
        },
        phone: "122",
      },
    ],
  },

  HRV: {
    code: "HRV",
    names: {
      BCMS: "Hrvatska",
      AL: "Kroacia",
      MK: "Хрватска",
    },
    criminalCodeName: {
      BCMS: "Kazneni zakon Republike Hrvatske",
      AL: "Kodi Penal i Republikës së Kroacisë",
      MK: "Кривичен законик на Република Хрватска",
    },
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
        role: {
          BCMS: "Besplatna i anonimna linija podrške 24/7",
          AL: "Linjë falas 24/7 për viktimat",
          MK: "Бесплатна линија за жртви 24/7",
        },
        phone: "116 006",
        hours: "24/7",
      },
      {
        name: "B.a.B.e. — Budi aktivna. Budi emancipiran.",
        role: {
          BCMS: "Pravno savetovanje i podrška protiv online nasilja (NEON)",
          AL: "Këshillim ligjor kundër dhunës online",
          MK: "Правно советување против онлајн насилство",
        },
        phone: "+385 1 4663 666",
        website: "https://babe.hr",
      },
      {
        name: "Policija — Služba kibernetičke sigurnosti",
        role: {
          BCMS: "Hitna prijava kaznenih dela",
          AL: "Raportim urgjent në polici",
          MK: "Итна пријава во полиција",
        },
        phone: "192",
      },
    ],
  },

  MKD: {
    code: "MKD",
    names: {
      BCMS: "Severna Makedonija",
      AL: "Maqedonia e Veriut",
      MK: "Северна Македонија",
    },
    criminalCodeName: {
      BCMS: "Krivični zakonik Severne Makedonije",
      AL: "Kodi Penal i Maqedonisë së Veriut",
      MK: "Кривичен законик на Република Северна Македонија",
    },
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
        role: {
          BCMS: "24/7 poverljiva podrška i savetovanje",
          AL: "Mbështetje konfidenciale 24/7",
          MK: "24/7 доверлива поддршка и советување",
        },
        phone: "141 700 / 070 230 245",
        hours: "24/7",
      },
      {
        name: "Национална мрежа против насилство врз жени",
        role: {
          BCMS: "Besplatna pravna i psihološka pomoć",
          AL: "Ndihmë juridike dhe psikologjike falas",
          MK: "Бесплатна правна и психолошка помош",
        },
        website: "https://glasprotivnasilstvo.org.mk",
      },
      {
        name: "МВР — Сектор за компјутерски криминал и дигитална форензика",
        role: {
          BCMS: "Prijava digitalnog nasilja i krivičnih dela",
          AL: "Raportimi i krimit kibernetik",
          MK: "Пријавување на компјутерски криминал",
        },
        phone: "192",
        email: "cybercrime@moi.gov.mk",
      },
    ],
  },

  ALB: {
    code: "ALB",
    names: {
      BCMS: "Albanija",
      AL: "Shqipëria",
      MK: "Албанија",
    },
    criminalCodeName: {
      BCMS: "Krivični zakonik Republike Albanije",
      AL: "Kodi Penal i Republikës së Shqipërisë",
      MK: "Кривичен законик на Република Албанија",
    },
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
        role: {
          BCMS: "24/7 nacionalna SOS linija za žene i devojke",
          AL: "Linja kombëtare 24/7 falas dhe konfidenciale",
          MK: "24/7 национална SOS линија за жени и девојки",
        },
        phone: "116 117",
        hours: "24/7",
      },
      {
        name: "AWEN — Albanian Women Empowerment Network",
        role: {
          BCMS: "Pravna i psihosocijalna podrška",
          AL: "Mbështetje ligjore dhe psikosociale",
          MK: "Правна и психосоцијална поддршка",
        },
        website: "https://awenetwork.org/eng",
      },
      {
        name: "iSIGURT.AL — CRCA / ECPAT Albania",
        role: {
          BCMS: "Centar za bezbedniji internet i podršku žrtvama",
          AL: "Qendra për Internet më të Sigurt dhe mbështetje për viktimat",
          MK: "Центар за побезбеден интернет и поддршка на жртви",
        },
        website: "https://www.crca.al/",
      },
      {
        name: "Policia e Shtetit — Njësia e Krimit Kibernetik",
        role: {
          BCMS: "Hitna prijava i jedinica za sajber kriminal",
          AL: "Raportim urgjent dhe krimi kibernetik",
          MK: "Итна пријава и сајбер криминал",
        },
        phone: "129",
        website: "https://asp.gov.al/denonco-krimin-kompjuterik/",
      },
    ],
  },
};
