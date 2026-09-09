"use client";

/**
 * Symbian — § 03 One skill, every host.
 *
 * The signature moment. The module — the loop mark as a visor on a sphere,
 * cradled in a gimbal ring — stays pinned dead-centre and never moves a
 * pixel. The host underneath it changes as you scroll: warehouse quadruped →
 * motorcycle → drone → a shelf watching a doorway. Sticky positioning, not
 * scroll-hijacking: the user's scroll speed stays theirs; a single GSAP
 * scrub drives host opacity and the caption. Nothing else in the section
 * animates.
 *
 * Reduced motion: the sticky stage is swapped for a static row of all four
 * hosts, each wearing the same module. Same argument, no movement.
 *
 * Hosts are hand-drawn line art in one shared 600×420 plate; the module's
 * mount point is (300, 242) in every drawing so the stack always lines up.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { MARK_PATH, MARK_BARS, MARK_STROKE, MARK_W, MARK_H } from "../svg/TeepinMark";

gsap.registerPlugin(ScrollTrigger);

type HostKey = "quadruped" | "motorcycle" | "drone" | "shelf";

type Host = {
  key: HostKey;
  caption: string;
  alt: string;
};

const HOSTS: Host[] = [
  {
    key: "quadruped",
    caption: "host 01 · warehouse quadruped",
    alt: "A four-legged robot with the Symbian module mounted on its back",
  },
  {
    key: "motorcycle",
    caption: "host 02 · motorcycle",
    alt: "A motorcycle with the Symbian module clipped above the tank",
  },
  {
    key: "drone",
    caption: "host 03 · drone",
    alt: "A quadcopter drone carrying the Symbian module on top",
  },
  {
    key: "shelf",
    caption: "host 04 · a shelf watching a doorway",
    alt: "The Symbian module sitting on a wall shelf beside a doorway",
  },
];

/* Plate geometry — shared by every drawing. */
const VB_W = 600;
const VB_H = 420;
const MX = 300; // module centre x
const MY = 150; // module centre y
const SPHERE_R = 64;
const RING_R = 82;

// Visor: the loop mark scaled to sit across the sphere's face.
const VISOR_W = 118;
const VISOR_SCALE = VISOR_W / MARK_W;
const VISOR_TX = MX - VISOR_W / 2;
const VISOR_TY = MY - (MARK_H * VISOR_SCALE) / 2;

export default function Hosts() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRefs = useRef<(SVGSVGElement | null)[]>([]);
  const captionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (prefersReducedMotion()) return;

    const hosts = hostRefs.current.filter(Boolean) as SVGSVGElement[];
    const caption = captionRef.current;
    const last = HOSTS.length - 1;

    // Crossfade with a short plateau on each host so every one gets a beat.
    const apply = (p: number) => {
      const t = p * last;
      hosts.forEach((el, i) => {
        const d = Math.abs(t - i);
        const o = Math.max(0, Math.min(1, (1 - d) * 1.8));
        el.style.opacity = String(o);
      });
      if (caption) {
        const idx = Math.max(0, Math.min(last, Math.round(t)));
        caption.textContent = HOSTS[idx].caption;
      }
    };

    apply(0);
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => apply(self.progress),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="hosts"
      aria-labelledby="hosts-heading"
      className="relative w-full bg-paper"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline opacity-[0.3] pointer-events-none"
      />

      {/* Header */}
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14 pt-16 md:pt-24">
        <div className="flex items-center gap-4">
          <span className="block h-px w-14 bg-ink/50" aria-hidden="true" />
          <span className="font-mono text-[13px] tracking-[0.32em] uppercase text-ink">
            § 03 · ONE SKILL, EVERY HOST
          </span>
        </div>

        <div className="mt-14 md:mt-20 max-w-[860px]">
          <span className="block font-mono text-[10.5px] md:text-[11px] tracking-[0.3em] uppercase text-steel mb-5">
            Skills // one module // four hosts // the module never moves
          </span>
          <h2
            id="hosts-heading"
            className="font-display text-ink leading-[1.06] tracking-[-0.015em] text-[clamp(2rem,4.8vw,3.6rem)]"
          >
            Learn it once. It works on all of them.
          </h2>
          <p className="mt-6 text-ink-soft text-[15px] md:text-[16px] max-w-[64ch] leading-[1.55]">
            A capability on Symbian is called a skill, and skills do not belong
            to a platform. The same skill runs whether the module is riding a
            warehouse quadruped, clipped to a motorcycle, or sitting on a shelf
            watching a doorway. You do not buy a version for each machine. You
            buy it once and it follows the module.
          </p>
        </div>
      </div>

      {/* Sticky stage — the module holds still; the host changes beneath it */}
      <div
        ref={wrapRef}
        className="relative motion-reduce:hidden"
        style={{ height: "320vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div
            className="relative w-[min(92vw,640px)]"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            {HOSTS.map((h, i) => (
              <svg
                key={h.key}
                ref={(el) => {
                  hostRefs.current[i] = el;
                }}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 w-full h-full text-steel"
                aria-hidden="true"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <HostArt kind={h.key} />
              </svg>
            ))}
            {/* The module layer — one element, never re-rendered, never moved */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              role="img"
              aria-label="The Symbian module: a sphere wearing the loop mark as its visor, cradled in a gimbal ring, held perfectly still while the host beneath it changes"
            >
              <ModuleArt />
            </svg>
          </div>

          <p className="mt-6 md:mt-8 font-mono text-[10.5px] tracking-[0.3em] uppercase text-steel">
            <span ref={captionRef}>{HOSTS[0].caption}</span>
          </p>
        </div>
      </div>

      {/* Reduced-motion fallback — same argument, no movement */}
      <div className="hidden motion-reduce:grid relative mx-auto max-w-[1280px] px-6 md:px-14 mt-16 grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {HOSTS.map((h) => (
          <figure key={h.key} className="m-0">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="w-full h-auto text-steel"
              role="img"
              aria-label={h.alt}
            >
              <HostArt kind={h.key} />
              <ModuleArt />
            </svg>
            <figcaption className="mt-3 font-mono text-[9.5px] tracking-[0.28em] uppercase text-steel text-center">
              {h.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Closing line */}
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14 pt-12 md:pt-16 pb-24 md:pb-36">
        <p className="font-display text-ink leading-[1.3] tracking-[-0.01em] text-[clamp(1.3rem,2.4vw,1.9rem)] max-w-[54ch]">
          It is the way your headphones follow you between your phone and your
          laptop, applied to machines that cost a hundred times more.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   The module — sphere, visor, gimbal cradle.
   Drawn in ink so it reads above the steel hosts.
   ─────────────────────────────────────────────── */

function ModuleArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Gimbal cradle — lower semicircle + two pivots + stem to the mount */}
      <path
        d={`M ${MX - RING_R} ${MY} A ${RING_R} ${RING_R} 0 0 0 ${MX + RING_R} ${MY}`}
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <circle cx={MX - RING_R} cy={MY} r="4" fill="var(--color-ink)" />
      <circle cx={MX + RING_R} cy={MY} r="4" fill="var(--color-ink)" />
      <path
        d={`M ${MX} ${MY + RING_R} V 242`}
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      {/* Sphere */}
      <circle
        cx={MX}
        cy={MY}
        r={SPHERE_R}
        fill="var(--color-paper-raised)"
        stroke="var(--color-ink)"
        strokeWidth="1.75"
      />
      {/* Visor — the loop mark */}
      <g
        transform={`translate(${VISOR_TX} ${VISOR_TY}) scale(${VISOR_SCALE})`}
        stroke="var(--color-ink)"
        strokeWidth={MARK_STROKE}
      >
        <path d={MARK_PATH} />
        {MARK_BARS.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      {/* Speaker grille — the mouth is the speaker, so there is no mouth */}
      {[-10, 0, 10].map((dx) => (
        <line
          key={dx}
          x1={MX + dx}
          y1={MY + 44}
          x2={MX + dx}
          y2={MY + 50}
          stroke="var(--color-ink)"
          strokeOpacity="0.5"
          strokeWidth="1.25"
        />
      ))}
    </g>
  );
}

/* ───────────────────────────────────────────────
   Hosts — hairline line art, all mounting at (300, 242).
   ─────────────────────────────────────────────── */

function HostArt({ kind }: { kind: HostKey }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "quadruped":
      return (
        <g {...common}>
          {/* mount plate */}
          <path d="M 282 242 V 236 H 318 V 242" />
          {/* body */}
          <rect x="190" y="242" width="220" height="62" rx="14" />
          <line x1="205" y1="273" x2="395" y2="273" strokeOpacity="0.35" />
          {/* head */}
          <path d="M 410 252 L 448 244 L 454 270 L 416 278 Z" />
          <circle cx="440" cy="257" r="3" fill="currentColor" />
          {/* legs — front pair, back pair */}
          <path d="M 218 304 L 204 352 L 226 396" />
          <path d="M 250 304 L 244 352 L 258 396" />
          <path d="M 350 304 L 364 352 L 344 396" />
          <path d="M 382 304 L 392 352 L 372 396" />
          {/* feet */}
          <path d="M 220 396 H 234 M 252 396 H 266 M 336 396 H 350 M 364 396 H 378" />
          {/* ground */}
          <line x1="120" y1="400" x2="480" y2="400" strokeOpacity="0.4" />
        </g>
      );
    case "motorcycle":
      return (
        <g {...common}>
          {/* mount stem to the tank */}
          <path d="M 300 242 V 252" />
          {/* wheels */}
          <circle cx="175" cy="335" r="48" />
          <circle cx="175" cy="335" r="12" />
          <circle cx="425" cy="335" r="48" />
          <circle cx="425" cy="335" r="12" />
          {/* frame */}
          <path d="M 175 335 L 235 262 L 330 262 L 372 300 L 425 335" />
          <path d="M 235 262 L 205 335" />
          <path d="M 330 262 L 300 335" strokeOpacity="0.5" />
          {/* tank + seat */}
          <path d="M 252 262 Q 300 232 336 262" />
          <path d="M 232 258 L 292 250" />
          {/* fork + handlebar */}
          <path d="M 425 335 L 392 248" />
          <path d="M 378 250 L 410 246" />
          {/* ground */}
          <line x1="100" y1="383" x2="500" y2="383" strokeOpacity="0.4" />
        </g>
      );
    case "drone":
      return (
        <g {...common}>
          {/* body — the module sits directly on it */}
          <rect x="258" y="242" width="84" height="28" rx="10" />
          {/* arms */}
          <path d="M 262 256 L 158 222 M 338 256 L 442 222" />
          <path d="M 262 256 L 158 292 M 338 256 L 442 292" />
          {/* rotors */}
          {[
            [158, 222],
            [442, 222],
            [158, 292],
            [442, 292],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <ellipse cx={cx} cy={cy} rx="46" ry="8" strokeOpacity="0.7" />
              <circle cx={cx} cy={cy} r="5" />
            </g>
          ))}
          {/* landing legs */}
          <path d="M 276 270 L 266 302 M 324 270 L 334 302" />
          {/* shadow */}
          <ellipse
            cx="300"
            cy="400"
            rx="90"
            ry="6"
            strokeOpacity="0.35"
            strokeDasharray="3 6"
          />
        </g>
      );
    case "shelf":
      return (
        <g {...common}>
          {/* shelf under the module */}
          <rect x="232" y="242" width="136" height="8" />
          <path d="M 252 250 V 278 L 280 250" />
          <path d="M 348 250 V 278 L 320 250" />
          {/* wall line the shelf hangs on */}
          <line x1="110" y1="400" x2="110" y2="90" strokeOpacity="0.35" />
          {/* doorway, off to the right — what the module is watching */}
          <path d="M 400 400 V 104 H 546 V 400" />
          <path d="M 414 400 V 118 H 532 V 400" strokeOpacity="0.45" />
          <circle cx="522" cy="262" r="3" fill="currentColor" />
          {/* ground */}
          <line x1="80" y1="400" x2="560" y2="400" strokeOpacity="0.4" />
        </g>
      );
  }
}
