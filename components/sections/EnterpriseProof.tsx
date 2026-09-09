"use client";

/**
 * Symbian — § 08 What we don't build / Partners.
 *
 * The credibility strip for hardware platforms. Mono headline + paper-sunk
 * band with four boxes naming the solved problems we defer to, then
 * the five partner promises as a hairline list. On scroll entry the boxes
 * fade and translate in with a stagger; box border and monogram transition
 * from hairline/steel → ink. Promises follow with the same stagger.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Solved = {
  id: string;
  monogram: string;
  name: string;
  solved: string;
};

/* The solved problems we defer to — a decade of other people's work that
   we will not redo. Deliberately unattributed: no partner names until
   something is signed. */
const SOLVED: Solved[] = [
  { id: "balance", monogram: "01", name: "Balance",  solved: "crossing rubble on legs" },
  { id: "flight",  monogram: "02", name: "Flight",   solved: "holding position in wind" },
  { id: "legs",    monogram: "03", name: "Legs",     solved: "cheap and capable" },
  { id: "car",     monogram: "04", name: "The car",  solved: "keeping itself in a lane" },
];

type Promise_ = { title: string; body: string };

const PROMISES: Promise_[] = [
  {
    title: "We don't build robots",
    body: "No legs, no rotors, no chassis, no drivetrain. The physical machine stays entirely the platform's work, and we're not trying to take it from them.",
  },
  {
    title: "We amplify, we don't replace",
    body: "A skill adds sight, hearing and a voice on top of what a host already does. It never asks a platform to change how it moves, balances, or flies.",
  },
  {
    title: "One skill, every partner's hardware",
    body: "The same interoperable skill runs across every platform we work with. No partner gets a worse version because they came second.",
  },
  {
    title: "Revenue that respects the platform",
    body: "Where a platform brings the customer, the platform takes its share, the way app stores do. We're a partner in the transaction, not a competitor to it.",
  },
  {
    title: "Open to co-building",
    body: "If a platform wants a skill that doesn't exist yet, we'd rather build it together than guess at it alone.",
  },
];

export default function EnterpriseProof() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sectionMarker = root.querySelector<HTMLElement>(".ep-marker");
    const headline      = root.querySelector<HTMLElement>(".ep-headline");
    const boxes         = root.querySelectorAll<HTMLElement>(".ep-box");
    const tagline       = root.querySelector<HTMLElement>(".ep-tagline");
    const promiseHead   = root.querySelector<HTMLElement>(".ep-promise-head");
    const promises      = root.querySelectorAll<HTMLElement>(".ep-promise");

    if (prefersReducedMotion()) {
      gsap.set(
        [sectionMarker, headline, ...boxes, tagline, promiseHead, ...promises].filter(Boolean),
        { opacity: 1, y: 0 },
      );
      boxes.forEach((box) => {
        box.style.borderColor = "var(--color-ink)";
        const mono = box.querySelector<HTMLElement>(".ep-monogram");
        if (mono) mono.style.color = "var(--color-ink)";
      });
      return;
    }

    gsap.set(sectionMarker, { opacity: 0, y: 8 });
    gsap.set(headline,      { opacity: 0, y: 12 });
    gsap.set(boxes,         { opacity: 0, y: 16 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 8 });
    if (promiseHead) gsap.set(promiseHead, { opacity: 0, y: 12 });
    gsap.set(promises, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
      defaults: { ease: "power3.out" },
    });

    tl.to(sectionMarker, { opacity: 1, y: 0, duration: 0.45 }, 0)
      .to(headline,      { opacity: 1, y: 0, duration: 0.55 }, 0.1)
      .to(boxes, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }, 0.22);
    if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.45 }, 0.62);

    boxes.forEach((box, i) => {
      const mono = box.querySelector<HTMLElement>(".ep-monogram");
      tl.to(
        box,
        { borderColor: "var(--color-ink)", duration: 0.35, ease: "power2.out" },
        0.32 + i * 0.1,
      );
      if (mono) {
        tl.to(
          mono,
          { color: "var(--color-ink)", duration: 0.35, ease: "power2.out" },
          0.32 + i * 0.1,
        );
      }
    });

    // Promises reveal on their own entry so they aren't stuck invisible
    // when the band is far above the fold.
    const promisesTl = gsap.timeline({
      scrollTrigger: { trigger: promiseHead ?? root, start: "top 82%", once: true },
      defaults: { ease: "power3.out" },
    });
    if (promiseHead) promisesTl.to(promiseHead, { opacity: 1, y: 0, duration: 0.5 }, 0);
    promisesTl.to(promises, { opacity: 1, y: 0, duration: 0.45, stagger: 0.09 }, 0.1);

    return () => {
      tl.kill();
      promisesTl.kill();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="partners"
      className="relative py-24 md:py-36"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-14">
        <p className="ep-marker font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)] mb-4">
          § 08 · What we don&apos;t build
        </p>

        <h2 id="partners-heading" className="ep-headline font-mono text-xl md:text-2xl tracking-widest text-[var(--color-ink)] uppercase mb-12">
          We didn&apos;t solve walking. Somebody else did.
        </h2>

        <div className="border-t border-b border-[var(--color-hairline)] bg-[var(--color-paper-sunk)] py-10 mb-10">
          <ul className="flex flex-wrap justify-center gap-8 sm:flex-nowrap sm:gap-6 md:gap-10 list-none p-0 m-0">
            {SOLVED.map((s) => (
              <li key={s.id} className="basis-[calc(50%-1rem)] sm:basis-auto flex-shrink-0 flex justify-center">
                <div
                  className="ep-box flex flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-paper-raised)] px-4 py-5"
                  style={{ width: 136, height: 112 }}
                >
                  <span
                    className="ep-monogram font-display text-[26px] leading-none text-[var(--color-steel)]"
                    aria-hidden="true"
                  >
                    {s.monogram}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] text-center leading-tight">
                    {s.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-steel)] text-center leading-tight">
                    solved · {s.solved}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="ep-tagline text-center text-sm text-[var(--color-steel)] max-w-[66ch] mx-auto leading-[1.6]">
          Symbian has no motors that move it, no chassis, no drivetrain, and no
          opinion about how your host gets from one place to another. The only
          moving part we care about is the gimbal that keeps the cameras level.
        </p>

        {/* Partner promises */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div className="ep-promise-head">
            <span className="block font-mono text-[10.5px] md:text-[11px] tracking-[0.3em] uppercase text-steel mb-5">
              Partners // 01–05 // how we work with platforms
            </span>
            <h3 className="font-display text-ink leading-[1.08] tracking-[-0.015em] text-[clamp(1.8rem,3.8vw,2.8rem)]">
              We don&apos;t compete with the hosts we ride on.
            </h3>
            <p className="mt-6 text-ink-soft text-[15px] md:text-[16px] max-w-[52ch] leading-[1.55]">
              A platform that spent a decade solving locomotion doesn&apos;t need
              us to solve it again, and we&apos;re not going to try. Symbian
              attaches, it doesn&apos;t replace &mdash; and every skill we build is
              built to make the host underneath it more capable, not to make the
              host optional.
            </p>
          </div>

          <ol className="border-t border-ink/30 list-none p-0 m-0">
            {PROMISES.map((p, i) => (
              <li
                key={p.title}
                className="ep-promise grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-5 md:py-6 border-b border-ink/20"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hud-deep pt-1">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.26em] uppercase text-ink">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-ink-soft text-[14px] md:text-[15px] leading-[1.55] max-w-[60ch]">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
