/**
 * All site copy and data in one place — edit here, not in the components.
 * `level` values are 1–6 on the same six-step scale the hero strip shows
 * (1 = working knowledge, 6 = this is what people call me for).
 */

export const LINKS = {
  github: "https://github.com/YOUR-GITHUB-HANDLE",
  // TODO: replace once GitHub Sponsors is enabled (github.com/sponsors/accounts)
  sponsors: "https://github.com/sponsors/YOUR-GITHUB-HANDLE",
  // TODO: replace once your Ko-fi page exists (ko-fi.com/manage)
  kofi: "https://ko-fi.com/YOUR-KOFI-HANDLE",
  email: "mailto:hakan.yedibela@googlemail.com",
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
  title: "Pollen",
  subtitle: "An iOS allergy companion for Bavaria",
  body: [
    "Reads live pollen concentrations from the ePIN measurement network run by the Bavarian LGL, classifies them on the official six-level scale, and says what that means for the allergens you actually track.",
    "The hard part isn't the happy path. It's the day the API answers 200 and the station has quietly stopped measuring. The app says so, names the date of the last real reading, and tells you when data comes back — instead of showing a confident zero.",
  ],
  facts: [
    { label: "Data source", value: "ePIN / LGL Bayern" },
    { label: "Platform", value: "iOS 17+, SwiftUI" },
    { label: "Tests", value: "270+, incl. a11y audits" },
    { label: "Price", value: "Free, no ads" },
  ],
} as const;

export const SUPPORT = {
  eyebrow: "Support the work",
  title: "The apps are free. The time isn't.",
  body: "Pollen is free, carries no ads, and collects nothing about you. It costs an Apple developer account and a lot of evenings. If it saved you one bad morning, you can put something in the jar. Entirely optional — nothing gets unlocked.",
  options: [
    {
      id: "sponsors",
      name: "GitHub Sponsors",
      pitch: "Recurring or one-off. No platform cut — it arrives whole.",
      cta: "Sponsor on GitHub",
      href: LINKS.sponsors,
    },
    {
      id: "kofi",
      name: "Ko-fi",
      pitch: "One-off, no account needed. Card or PayPal.",
      cta: "Buy me a coffee",
      href: LINKS.kofi,
    },
  ],
} as const;
