"use client";

/**
 * Symbian — § 03 One skill, every host.
 *
 * The signature moment. The module — a sphere wearing the loop mark as its
 * visor, cradled in a gimbal — stays pinned dead-centre and never moves a
 * pixel. The host underneath it MORPHS: warehouse quadruped → motorcycle →
 * quadcopter → a shelf watching a doorway. One intelligence, many hosts,
 * demonstrated rather than claimed.
 *
 * How the morph is built (see hostPaths.ts for the geometry rules):
 *   - 19 semantic slots, one <path> each, one tween each. MorphSVGPlugin
 *     re-sorts the subpaths of a compound path by bbox size, so a single
 *     compound path per host would scramble part-to-part correspondence.
 *   - One paused timeline: [hold .6][morph 1]×3 [hold .6]. Inside each morph
 *     window the slots are staggered supports-first (slotStagger), which is
 *     what keeps the midpoint frames legible instead of soup.
 *   - ScrollTrigger with scrub: 0.8 — a numeric scrub, so stepped wheel input
 *     is smoothed into a continuous, fully reversible morph. No pin: the stage
 *     is CSS position:sticky, so the user's scroll speed stays theirs.
 *   - The mount plate (s02) lands on y=242 in every host, and the module lives
 *     in its own untouched <svg> above the host layer — it is pinned by
 *     construction, not by animation.
 *   - A hairline crosshair blinks at the mount point during each morph: the
 *     one fixed thing while everything else changes.
 *
 * prefers-reduced-motion: no GSAP at all (gated by gsap.matchMedia). The
 * sticky stage is replaced by a static row of all four hosts, each wearing the
 * same module. Same argument, no movement.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  HOSTS,
  HOST_ORDER,
  HOST_CAPTIONS,
  HOST_ALTS,
  SLOTS,
  slotStagger,
  type HostKey,
} from "./hostPaths";
import { MARK_PATH, MARK_BARS, MARK_STROKE, MARK_W, MARK_H } from "../svg/TeepinMark";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

/* Plate geometry — shared by the host layer and the module layer. */
const VB_W = 600;
const VB_H = 420;
const MX = 300; // module centre x
const MY = 150; // module centre y
const SPHERE_R = 64;
const RING_R = 82;
const MOUNT_Y = 242; // the surface every host presents to the gimbal stem

// Visor: the loop mark scaled across the sphere's face.
const VISOR_W = 118;
const VISOR_SCALE = VISOR_W / MARK_W;
const VISOR_TX = MX - VISOR_W / 2;
const VISOR_TY = MY - (MARK_H * VISOR_SCALE) / 2;

/* Timeline shape, in arbitrary units. */
const HOLD = 0.6;
const MORPH = 1;
const TOTAL = HOLD * 4 + MORPH * 3; // 5.4

/** Caption switches at each morph's midpoint. */
function hostIndexAt(t: number): number {
  if (t < HOLD + MORPH / 2) return 0;
  if (t < HOLD * 2 + MORPH * 1.5) return 1;
  if (t < HOLD * 3 + MORPH * 2.5) return 2;
  return 3;
}

export default function Hosts() {
  const rootRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const hostGroupRef = useRef<SVGGElement>(null);
  const crossRef = useRef<SVGGElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const runway = runwayRef.current;
    const group = hostGroupRef.current;
    if (!runway || !group) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        // Three morph windows, each staggered supports-first.
        for (let i = 0; i < HOST_ORDER.length - 1; i++) {
          const to = HOSTS[HOST_ORDER[i + 1]];
          const at = HOLD * (i + 1) + MORPH * i;

          for (const slot of SLOTS) {
            const el = group.querySelector<SVGPathElement>(`[data-slot="${slot}"]`);
            if (!el) continue;
            const { at: offset, duration } = slotStagger(slot);
            tl.to(
              el,
              {
                duration,
                ease: "power2.inOut",
                morphSVG: { shape: to[slot], type: "linear", shapeIndex: "auto" },
              },
              at + offset,
            );
          }

          // The crosshair marks the one thing that isn't moving.
          if (crossRef.current) {
            tl.to(crossRef.current, { opacity: 1, duration: 0.2 }, at)
              .to(crossRef.current, { opacity: 0, duration: 0.25 }, at + MORPH - 0.25);
          }
        }

        // A no-op tail tween so the last host gets a real hold at the end of
        // the runway. Without it the timeline's duration is set by the final
        // morph (4.8), the shelf never settles, and every caption fires early.
        tl.to({}, { duration: HOLD }, HOLD * 3 + MORPH * 3);

        // Pre-init every tween so the first scrub is not the first render.
        tl.progress(1, true).progress(0, true);

        // Caption is driven straight from the timeline — never React state.
        let shown = -1;
        const sync = () => {
          const idx = hostIndexAt(tl.progress() * TOTAL);
          if (idx !== shown && captionRef.current) {
            shown = idx;
            captionRef.current.textContent = HOST_CAPTIONS[HOST_ORDER[idx]];
          }
        };
        tl.eventCallback("onUpdate", sync);
        sync();

        return () => {
          tl.eventCallback("onUpdate", null);
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
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

      {/* Sticky stage — the host morphs; the module holds still */}
      <div
        ref={runwayRef}
        id="hosts-runway"
        className="relative motion-reduce:hidden"
        style={{ height: "460vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div
            className="relative w-[min(92vw,660px)]"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            {/* Host layer — 19 slots, each morphing independently */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full text-steel"
              aria-hidden="true"
            >
              <g
                ref={hostGroupRef}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {SLOTS.map((slot) => (
                  <path key={slot} data-slot={slot} d={HOSTS.quadruped[slot]} />
                ))}
              </g>
              {/* Mount crosshair — visible only while a host is changing */}
              <g
                ref={crossRef}
                fill="none"
                stroke="var(--color-hud)"
                strokeWidth="1"
                opacity="0"
              >
                <path d={`M ${MX - 14} ${MOUNT_Y} H ${MX + 14}`} />
                <path d={`M ${MX} ${MOUNT_Y - 14} V ${MOUNT_Y + 14}`} />
                <path
                  d={`M ${MX} ${MOUNT_Y - 7} A 7 7 0 0 1 ${MX} ${MOUNT_Y + 7} A 7 7 0 0 1 ${MX} ${MOUNT_Y - 7} Z`}
                  strokeOpacity="0.55"
                />
              </g>
            </svg>

            {/* Module layer — its own <svg>, never touched by the timeline */}
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
            <span ref={captionRef}>{HOST_CAPTIONS.quadruped}</span>
          </p>
        </div>
      </div>

      {/* Reduced-motion fallback — same argument, no movement */}
      <div className="hidden motion-reduce:grid relative mx-auto max-w-[1280px] px-6 md:px-14 mt-16 grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {HOST_ORDER.map((key) => (
          <figure key={key} className="m-0">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="w-full h-auto text-steel"
              role="img"
              aria-label={HOST_ALTS[key]}
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {SLOTS.map((slot) => (
                  <path key={slot} d={HOSTS[key][slot]} />
                ))}
              </g>
              <ModuleArt />
            </svg>
            <figcaption className="mt-3 font-mono text-[9.5px] tracking-[0.28em] uppercase text-steel text-center">
              {HOST_CAPTIONS[key]}
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
   The module — sphere, loop-mark visor, gimbal cradle.
   Drawn in ink so it reads above the steel host.
   ─────────────────────────────────────────────── */

function ModuleArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Gimbal cradle — lower semicircle, two pivots, stem to the mount */}
      <path
        d={`M ${MX - RING_R} ${MY} A ${RING_R} ${RING_R} 0 0 0 ${MX + RING_R} ${MY}`}
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <circle cx={MX - RING_R} cy={MY} r="4" fill="var(--color-ink)" />
      <circle cx={MX + RING_R} cy={MY} r="4" fill="var(--color-ink)" />
      <path
        d={`M ${MX} ${MY + RING_R} V ${MOUNT_Y}`}
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

export type { HostKey };
