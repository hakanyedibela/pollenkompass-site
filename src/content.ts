/**
 * All site copy and data in one place — edit here, not in the components.
 * Every user-facing string carries all four languages: `{ de, en, es, ro }`, resolved by the
 * language selector in the header (same Localized(de, en, es, ro) philosophy as the
 * Pollenkompass apps — all four keys are required, so TypeScript enumerates every entry
 * instead of letting a missed one silently fall back to English). `level` values are 1–6 on
 * the same six-step scale the hero strip shows (1 = working knowledge, 6 = what people call
 * me for).
 */

export type Lang = "de" | "en" | "es" | "ro";
export type L = { de: string; en: string; es: string; ro: string };

export const LINKS = {
  github: "https://github.com/hakanyedibela",
  email: "mailto:contact@hkn7b.dev",
  privacy: `${import.meta.env.BASE_URL}privacy/`,
} as const;

export const UI = {
  skipLink: {
    de: "Zum Inhalt springen",
    en: "Skip to content",
    es: "Saltar al contenido",
    ro: "Săriți la conținut",
  },
  // A selector, not a two-way toggle: cycling four languages would make a Romanian speaker
  // press it three times, so the label names the action rather than the destination.
  langToggleLabel: {
    de: "Sprache wählen",
    en: "Choose language",
    es: "Elegir idioma",
    ro: "Alegeți limba",
  },
  reading: { de: "Messwert", en: "Reading", es: "Medición", ro: "Măsurătoare" },
  stripLegend: {
    de: "ePIN-Pollenflugskala · sechs Stufen",
    en: "ePIN pollen-flight scale · six levels",
    es: "Escala de polen ePIN · seis niveles",
    ro: "Scara de polen ePIN · șase niveluri",
  },
  skillLevelOf: {
    de: "Stufe %1 von %2",
    en: "level %1 of %2",
    es: "nivel %1 de %2",
    ro: "nivelul %1 din %2",
  },
  footerPrivacy: {
    de: "Datenschutz",
    en: "Privacy",
    es: "Privacidad",
    ro: "Confidențialitate",
  },
  footerEmail: { de: "E-Mail", en: "Email", es: "Correo", ro: "E-mail" },
} as const;

export const HERO = {
  name: "Hakan Yedibela",
  location: {
    de: "Raum Nürnberg, Deutschland",
    en: "Nuremberg area, Germany",
    es: "Zona de Núremberg, Alemania",
    ro: "Zona Nürnberg, Germania",
  },
  h1Pre: {
    de: "Ich baue Software, die ",
    en: "I build software that ",
    es: "Creo software que ",
    ro: "Construiesc software care ",
  },
  h1Em: {
    de: "die Wahrheit berichtet",
    en: "reports the truth",
    es: "dice la verdad",
    ro: "spune adevărul",
  },
  h1Post: { de: ".", en: ".", es: ".", ro: "." },
  role: {
    de: "Full-Stack-Entwickler. Gemessene Daten, ehrliche Zustände und Oberflächen, die zugeben, wenn sie etwas nicht wissen — denn eine selbstbewusst falsche Antwort ist schlimmer als keine Antwort.",
    en: "Full-stack engineer. Measured data, honest states, and interfaces that admit when they don't know — because a confident wrong answer is worse than no answer.",
    es: "Desarrollador full-stack. Datos medidos, estados honestos e interfaces que admiten cuando no saben algo — porque una respuesta equivocada dada con seguridad es peor que ninguna respuesta.",
    ro: "Dezvoltator full-stack. Date măsurate, stări oneste și interfețe care recunosc când nu știu ceva — pentru că un răspuns greșit spus cu siguranță este mai rău decât niciun răspuns.",
  },
} as const;

/** The six-step scale, borrowed from the ePIN pollen-flight levels the app renders. */
export const SCALE: { name: L; hex: string }[] = [
  {
    name: { de: "sehr wenig", en: "very little", es: "muy poco", ro: "foarte puțin" },
    hex: "#298d31",
  },
  { name: { de: "wenig", en: "little", es: "poco", ro: "puțin" }, hex: "#97c000" },
  { name: { de: "mäßig", en: "some", es: "moderado", ro: "moderat" }, hex: "#fceb00" },
  { name: { de: "viel", en: "a lot", es: "mucho", ro: "mult" }, hex: "#f2b01d" },
  {
    name: { de: "sehr viel", en: "very much", es: "muchísimo", ro: "foarte mult" },
    hex: "#df4c06",
  },
  {
    name: { de: "extrem viel", en: "extremely much", es: "extremo", ro: "extrem de mult" },
    hex: "#b5111c",
  },
];

export type Skill = { name: string; level: number; note?: L };
export type SkillGroup = { title: L; blurb: L; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { de: "Client", en: "Client", es: "Cliente", ro: "Client" },
    blurb: {
      de: "Oberflächen, die Menschen wirklich benutzen — auch die, die einen Screenreader verwenden.",
      en: "Interfaces people actually reach for — including the ones who use a screen reader.",
      es: "Interfaces que la gente usa de verdad — incluidas las personas que usan un lector de pantalla.",
      ro: "Interfețe pe care oamenii chiar le folosesc — inclusiv cei care folosesc un cititor de ecran.",
    },
    skills: [
      {
        name: "Swift / SwiftUI",
        level: 6,
        note: {
          de: "Pollenkompass iOS: CloudKit-Sync, Siri, Widgets",
          en: "Pollenkompass iOS: CloudKit sync, Siri, widgets",
          es: "Pollenkompass iOS: sincronización con CloudKit, Siri, widgets",
          ro: "Pollenkompass iOS: sincronizare CloudKit, Siri, widgeturi",
        },
      },
      {
        name: "Kotlin / Jetpack Compose",
        level: 5,
        note: {
          de: "Pollenkompass Android: gleiche Invarianten, natives UI",
          en: "Pollenkompass Android: same invariants, native UI",
          es: "Pollenkompass Android: las mismas invariantes, interfaz nativa",
          ro: "Pollenkompass Android: aceleași invariante, interfață nativă",
        },
      },
      {
        name: "Accessibility (WCAG, VoiceOver, TalkBack)",
        level: 5,
        note: {
          de: "Automatisierte Audits in CI",
          en: "Automated audits in CI",
          es: "Auditorías automatizadas en CI",
          ro: "Audituri automate în CI",
        },
      },
      { name: "TypeScript / React", level: 5 },
    ],
  },
  {
    title: { de: "Services", en: "Services", es: "Servicios", ro: "Servicii" },
    blurb: {
      de: "Die Schicht, in der Daten aufhören, ein Versprechen zu sein, und ein Vertrag werden.",
      en: "The layer where data stops being a promise and becomes a contract.",
      es: "La capa donde los datos dejan de ser una promesa y se convierten en un contrato.",
      ro: "Stratul în care datele nu mai sunt o promisiune, ci devin un contract.",
    },
    skills: [
      {
        name: "REST / API-Integration",
        level: 5,
        note: {
          de: "ePIN-Messnetz + DWD Open Data",
          en: "ePIN network + DWD open data",
          es: "Red ePIN + datos abiertos del DWD",
          ro: "Rețeaua ePIN + date deschise DWD",
        },
      },
      {
        name: "Caching & Offline-Strategie",
        level: 5,
        note: {
          de: "Cache-first, ehrliche Veraltung",
          en: "Cache-first, honest staleness",
          es: "Caché primero, obsolescencia honesta",
          ro: "Întâi din memorie, învechire onestă",
        },
      },
      { name: "Node / Vite-Tooling", level: 4 },
      { name: "Push & Background-Refresh", level: 4 },
    ],
  },
  {
    title: { de: "Arbeitsweise", en: "Practice", es: "Método", ro: "Mod de lucru" },
    blurb: {
      de: "Wie die Arbeit entsteht — der Teil, der entscheidet, ob sie echte Nutzer überlebt.",
      en: "How the work gets made — the part that decides whether it survives real users.",
      es: "Cómo se hace el trabajo — la parte que decide si sobrevive a usuarios reales.",
      ro: "Cum se face munca — partea care decide dacă rezistă la utilizatori reali.",
    },
    skills: [
      {
        name: "Test-driven development",
        level: 6,
        note: {
          de: "270+ Tests je Plattform bei Pollenkompass",
          en: "270+ tests per platform on Pollenkompass",
          es: "Más de 270 pruebas por plataforma en Pollenkompass",
          ro: "Peste 270 de teste per platformă în Pollenkompass",
        },
      },
      { name: "Code-Review & adversariale Verifikation", level: 5 },
      { name: "Spec-first-Design", level: 5 },
      { name: "Git / CI-Workflows", level: 5 },
    ],
  },
];

export const WORK = {
  eyebrow: {
    de: "Aktuelles Projekt",
    en: "Current work",
    es: "Proyecto actual",
    ro: "Proiect actual",
  },
  title: "Pollenkompass",
  icon: `${import.meta.env.BASE_URL}pollenkompass-icon.png`,
  iconAlt: {
    de: "Pollenkompass App-Icon: Kompassrose mit Pollenkorn",
    en: "Pollenkompass app icon: compass rose with a pollen grain",
    es: "Icono de la app Pollenkompass: rosa de los vientos con un grano de polen",
    ro: "Pictograma aplicației Pollenkompass: roza vânturilor cu un grăunte de polen",
  },
  subtitle: {
    de: "Ein Allergie-Begleiter für Deutschland — iOS & Android",
    en: "An allergy companion for Germany — iOS & Android",
    es: "Un acompañante para las alergias en Alemania — iOS y Android",
    ro: "Un însoțitor pentru alergii în Germania — iOS și Android",
  },
  body: [
    {
      de: "Liest live gemessene Pollenkonzentrationen aus dem ePIN-Messnetz des Bayerischen LGL, zeigt die tägliche DWD-Vorhersage für alle 27 deutschen Regionen und übersetzt beides für genau die Allergene, die du beobachtest. Messwerte und Vorhersagen werden nie vermischt — jede Zahl trägt ihre Quelle.",
      en: "Reads live pollen concentrations from the ePIN measurement network run by the Bavarian LGL, shows the DWD daily forecast for all 27 German regions, and says what that means for the allergens you actually track. Measured values and forecasts are never blended — every number is labeled with its source.",
      es: "Lee concentraciones de polen medidas en directo por la red ePIN de la LGL bávara, muestra el pronóstico diario del DWD para las 27 regiones alemanas y traduce ambos para los alérgenos que usted sigue. Los valores medidos y los pronósticos nunca se mezclan: cada cifra lleva su fuente.",
      ro: "Citește concentrații de polen măsurate în timp real de rețeaua ePIN a LGL din Bavaria, arată prognoza zilnică DWD pentru toate cele 27 de regiuni germane și traduce ambele pentru alergenii pe care îi urmăriți. Valorile măsurate și prognozele nu se amestecă niciodată — fiecare cifră își poartă sursa.",
    },
    {
      de: "Der schwierige Teil ist nicht der Normalfall. Es ist der Tag, an dem die API 200 antwortet und die Station still aufgehört hat zu messen. Die App sagt es, nennt das Datum des letzten echten Messwerts und meldet, wenn Daten zurückkommen — statt eine selbstbewusste Null anzuzeigen.",
      en: "The hard part isn't the happy path. It's the day the API answers 200 and the station has quietly stopped measuring. The app says so, names the date of the last real reading, and tells you when data comes back — instead of showing a confident zero.",
      es: "Lo difícil no es el caso normal. Es el día en que la API responde 200 y la estación ha dejado de medir en silencio. La app lo dice, indica la fecha de la última medición real y avisa cuando vuelven los datos — en lugar de mostrar un cero con seguridad.",
      ro: "Partea grea nu este cazul normal. Este ziua în care API-ul răspunde 200, iar stația a încetat în tăcere să măsoare. Aplicația o spune, indică data ultimei măsurători reale și anunță când revin datele — în loc să afișeze un zero convingător.",
    },
    {
      de: "Dazu kommen ein Symptomtagebuch mit Pollen-Schnappschüssen, Korrelationsansichten, Warnungen und Widgets. Kein Konto, keine Werbung, kein Tracking — das Tagebuch bleibt auf deinem Gerät (auf iOS optional in deiner privaten iCloud). Beide Apps teilen dieselben Invarianten: iOS nativ in SwiftUI, Android nativ in Kotlin mit Jetpack Compose.",
      en: "A symptom diary with pollen snapshots, correlation views, alerts and home-screen widgets rounds it out. No account, no ads, no tracking — the diary stays on your device (and, on iOS, optionally in your private iCloud). Both apps share the same invariants: iOS native in SwiftUI, Android native in Kotlin with Jetpack Compose.",
      es: "A eso se suman un diario de síntomas con instantáneas de polen, vistas de correlación, avisos y widgets. Sin cuenta, sin anuncios, sin seguimiento — el diario se queda en su dispositivo (y, en iOS, opcionalmente en su iCloud privado). Ambas apps comparten las mismas invariantes: iOS nativo en SwiftUI, Android nativo en Kotlin con Jetpack Compose.",
      ro: "La acestea se adaugă un jurnal de simptome cu instantanee de polen, vederi de corelație, alerte și widgeturi. Fără cont, fără reclame, fără urmărire — jurnalul rămâne pe dispozitivul dumneavoastră (iar pe iOS, opțional, în iCloud-ul privat). Ambele aplicații au aceleași invariante: iOS nativ în SwiftUI, Android nativ în Kotlin cu Jetpack Compose.",
    },
  ],
  facts: [
    {
      label: {
        de: "Datenquellen",
        en: "Data sources",
        es: "Fuentes de datos",
        ro: "Surse de date",
      },
      value: {
        de: "ePIN (gemessen) · DWD (Vorhersage)",
        en: "ePIN (measured) · DWD (forecast)",
        es: "ePIN (medido) · DWD (pronóstico)",
        ro: "ePIN (măsurat) · DWD (prognoză)",
      },
    },
    {
      label: {
        de: "Plattformen",
        en: "Platforms",
        es: "Plataformas",
        ro: "Platforme",
      },
      value: {
        de: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
        en: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
        es: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
        ro: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
      },
    },
    {
      label: { de: "Tests", en: "Tests", es: "Pruebas", ro: "Teste" },
      value: {
        de: "270+ je Plattform, inkl. A11y-Audits",
        en: "270+ per platform, incl. a11y audits",
        es: "Más de 270 por plataforma, incl. auditorías de accesibilidad",
        ro: "Peste 270 per platformă, inclusiv audituri de accesibilitate",
      },
    },
    {
      label: { de: "Preis", en: "Price", es: "Precio", ro: "Preț" },
      value: {
        de: "Kostenlos — keine Werbung, keine In-App-Käufe",
        en: "Free — no ads, no IAP",
        es: "Gratis — sin anuncios ni compras dentro de la app",
        ro: "Gratuit — fără reclame, fără achiziții în aplicație",
      },
    },
  ],
  skillsEyebrow: {
    de: "Womit ich arbeite",
    en: "What I work with",
    es: "Con qué trabajo",
    ro: "Cu ce lucrez",
  },
  skillsTitle: {
    de: "Gemessen auf derselben Skala wie die Daten",
    en: "Measured on the same scale as the data",
    es: "Medido en la misma escala que los datos",
    ro: "Măsurat pe aceeași scară ca datele",
  },
  skillsProse: {
    de: "Sechs Stufen, eine Bedeutung: Stufe 1 ist Arbeitswissen, Stufe 6 ist das, wofür man mich ruft. Keine Prozente — niemand ist zu 95 % gut in Swift.",
    en: "Six levels, one meaning: level 1 is working knowledge, level 6 is what people call me for. No percentages — nobody is 95% good at Swift.",
    es: "Seis niveles, un significado: el nivel 1 es conocimiento práctico, el nivel 6 es aquello para lo que me llaman. Sin porcentajes — nadie es un 95 % bueno en Swift.",
    ro: "Șase niveluri, un singur înțeles: nivelul 1 este cunoaștere de lucru, nivelul 6 este motivul pentru care sunt chemat. Fără procente — nimeni nu este 95% bun la Swift.",
  },
} as const;
