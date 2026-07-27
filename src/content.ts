/**
 * All site copy and data in one place — edit here, not in the components.
 * `level` values are 1–6 on the same six-step scale the hero strip shows
 * (1 = working knowledge, 6 = this is what people call me for).
 */

export const LINKS = {
  github: "https://github.com/hakanyedibela",
  email: "mailto:contact@hkn7b.dev",
  privacy: `${import.meta.env.BASE_URL}privacy/`,
} as const;

export const HERO = {
  name: "Hakan Yedibela",
  role: "Full-stack engineer",
  thesis:
    "I build software that reports the truth — measured data, honest states, and interfaces that admit when they don't know.",
  location: "Munich, Germany",
} as const;

/** The six-step scale, borrowed from the ePIN pollen-flight levels the app renders. */
export const SCALE = [
  { name: "very little", hex: "#298d31" },
  { name: "little", hex: "#97c000" },
  { name: "some", hex: "#fceb00" },
  { name: "a lot", hex: "#f2b01d" },
  { name: "very much", hex: "#df4c06" },
  { name: "extremely much", hex: "#b5111c" },
] as const;

export type Skill = { name: string; level: number; note?: string };
export type SkillGroup = { title: string; blurb: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Client",
    blurb: "Interfaces people actually reach for — including the ones who use a screen reader.",
    skills: [
      { name: "Swift / SwiftUI", level: 6, note: "Shipped app, StoreKit 2, CloudKit sync" },
      { name: "Accessibility (WCAG, VoiceOver)", level: 5, note: "Automated audits in CI" },
      { name: "TypeScript / React", level: 5 },
      { name: "CSS architecture", level: 4 },
    ],
  },
  {
    title: "Services",
    blurb: "The layer where data stops being a promise and becomes a contract.",
    skills: [
      { name: "REST / API integration", level: 5, note: "ePIN measurement network" },
      { name: "Caching & offline strategy", level: 5, note: "Cache-first, honest staleness" },
      { name: "Node / Vite tooling", level: 4 },
      { name: "Push & background refresh", level: 4 },
    ],
  },
  {
    title: "Practice",
    blurb: "How the work gets made — the part that decides whether it survives real users.",
    skills: [
      { name: "Test-driven development", level: 6, note: "270+ tests on the pollen app" },
      { name: "Code review & adversarial verification", level: 5 },
      { name: "Spec-first design", level: 5 },
      { name: "Git / CI workflows", level: 5 },
    ],
  },
];

export const WORK = {
  eyebrow: "Current work",
  title: "Pollenkompass",
  subtitle: "An allergy companion for Bavaria — iOS & Android",
  body: [
    "Reads live pollen concentrations from the ePIN measurement network run by the Bavarian LGL, shows the DWD daily forecast for all 27 German regions, and says what that means for the allergens you actually track. Measured values and forecasts are never blended — every number is labeled with its source.",
    "The hard part isn't the happy path. It's the day the API answers 200 and the station has quietly stopped measuring. The app says so, names the date of the last real reading, and tells you when data comes back — instead of showing a confident zero.",
    "A symptom diary with pollen snapshots, correlation views, alerts and home-screen widgets rounds it out. No account, no ads, no tracking — the diary stays on your device (and, on iOS, optionally in your private iCloud).",
  ],
  facts: [
    { label: "Data sources", value: "ePIN (measured) · DWD (forecast)" },
    { label: "Platform", value: "iOS 17+ (SwiftUI) · Android (Compose)" },
    { label: "Tests", value: "270+ per platform, incl. a11y audits" },
    { label: "Price", value: "Free — no ads, no IAP" },
  ],
} as const;
