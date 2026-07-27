/**
 * All site copy and data in one place — edit here, not in the components.
 * Every user-facing string is bilingual: `{ de, en }`, resolved by the
 * language toggle in the header (same Localized(de, en) philosophy as the
 * Pollenkompass apps). `level` values are 1–6 on the same six-step scale
 * the hero strip shows (1 = working knowledge, 6 = what people call me for).
 */

export type Lang = "de" | "en";
export type L = { de: string; en: string };

export const LINKS = {
  github: "https://github.com/hakanyedibela",
  email: "mailto:contact@hkn7b.dev",
  privacy: `${import.meta.env.BASE_URL}privacy/`,
} as const;

export const UI = {
  skipLink: { de: "Zum Inhalt springen", en: "Skip to content" },
  langToggleLabel: { de: "Switch to English", en: "Auf Deutsch wechseln" },
  reading: { de: "Messwert", en: "Reading" },
  stripLegend: {
    de: "ePIN-Pollenflugskala · sechs Stufen",
    en: "ePIN pollen-flight scale · six levels",
  },
  skillLevelOf: { de: "Stufe %1 von %2", en: "level %1 of %2" },
  footerPrivacy: { de: "Datenschutz", en: "Privacy" },
  footerEmail: { de: "E-Mail", en: "Email" },
} as const;

export const HERO = {
  name: "Hakan Yedibela",
  location: { de: "Raum Nürnberg, Deutschland", en: "Nuremberg area, Germany" },
  h1Pre: { de: "Ich baue Software, die ", en: "I build software that " },
  h1Em: { de: "die Wahrheit berichtet", en: "reports the truth" },
  h1Post: { de: ".", en: "." },
  role: {
    de: "Full-Stack-Entwickler. Gemessene Daten, ehrliche Zustände und Oberflächen, die zugeben, wenn sie etwas nicht wissen — denn eine selbstbewusst falsche Antwort ist schlimmer als keine Antwort.",
    en: "Full-stack engineer. Measured data, honest states, and interfaces that admit when they don't know — because a confident wrong answer is worse than no answer.",
  },
} as const;

/** The six-step scale, borrowed from the ePIN pollen-flight levels the app renders. */
export const SCALE: { name: L; hex: string }[] = [
  { name: { de: "sehr wenig", en: "very little" }, hex: "#298d31" },
  { name: { de: "wenig", en: "little" }, hex: "#97c000" },
  { name: { de: "mäßig", en: "some" }, hex: "#fceb00" },
  { name: { de: "viel", en: "a lot" }, hex: "#f2b01d" },
  { name: { de: "sehr viel", en: "very much" }, hex: "#df4c06" },
  { name: { de: "extrem viel", en: "extremely much" }, hex: "#b5111c" },
];

export type Skill = { name: string; level: number; note?: L };
export type SkillGroup = { title: L; blurb: L; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { de: "Client", en: "Client" },
    blurb: {
      de: "Oberflächen, die Menschen wirklich benutzen — auch die, die einen Screenreader verwenden.",
      en: "Interfaces people actually reach for — including the ones who use a screen reader.",
    },
    skills: [
      {
        name: "Swift / SwiftUI",
        level: 6,
        note: {
          de: "Pollenkompass iOS: CloudKit-Sync, Siri, Widgets",
          en: "Pollenkompass iOS: CloudKit sync, Siri, widgets",
        },
      },
      {
        name: "Kotlin / Jetpack Compose",
        level: 5,
        note: {
          de: "Pollenkompass Android: gleiche Invarianten, natives UI",
          en: "Pollenkompass Android: same invariants, native UI",
        },
      },
      {
        name: "Accessibility (WCAG, VoiceOver, TalkBack)",
        level: 5,
        note: { de: "Automatisierte Audits in CI", en: "Automated audits in CI" },
      },
      { name: "TypeScript / React", level: 5 },
    ],
  },
  {
    title: { de: "Services", en: "Services" },
    blurb: {
      de: "Die Schicht, in der Daten aufhören, ein Versprechen zu sein, und ein Vertrag werden.",
      en: "The layer where data stops being a promise and becomes a contract.",
    },
    skills: [
      {
        name: "REST / API-Integration",
        level: 5,
        note: { de: "ePIN-Messnetz + DWD Open Data", en: "ePIN network + DWD open data" },
      },
      {
        name: "Caching & Offline-Strategie",
        level: 5,
        note: { de: "Cache-first, ehrliche Veraltung", en: "Cache-first, honest staleness" },
      },
      { name: "Node / Vite-Tooling", level: 4 },
      { name: "Push & Background-Refresh", level: 4 },
    ],
  },
  {
    title: { de: "Arbeitsweise", en: "Practice" },
    blurb: {
      de: "Wie die Arbeit entsteht — der Teil, der entscheidet, ob sie echte Nutzer überlebt.",
      en: "How the work gets made — the part that decides whether it survives real users.",
    },
    skills: [
      {
        name: "Test-driven development",
        level: 6,
        note: {
          de: "270+ Tests je Plattform bei Pollenkompass",
          en: "270+ tests per platform on Pollenkompass",
        },
      },
      { name: "Code-Review & adversariale Verifikation", level: 5 },
      { name: "Spec-first-Design", level: 5 },
      { name: "Git / CI-Workflows", level: 5 },
    ],
  },
];

export const WORK = {
  eyebrow: { de: "Aktuelles Projekt", en: "Current work" },
  title: "Pollenkompass",
  subtitle: {
    de: "Ein Allergie-Begleiter für Deutschland — iOS & Android",
    en: "An allergy companion for Germany — iOS & Android",
  },
  body: [
    {
      de: "Liest live gemessene Pollenkonzentrationen aus dem ePIN-Messnetz des Bayerischen LGL, zeigt die tägliche DWD-Vorhersage für alle 27 deutschen Regionen und übersetzt beides für genau die Allergene, die du beobachtest. Messwerte und Vorhersagen werden nie vermischt — jede Zahl trägt ihre Quelle.",
      en: "Reads live pollen concentrations from the ePIN measurement network run by the Bavarian LGL, shows the DWD daily forecast for all 27 German regions, and says what that means for the allergens you actually track. Measured values and forecasts are never blended — every number is labeled with its source.",
    },
    {
      de: "Der schwierige Teil ist nicht der Normalfall. Es ist der Tag, an dem die API 200 antwortet und die Station still aufgehört hat zu messen. Die App sagt es, nennt das Datum des letzten echten Messwerts und meldet, wenn Daten zurückkommen — statt eine selbstbewusste Null anzuzeigen.",
      en: "The hard part isn't the happy path. It's the day the API answers 200 and the station has quietly stopped measuring. The app says so, names the date of the last real reading, and tells you when data comes back — instead of showing a confident zero.",
    },
    {
      de: "Dazu kommen ein Symptomtagebuch mit Pollen-Schnappschüssen, Korrelationsansichten, Warnungen und Widgets. Kein Konto, keine Werbung, kein Tracking — das Tagebuch bleibt auf deinem Gerät (auf iOS optional in deiner privaten iCloud). Beide Apps teilen dieselben Invarianten: iOS nativ in SwiftUI, Android nativ in Kotlin mit Jetpack Compose.",
      en: "A symptom diary with pollen snapshots, correlation views, alerts and home-screen widgets rounds it out. No account, no ads, no tracking — the diary stays on your device (and, on iOS, optionally in your private iCloud). Both apps share the same invariants: iOS native in SwiftUI, Android native in Kotlin with Jetpack Compose.",
    },
  ],
  facts: [
    {
      label: { de: "Datenquellen", en: "Data sources" },
      value: { de: "ePIN (gemessen) · DWD (Vorhersage)", en: "ePIN (measured) · DWD (forecast)" },
    },
    {
      label: { de: "Plattformen", en: "Platforms" },
      value: {
        de: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
        en: "iOS 17+ (SwiftUI) · Android (Kotlin/Compose)",
      },
    },
    {
      label: { de: "Tests", en: "Tests" },
      value: {
        de: "270+ je Plattform, inkl. A11y-Audits",
        en: "270+ per platform, incl. a11y audits",
      },
    },
    {
      label: { de: "Preis", en: "Price" },
      value: {
        de: "Kostenlos — keine Werbung, keine In-App-Käufe",
        en: "Free — no ads, no IAP",
      },
    },
  ],
  skillsEyebrow: { de: "Womit ich arbeite", en: "What I work with" },
  skillsTitle: {
    de: "Gemessen auf derselben Skala wie die Daten",
    en: "Measured on the same scale as the data",
  },
  skillsProse: {
    de: "Sechs Stufen, eine Bedeutung: Stufe 1 ist Arbeitswissen, Stufe 6 ist das, wofür man mich ruft. Keine Prozente — niemand ist zu 95 % gut in Swift.",
    en: "Six levels, one meaning: level 1 is working knowledge, level 6 is what people call me for. No percentages — nobody is 95% good at Swift.",
  },
} as const;
