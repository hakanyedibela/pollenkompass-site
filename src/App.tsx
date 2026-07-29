import { useEffect, useRef, useState } from "react";
import {
  HERO,
  LINKS,
  SCALE,
  SKILL_GROUPS,
  UI,
  WORK,
  type L,
  type Lang,
  type Skill,
} from "./content";
import { useSmoothScroll } from "./useSmoothScroll";

/** Adds `.shown` once the element scrolls into view; no-ops under reduced motion. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("shown");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const LANGS: Lang[] = ["de", "en", "es", "ro"];

function initialLang(): Lang {
  const stored = localStorage.getItem("lang");
  if (LANGS.includes(stored as Lang)) return stored as Lang;
  const prefix = navigator.language.toLowerCase().slice(0, 2);
  return LANGS.find((l) => l === prefix) ?? "en";
}

/**
 * The signature element: the six-step ePIN pollen-flight scale the app itself renders,
 * reused here as the site's unit of measure. The marker walks the scale the way a real
 * instrument's needle does — the page reads as a device, not a brochure.
 */
function MeasurementStrip({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stops = [1, 3, 2, 5, 4, 0];
    let i = 0;
    setStep(stops[0]);
    const id = window.setInterval(() => {
      i += 1;
      setStep(stops[i % stops.length]);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const current = SCALE[step];
  const left = `calc(${((step + 0.5) / SCALE.length) * 100}% - 1px)`;

  return (
    <figure className="strip" aria-labelledby="strip-caption">
      <div className="strip-track">
        <ul className="strip-scale">
          {SCALE.map((level) => (
            <li key={level.name.en} className="strip-step" style={{ background: level.hex }} />
          ))}
        </ul>
        <div className="strip-marker" style={{ left }} aria-hidden="true" />
      </div>
      <figcaption className="strip-legend" id="strip-caption">
        <span>
          {UI.reading[lang]} <b>{current.name[lang]}</b>
        </span>
        <span>{UI.stripLegend[lang]}</span>
      </figcaption>
    </figure>
  );
}

/** Level 1–6 on that same scale, so a claim of skill carries the same units as the data. */
function SkillDots({ level, name, lang }: { level: number; name: string; lang: Lang }) {
  const label = UI.skillLevelOf[lang]
    .replace("%1", String(level))
    .replace("%2", String(SCALE.length));
  return (
    <span className="dots" role="img" aria-label={`${name}: ${label}`}>
      {SCALE.map((scaleLevel, i) => (
        <span
          key={scaleLevel.name.en}
          className={`dot${i < level ? " on" : ""}`}
          style={i < level ? { background: scaleLevel.hex } : undefined}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function SkillRow({ skill, lang }: { skill: Skill; lang: Lang }) {
  return (
    <li className="skill">
      <div className="skill-head">
        <span className="skill-name">{skill.name}</span>
        <SkillDots level={skill.level} name={skill.name} lang={lang} />
      </div>
      {skill.note && <span className="skill-note">{skill.note[lang]}</span>}
    </li>
  );
}

export default function App() {
  useSmoothScroll();
  const workRef = useReveal<HTMLElement>();
  const skillsRef = useReveal<HTMLElement>();
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (l: L) => l[lang];

  return (
    <>
      <a className="skip-link" href="#main">
        {t(UI.skipLink)}
      </a>

      <header className="shell hero">
        <p className="hero-name">
          <span>{HERO.name}</span>
          <span className="hero-meta">
            <span>{t(HERO.location)}</span>
            {/* A select, not a cycle button: four languages would make a Romanian speaker
                press a toggle three times to reach their own. */}
            <select
              className="lang-toggle"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              aria-label={t(UI.langToggleLabel)}
            >
              {LANGS.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </span>
        </p>
        <h1 className="hero-thesis">
          {t(HERO.h1Pre)}
          <em>{t(HERO.h1Em)}</em>
          {t(HERO.h1Post)}
        </h1>
        <p className="hero-role">{t(HERO.role)}</p>
        <MeasurementStrip lang={lang} />
      </header>

      <main id="main">
        <section className="shell section reveal" ref={workRef} aria-labelledby="work-title">
          <p className="eyebrow">{t(WORK.eyebrow)}</p>
          <div className="work-grid">
            <div>
              <div className="work-head">
                <img className="work-icon" src={WORK.icon} alt={t(WORK.iconAlt)} />
                <h2 className="section-title" id="work-title">
                  {WORK.title}
                </h2>
              </div>
              <p className="work-subtitle">{t(WORK.subtitle)}</p>
              <div className="prose">
                {WORK.body.map((paragraph) => (
                  <p key={paragraph.en.slice(0, 24)}>{t(paragraph)}</p>
                ))}
              </div>
            </div>
            <dl className="facts">
              {WORK.facts.map((fact) => (
                <div key={fact.label.en}>
                  <dt>{t(fact.label)}</dt>
                  <dd>{t(fact.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="shell section reveal" ref={skillsRef} aria-labelledby="skills-title">
          <p className="eyebrow">{t(WORK.skillsEyebrow)}</p>
          <h2 className="section-title" id="skills-title">
            {t(WORK.skillsTitle)}
          </h2>
          <p className="prose">{t(WORK.skillsProse)}</p>
          <div className="skill-groups">
            {SKILL_GROUPS.map((group) => (
              <article className="skill-group" key={group.title.en}>
                <h3>{t(group.title)}</h3>
                <p>{t(group.blurb)}</p>
                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} lang={lang} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <span>
          &copy; {new Date().getFullYear()} {HERO.name}
        </span>
        <span>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {" · "}
          <a href={LINKS.email}>{t(UI.footerEmail)}</a>
          {" · "}
          <a href={LINKS.privacy}>{t(UI.footerPrivacy)}</a>
        </span>
      </footer>
    </>
  );
}
