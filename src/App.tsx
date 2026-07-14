import { useEffect, useRef, useState } from "react";
import { HERO, LINKS, SCALE, SKILL_GROUPS, SUPPORT, WORK, type Skill } from "./content";

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

/**
 * The signature element: the six-step ePIN pollen-flight scale the app itself renders,
 * reused here as the site's unit of measure. The marker walks the scale the way a real
 * instrument's needle does — the page reads as a device, not a brochure.
 */
function MeasurementStrip() {
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
            <li key={level.name} className="strip-step" style={{ background: level.hex }} />
          ))}
        </ul>
        <div className="strip-marker" style={{ left }} aria-hidden="true" />
      </div>
      <figcaption className="strip-legend" id="strip-caption">
        <span>
          Reading <b>{current.name}</b>
        </span>
        <span>ePIN pollen-flight scale &middot; six levels</span>
      </figcaption>
    </figure>
  );
}

/** Level 1–6 on that same scale, so a claim of skill carries the same units as the data. */
function SkillDots({ level, name }: { level: number; name: string }) {
  return (
    <span className="dots" role="img" aria-label={`${name}: level ${level} of ${SCALE.length}`}>
      {SCALE.map((scaleLevel, i) => (
        <span
          key={scaleLevel.name}
          className={`dot${i < level ? " on" : ""}`}
          style={i < level ? { background: scaleLevel.hex } : undefined}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="skill">
      <div className="skill-head">
        <span className="skill-name">{skill.name}</span>
        <SkillDots level={skill.level} name={skill.name} />
      </div>
      {skill.note && <span className="skill-note">{skill.note}</span>}
    </li>
  );
}

export default function App() {
  const workRef = useReveal<HTMLElement>();
  const skillsRef = useReveal<HTMLElement>();
  const supportRef = useReveal<HTMLElement>();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="shell hero">
        <p className="hero-name">
          <span>{HERO.name}</span>
          <span>{HERO.location}</span>
        </p>
        <h1 className="hero-thesis">
          I build software that <em>reports the truth</em>.
        </h1>
        <p className="hero-role">
          {HERO.role}. Measured data, honest states, and interfaces that admit when they
          don&rsquo;t know &mdash; because a confident wrong answer is worse than no answer.
        </p>
        <MeasurementStrip />
      </header>

      <main id="main">
        <section className="shell section reveal" ref={workRef} aria-labelledby="work-title">
          <p className="eyebrow">{WORK.eyebrow}</p>
          <div className="work-grid">
            <div>
              <h2 className="section-title" id="work-title">
                {WORK.title}
              </h2>
              <p className="work-subtitle">{WORK.subtitle}</p>
              <div className="prose">
                {WORK.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <dl className="facts">
              {WORK.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="shell section reveal" ref={skillsRef} aria-labelledby="skills-title">
          <p className="eyebrow">What I work with</p>
          <h2 className="section-title" id="skills-title">
            Measured on the same scale as the data
          </h2>
          <p className="prose">
            Six levels, one meaning: level 1 is working knowledge, level 6 is what people call me
            for. No percentages &mdash; nobody is 95% good at Swift.
          </p>
          <div className="skill-groups">
            {SKILL_GROUPS.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.blurb}</p>
                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="shell section reveal"
          ref={supportRef}
          aria-labelledby="support-title"
          id="support"
        >
          <p className="eyebrow">{SUPPORT.eyebrow}</p>
          <h2 className="section-title" id="support-title">
            {SUPPORT.title}
          </h2>
          <p className="prose">{SUPPORT.body}</p>
          <div className="support-grid">
            {SUPPORT.options.map((option) => (
              <article className="support-card" key={option.id}>
                <h3>{option.name}</h3>
                <p>{option.pitch}</p>
                <a
                  className="support-cta"
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {option.cta}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </article>
            ))}
          </div>
          <p className="support-note">
            A tip is a thank-you, not a transaction: nothing unlocks, nothing is gated, no feature
            waits behind a payment. It funds the developer account and the evenings.
          </p>
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
          <a href={LINKS.email}>Email</a>
        </span>
      </footer>
    </>
  );
}
