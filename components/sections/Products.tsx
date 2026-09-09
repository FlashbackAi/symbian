"use client";

/**
 * Symbian — § 07 The module.
 *
 * Asymmetric 60/40 layout: the module on the left — a sphere wearing the loop
 * mark as its visor — with a PROTOTYPE status dot, four bullets, and the
 * Attach → See → Reason → Speak mini-flow terminating in the one number that
 * matters: 1 skill, every host. Right column stacks Teepin cloud, Skills and
 * the gimbal as status-tagged rows.
 *
 * No product artwork exists yet; every frame renders the loop mark itself.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import TeepinMark from "../svg/TeepinMark";

gsap.registerPlugin(ScrollTrigger);

type FlowStep = {
  numeral: string;
  label: string;
  verb: string;
  glyph: "mic" | "hammer" | "signal" | "lock";
};

const FLOW: FlowStep[] = [
  { numeral: "01", label: "Attach", verb: "mount · level · pair",     glyph: "lock" },
  { numeral: "02", label: "See",    verb: "look · sample · notice",   glyph: "signal" },
  { numeral: "03", label: "Reason", verb: "think · retrieve · decide", glyph: "hammer" },
  { numeral: "04", label: "Speak",  verb: "answer · or stay quiet",   glyph: "mic" },
];

type SubProduct = {
  key: string;
  numeral: string;
  name: string;
  status: "RUNNING" | "BUILDING" | "MECHANICAL";
  eta: string;
  blurb: string;
  href?: string;
};

const SUB_PRODUCTS: SubProduct[] = [
  {
    key: "cloud",
    numeral: "02",
    name: "Teepin cloud",
    status: "RUNNING",
    eta: "The platform we already build for enterprises",
    blurb: "Where the thinking happens. Symbian carries almost no intelligence of its own — the reasoning, the model calls and the retrieval all run on Teepin.",
    href: "https://teepin.com",
  },
  {
    key: "skills",
    numeral: "03",
    name: "Skills",
    status: "BUILDING",
    eta: "The unit of value",
    blurb: "A capability written once against the module's sensors, not against any single platform's SDK. That is what makes it interoperable.",
  },
  {
    key: "gimbal",
    numeral: "04",
    name: "The gimbal",
    status: "MECHANICAL",
    eta: "Version one",
    blurb: "Settles level under gravity. No firmware, no calibration, no stabilisation software. Motorised only if a host proves it needs it.",
  },
];

// One skill. The number is the argument.
const COUNT_TARGET = 1;

export default function Products() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sectionMarker = root.querySelector<HTMLElement>(
      ".products-section-marker",
    );
    const eyebrow = root.querySelector<HTMLElement>(".products-eyebrow");
    const headlineLines = root.querySelectorAll<HTMLElement>(
      ".products-headline-line",
    );
    const featured = root.querySelector<HTMLElement>(".products-featured");
    const featuredImage = root.querySelector<HTMLElement>(
      ".products-featured-image",
    );
    const featuredBullets = root.querySelectorAll<HTMLElement>(
      ".products-featured-bullet",
    );
    const flowSteps = root.querySelectorAll<HTMLElement>(".products-flow-step");
    const flowArrows = root.querySelectorAll<SVGLineElement>(
      ".products-flow-arrow",
    );
    const statNumber = root.querySelector<HTMLElement>(".products-stat-number");
    const statCaption = root.querySelector<HTMLElement>(".products-stat-caption");
    const subs = root.querySelectorAll<HTMLElement>(".products-sub");

    // Prepare arrow dasharrays so we can draw them on.
    flowArrows.forEach((line) => {
      const len = line.getTotalLength?.() ?? 0;
      if (!len) return;
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
    });

    const formatCount = (n: number) => String(Math.round(n));

    if (prefersReducedMotion()) {
      gsap.set(
        [
          sectionMarker,
          eyebrow,
          ...headlineLines,
          featured,
          featuredImage,
          ...featuredBullets,
          ...flowSteps,
          statNumber,
          statCaption,
          ...subs,
        ].filter(Boolean),
        { opacity: 1, y: 0, x: 0 },
      );
      flowArrows.forEach((a) => (a.style.strokeDashoffset = "0"));
      if (statNumber) statNumber.textContent = formatCount(COUNT_TARGET);
      return;
    }

    const triggers: ScrollTrigger[] = [];

    gsap.set(sectionMarker, { opacity: 0, y: 8 });
    gsap.set(eyebrow, { opacity: 0, y: 8 });
    gsap.set(headlineLines, { opacity: 0, y: 18 });
    gsap.set(featured, { opacity: 0, y: 24 });
    gsap.set(featuredImage, { opacity: 0, scale: 0.98 });
    gsap.set(featuredBullets, { opacity: 0, y: 10 });
    gsap.set(flowSteps, { opacity: 0, y: 8 });
    gsap.set(statNumber, { opacity: 0, y: 10 });
    gsap.set(statCaption, { opacity: 0, y: 6 });
    gsap.set(subs, { opacity: 0, x: 24 });

    // Header reveal — once on entry.
    const header = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
      defaults: { ease: "power3.out" },
    });
    header
      .to(sectionMarker, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
      .to(
        headlineLines,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        0.15,
      );
    if (header.scrollTrigger)
      triggers.push(header.scrollTrigger as ScrollTrigger);

    // Featured block — slides in first.
    const featuredTl = gsap.timeline({
      scrollTrigger: {
        trigger: featured,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });
    featuredTl
      .to(featured, { opacity: 1, y: 0, duration: 0.7 }, 0)
      .to(featuredImage, { opacity: 1, scale: 1, duration: 0.8 }, 0.05)
      .to(
        featuredBullets,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
        0.25,
      )
      .to(
        flowSteps,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
        0.55,
      );

    flowArrows.forEach((arrow, i) => {
      featuredTl.to(
        arrow,
        {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.inOut",
        },
        0.7 + i * 0.12,
      );
    });

    if (featuredTl.scrollTrigger)
      triggers.push(featuredTl.scrollTrigger as ScrollTrigger);

    // Stat reveal — fires when stat enters viewport.
    const statObj = { value: 0 };
    const countTl = gsap.timeline({
      scrollTrigger: {
        trigger: statNumber,
        start: "top 88%",
        once: true,
      },
    });
    countTl
      .to(statNumber, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
      .to(statCaption, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.1)
      .to(
        statObj,
        {
          value: COUNT_TARGET,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            if (statNumber)
              statNumber.textContent = formatCount(statObj.value);
          },
        },
        0.15,
      );
    if (countTl.scrollTrigger)
      triggers.push(countTl.scrollTrigger as ScrollTrigger);

    // Sub-products stagger in from the right.
    const subsTl = gsap.timeline({
      scrollTrigger: {
        trigger: subs[0] ?? featured,
        start: "top 82%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });
    subsTl.to(subs, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.12,
    });
    if (subsTl.scrollTrigger)
      triggers.push(subsTl.scrollTrigger as ScrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="products"
      aria-labelledby="products-heading"
      className="relative w-full bg-paper overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14 pt-16 md:pt-24 pb-24 md:pb-36">
        <div className="products-section-marker flex items-center gap-4">
          <span className="block h-px w-14 bg-ink/50" aria-hidden="true" />
          <span className="font-mono text-[13px] tracking-[0.32em] uppercase text-ink">
            § 07 · THE MODULE
          </span>
        </div>

        <div className="mt-14 md:mt-20 max-w-[900px]">
          <span className="products-eyebrow block font-mono text-[10.5px] md:text-[11px] tracking-[0.3em] uppercase text-steel mb-5">
            Module // 01-04 // eyes in the box, mind in the cloud
          </span>
          <h2
            id="products-heading"
            className="font-display text-ink leading-[1.06] tracking-[-0.015em] text-[clamp(2rem,4.8vw,3.6rem)]"
          >
            <span className="products-headline-line block">
              Eyes in the box.
            </span>
            <span className="products-headline-line block">
              Mind in the <span className="text-hotrod">cloud</span>.
            </span>
          </h2>
        </div>

        {/* 60 / 40 grid */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[1.5fr_1px_1fr] gap-10 lg:gap-0">
          {/* Featured — the module */}
          <Featured />

          {/* Vertical hairline rule (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block w-px bg-hairline mx-10"
          />

          {/* Sub-products stack — plate rows, hairline-ruled */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-steel">
                index · 02 → 04
              </span>
              <span className="block h-px flex-1 bg-ink/20" aria-hidden="true" />
            </div>
            {SUB_PRODUCTS.map((p, i) => (
              <SubCard key={p.key} p={p} first={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Featured block — the module
   ─────────────────────────────────────────────── */

function Featured() {
  return (
    <article className="products-featured lg:pr-10">
      {/* Status row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StatusDot />
          <span className="font-mono text-[10.5px] tracking-[0.32em] uppercase text-signal">
            PROTOTYPE · MODULE
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-steel">
          01 · the module
        </span>
      </div>

      {/* Top: phone placeholder + copy */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-start">
        {/* The module — a sphere wearing the loop mark as its visor */}
        <div
          className="products-featured-image relative shrink-0 mx-auto sm:mx-0"
          style={{ width: 280, height: 280 }}
        >
          {/* Drafting corner marks */}
          <CornerMarks />
          <div className="relative w-full h-full border border-ink/70 bg-paper-raised overflow-hidden rounded-full flex items-center justify-center">
            <TeepinMark
              size={196}
              className="text-ink"
              title="The Symbian module: a sphere whose visor is the loop mark — two lenses, three lines each"
            />
            {/* Thin inner hairline — the gimbal ring */}
            <div className="absolute inset-3 border border-hairline rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Copy + bullets */}
        <div>
          <h3 className="font-display text-ink text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.08] tracking-[-0.015em]">
            A stabilized pair of eyes.
          </h3>
          <p className="mt-3 text-ink-soft text-[15px] leading-[1.55] max-w-[46ch]">
            A sphere with a visor across the front. Behind the visor, the
            cameras. A microphone to hear you, a speaker to answer. No mouth,
            because the speaker is the mouth.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              ["visor & cameras", "the face is nothing but eyes."],
              ["mic & speaker", "it hears you, and it answers."],
              [
                "mechanical gimbal",
                "holds level while the host does whatever the host does.",
              ],
              [
                "a radio",
                "almost no intelligence of its own; the thinking happens elsewhere.",
              ],
            ].map(([label, body]) => (
              <li
                key={label}
                className="products-featured-bullet flex items-baseline gap-3"
              >
                <span className="block w-1.5 h-1.5 mt-[9px] bg-hotrod shrink-0" />
                <span>
                  <span className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-ink">
                    {label}
                  </span>
                  <span className="block text-ink-soft text-[14px] leading-[1.5] mt-1">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mini-flow */}
      <div className="mt-14 border-t border-ink/15 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="block h-px w-10 bg-ink/40" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-steel">
            flow · 04 · attach → speak
          </span>
        </div>

        <Flow />

        {/* Stat */}
        <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="products-stat-caption block font-mono text-[10.5px] tracking-[0.3em] uppercase text-steel mb-2">
              skill · written once · every host
            </span>
            <span
              className="products-stat-number block font-display text-ink leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,4rem)]"
              aria-live="polite"
            >
              0
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-steel max-w-[22ch] text-right">
            the same skill on every host it meets
          </span>
        </div>
      </div>
    </article>
  );
}

function Flow() {
  // Blueprint station diagram — glyphs, dashed connectors, shared hairline track with ticks.
  return (
    <div className="relative">
      {/* Desktop / tablet: 4-across stations */}
      <div className="hidden sm:block">
        <div className="relative grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-0">
          {FLOW.map((step, i) => (
            <div key={step.numeral} className="contents">
              <FlowStation step={step} />
              {i < FLOW.length - 1 && <FlowConnector />}
            </div>
          ))}
        </div>

        {/* Track line + station ticks beneath */}
        <div className="relative mt-4 h-px">
          <div className="thesis-track-fill absolute inset-0 bg-ink/40" />
          {[0, 33.33, 66.66, 100].map((p) => (
            <span
              key={p}
              className="absolute w-px h-[9px] bg-ink/60 -translate-x-1/2"
              style={{ left: `${p}%`, top: "-4px" }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Dimension rule below the track */}
        <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.3em] uppercase text-steel">
          <span>input</span>
          <span className="flex items-center gap-2 text-ink/70">
            <span className="block h-px w-10 bg-ink/30" />
            host-blind · end to end
            <span className="block h-px w-10 bg-ink/30" />
          </span>
          <span>output</span>
        </div>
      </div>

      {/* Mobile: 2×2 grid, no connectors */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        {FLOW.map((step) => (
          <FlowStation key={step.numeral} step={step} mobile />
        ))}
      </div>
    </div>
  );
}

function FlowStation({ step, mobile = false }: { step: FlowStep; mobile?: boolean }) {
  return (
    <div className={`products-flow-step relative ${mobile ? "border border-ink/20 p-3" : "px-2"}`}>
      {!mobile && <FlowStationMarks />}

      {/* Numeral */}
      <span className="block font-mono text-[9.5px] tracking-[0.32em] uppercase text-gold">
        {step.numeral}
      </span>

      {/* Glyph */}
      <div className="mt-2 h-9 flex items-center">
        <FlowGlyph kind={step.glyph} />
      </div>

      {/* Label */}
      <span className="block mt-2 font-display text-ink text-[clamp(1.05rem,1.55vw,1.35rem)] leading-[1.08] tracking-[-0.015em]">
        {step.label}
      </span>

      {/* Verb caption */}
      <span className="block mt-1.5 font-mono text-[9px] tracking-[0.22em] uppercase text-steel leading-[1.5]">
        {step.verb}
      </span>
    </div>
  );
}

function FlowStationMarks() {
  // Tiny corner ticks — blueprint drafting cue at top of each station.
  return (
    <>
      <span className="absolute -top-1.5 left-0 w-[8px] h-px bg-ink/50" aria-hidden="true" />
      <span className="absolute -top-1.5 left-0 w-px h-[6px] bg-ink/50" aria-hidden="true" />
    </>
  );
}

function FlowConnector() {
  // Dashed hairline arrow between stations — path-drawn by GSAP.
  return (
    <svg
      className="self-center mx-3 shrink-0"
      width="40"
      height="10"
      viewBox="0 0 40 10"
      aria-hidden="true"
    >
      <line
        className="products-flow-arrow"
        x1="0"
        y1="5"
        x2="34"
        y2="5"
        stroke="#0B0D10"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <line
        className="products-flow-arrow"
        x1="30"
        y1="1.5"
        x2="34"
        y2="5"
        stroke="#0B0D10"
        strokeOpacity="0.75"
        strokeWidth="1"
      />
      <line
        className="products-flow-arrow"
        x1="30"
        y1="8.5"
        x2="34"
        y2="5"
        stroke="#0B0D10"
        strokeOpacity="0.75"
        strokeWidth="1"
      />
    </svg>
  );
}

function FlowGlyph({ kind }: { kind: FlowStep["glyph"] }) {
  const stroke = "#0B0D10";
  const sw = 1.25;
  switch (kind) {
    case "mic":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="11" y="4" width="6" height="12" rx="3" stroke={stroke} strokeWidth={sw} />
          <path d="M7 13 C7 17, 10 20, 14 20 C18 20, 21 17, 21 13" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <line x1="14" y1="20" x2="14" y2="24" stroke={stroke} strokeWidth={sw} />
          <line x1="10" y1="24" x2="18" y2="24" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "hammer":
      // Stacked strata / build layers
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="4" y="18" width="20" height="4" stroke={stroke} strokeWidth={sw} />
          <rect x="6" y="12" width="16" height="4" stroke={stroke} strokeWidth={sw} />
          <rect x="8" y="6"  width="12" height="4" stroke={stroke} strokeWidth={sw} />
          <line x1="14" y1="4" x2="14" y2="6" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "signal":
      // Concentric arcs radiating from a point
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="18" r="1.8" fill={stroke} />
          <path d="M8 16 C10 13, 18 13, 20 16" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5 14 C8 9, 20 9, 23 14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M2 12 C6 5, 22 5, 26 12" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="6" y="12" width="16" height="12" stroke={stroke} strokeWidth={sw} />
          <path d="M9 12 V9 C9 6, 11 4, 14 4 C17 4, 19 6, 19 9 V12" stroke={stroke} strokeWidth={sw} />
          <circle cx="14" cy="17" r="1.6" fill={stroke} />
          <line x1="14" y1="18" x2="14" y2="21" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
  }
}

/* ───────────────────────────────────────────────
   Sub-product card
   ─────────────────────────────────────────────── */

function SubCard({ p, first = false }: { p: SubProduct; first?: boolean }) {
  const statusColor =
    p.status === "RUNNING"
      ? "text-signal"
      : p.status === "BUILDING"
        ? "text-hud-deep"
        : "text-steel";
  const statusDot =
    p.status === "RUNNING"
      ? "bg-signal"
      : p.status === "BUILDING"
        ? "bg-hud-deep"
        : "bg-steel";

  return (
    <article
      className={`products-sub group relative py-6 ${
        first ? "border-t border-ink/30" : ""
      } border-b border-ink/20 transition-colors duration-300 hover:border-b-ink/60`}
    >
      {/* Top row: numeral + status/ETA + (desktop) preview thumb */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-wrap">
          <span className="font-display text-ink/25 text-[clamp(2rem,3vw,3rem)] leading-[0.9] tracking-[-0.02em] group-hover:text-ink/45 transition-colors duration-300">
            {p.numeral}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 border border-current/30 px-2 py-[3px] font-mono text-[9px] tracking-[0.32em] uppercase ${statusColor}`}
          >
            <span className={`block h-[5px] w-[5px] ${statusDot}`} />
            {p.status}
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-steel">
            · {p.eta}
          </span>
        </div>

        {/* Preview thumb — desktop only (mobile moves it below) */}
        <div className="hidden sm:block relative shrink-0 w-[104px] h-[80px]">
          <SubCornerMarks />
          <div className="relative w-full h-full border border-ink/50 bg-paper-sunk overflow-hidden flex items-center justify-center">
            <TeepinMark
              size={72}
              className="text-ink/70 transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <span className="block mt-1.5 font-mono text-[8.5px] tracking-[0.28em] uppercase text-steel text-right">
            preview · {p.key}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-4 font-display text-ink text-[clamp(1.5rem,2vw,1.7rem)] leading-[1.06] tracking-[-0.015em]">
        {p.href ? (
          <a
            href={p.href}
            className="hover:text-hud-deep transition-colors duration-220"
          >
            {p.name}
          </a>
        ) : (
          p.name
        )}
      </h3>

      {/* Blurb */}
      <p className="mt-2 text-ink-soft text-[14px] leading-[1.55] max-w-[46ch]">
        {p.blurb}
      </p>

      {/* Mobile preview thumb + view-spec row */}
      <div className="mt-4 flex items-end justify-between gap-4 sm:mt-3">
        <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.3em] uppercase text-steel opacity-70 group-hover:opacity-100 group-hover:text-ink transition-all duration-300">
          <span>{p.href ? "visit" : "more soon"}</span>
          <span
            className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
            aria-hidden="true"
          />
        </div>

        <div className="sm:hidden relative shrink-0 w-[96px] h-[64px]">
          <SubCornerMarks />
          <div className="relative w-full h-full border border-ink/50 bg-paper-sunk overflow-hidden flex items-center justify-center">
            <TeepinMark size={64} className="text-ink/70" />
          </div>
        </div>
      </div>
    </article>
  );
}

function SubCornerMarks() {
  const base = "absolute w-[7px] h-[7px] pointer-events-none";
  const corners = [
    { cls: "-top-1.5 -left-1.5" },
    { cls: "-top-1.5 -right-1.5" },
    { cls: "-bottom-1.5 -left-1.5" },
    { cls: "-bottom-1.5 -right-1.5" },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span key={i} className={`${base} ${c.cls}`} aria-hidden="true">
          <span className="absolute top-1/2 left-0 right-0 h-px bg-ink/60" />
          <span className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/60" />
        </span>
      ))}
    </>
  );
}

/* ───────────────────────────────────────────────
   Small primitives
   ─────────────────────────────────────────────── */

function StatusDot() {
  return (
    <span className="inline-flex" aria-hidden="true">
      <span className="block h-[7px] w-[7px] rounded-full bg-signal" />
    </span>
  );
}

function CornerMarks() {
  const base = "absolute w-[10px] h-[10px] pointer-events-none";
  const corners = [
    { cls: "-top-3 -left-3" },
    { cls: "-top-3 -right-3" },
    { cls: "-bottom-3 -left-3" },
    { cls: "-bottom-3 -right-3" },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span key={i} className={`${base} ${c.cls}`} aria-hidden="true">
          <span className="absolute top-1/2 left-0 right-0 h-px bg-ink/55" />
          <span className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/55" />
        </span>
      ))}
    </>
  );
}
