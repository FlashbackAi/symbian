/**
 * Symbian — § 03 host geometry.
 *
 * Four hosts drawn as the SAME roster of 19 named stroke slots, so each slot
 * can morph independently into its counterpart. MorphSVGPlugin re-sorts the
 * subpaths of a compound path by bounding-box size, which destroys authored
 * order — so every part is its own <path> and gets its own tween. That is what
 * makes legs flow into wheels into rotor arms into shelf brackets rather than
 * into whatever happens to be nearest.
 *
 * Rules the geometry obeys:
 *   - Every closed loop starts at 12 o'clock and runs clockwise; every open
 *     path starts at the end nearest the module. This, not shapeIndex, is what
 *     stops strokes twisting mid-morph.
 *   - Closed-ness is identical per slot across all four hosts (a closed→open
 *     pair visibly unzips).
 *   - The mount plate (s02) sits at y=242 in every host — the surface the
 *     module's gimbal stem lands on.
 *   - The ground line stays at y=400; every host faces right, so the module's
 *     gaze is constant. The drone's skids lift to y=332 — it is airborne.
 *   - Circles are two half-arcs: a single arc whose end equals its start
 *     renders nothing.
 *
 * Slot roles, and how they carry across:
 *   s08/s12 support   legs → wheels → rotor discs → skirting / architrave
 *   s15/s16 foot      foot pads → seat & mudguard → landing skids → brackets
 *   s07/s11 link      hip links → frame rails → rotor arms → wall & jamb
 *   s03 body          chassis → tank → drone pod → shelf board
 *   s06 head          sensor head → headlamp → camera gimbal → door handle
 */

const f = (n: number) => Math.round(n * 10) / 10;

/** Rounded rectangle, clockwise from top-centre. */
function rrect(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h / 2);
  const cx = x + w / 2;
  return (
    `M ${f(cx)} ${y} L ${f(x + w - rr)} ${y} A ${rr} ${rr} 0 0 1 ${x + w} ${f(y + rr)} ` +
    `L ${x + w} ${f(y + h - rr)} A ${rr} ${rr} 0 0 1 ${f(x + w - rr)} ${y + h} ` +
    `L ${f(x + rr)} ${y + h} A ${rr} ${rr} 0 0 1 ${x} ${f(y + h - rr)} ` +
    `L ${x} ${f(y + rr)} A ${rr} ${rr} 0 0 1 ${f(x + rr)} ${y} Z`
  );
}

/** Ellipse as four quarter-arcs, clockwise from 12 o'clock. */
function ellipse(cx: number, cy: number, rx: number, ry: number): string {
  return (
    `M ${cx} ${cy - ry} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy} ` +
    `A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy} ` +
    `A ${rx} ${ry} 0 0 1 ${cx} ${cy - ry} Z`
  );
}

const circle = (cx: number, cy: number, r: number) => ellipse(cx, cy, r, r);

function poly(pts: ReadonlyArray<readonly [number, number]>, closed: boolean): string {
  return `M ${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L ")}${closed ? " Z" : ""}`;
}

/**
 * A slender closed outline following a centreline — a machined link rather
 * than a stick figure. Legs, forks and skids are drawn this way so they pair
 * closed↔closed with tyres and rotor guards.
 */
function limb(
  pts: ReadonlyArray<readonly [number, number]>,
  widths: readonly number[],
): string {
  const L: Array<readonly [number, number]> = [];
  const R: Array<readonly [number, number]> = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    let dx = b[0] - a[0];
    let dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    const w1 = widths[Math.min(widths.length - 1, Math.max(0, i - 1))] / 2;
    const w2 = widths[Math.min(widths.length - 1, i)] / 2;
    const ww = (w1 + w2) / 2;
    L.push([pts[i][0] - dy * ww, pts[i][1] + dx * ww]);
    R.push([pts[i][0] + dy * ww, pts[i][1] - dx * ww]);
  }
  return poly(R.concat(L.reverse()), true);
}

/** An arc band (mudguard, rotor guard) between two radii. */
function band(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  a0: number,
  a1: number,
): string {
  const rad = (a: number) => (a * Math.PI) / 180;
  const p = (r: number, a: number): [number, number] => [
    cx + r * Math.cos(a),
    cy + r * Math.sin(a),
  ];
  const o0 = p(r2, rad(a0));
  const o1 = p(r2, rad(a1));
  const i0 = p(r1, rad(a0));
  const i1 = p(r1, rad(a1));
  return (
    `M ${f(o0[0])} ${f(o0[1])} A ${r2} ${r2} 0 0 1 ${f(o1[0])} ${f(o1[1])} ` +
    `L ${f(i1[0])} ${f(i1[1])} A ${r1} ${r1} 0 0 0 ${f(i0[0])} ${f(i0[1])} Z`
  );
}

/** L-plate shelf bracket with a triangular web — one closed loop. */
function bracket(x: number, y: number, w: number, h: number, mirror: boolean): string {
  const t = 6;
  const pts: Array<readonly [number, number]> = mirror
    ? [[x, y], [x - w, y], [x - w, y + t], [x - t - 2, y + t + 2], [x - t, y + h - 8], [x - t, y + h], [x, y + h]]
    : [[x, y], [x + w, y], [x + w, y + t], [x + t + 2, y + t + 2], [x + t, y + h - 8], [x + t, y + h], [x, y + h]];
  return poly(pts, true);
}

/** The 19 slots, in draw order (back to front). */
export const SLOTS = [
  "s01_ground",
  "s02_mount",
  "s03_body",
  "s04_panel",
  "s05_grille",
  "s06_head",
  "s06b_lens",
  "s07_llink",
  "s08_lsup",
  "s09_lsup2",
  "s10_ljoint",
  "s10b",
  "s11_rlink",
  "s12_rsup",
  "s13_rsup2",
  "s14_rjoint",
  "s14b",
  "s15_lfoot",
  "s16_rfoot",
] as const;

export type Slot = (typeof SLOTS)[number];
export type HostKey = "quadruped" | "motorcycle" | "drone" | "shelf";

export const HOST_ORDER: readonly HostKey[] = ["quadruped", "motorcycle", "drone", "shelf"];

export const HOST_CAPTIONS: Record<HostKey, string> = {
  quadruped: "host 01 · warehouse quadruped",
  motorcycle: "host 02 · motorcycle",
  drone: "host 03 · drone",
  shelf: "host 04 · a shelf watching a doorway",
};

export const HOST_ALTS: Record<HostKey, string> = {
  quadruped: "The Symbian module mounted on the back of a four-legged warehouse robot",
  motorcycle: "The Symbian module clipped above the tank of a motorcycle",
  drone: "The Symbian module carried on the body of a quadcopter drone",
  shelf: "The Symbian module resting on a wall shelf, watching an open doorway",
};

export const HOSTS: Record<HostKey, Record<Slot, string>> = {
  quadruped: {
    s01_ground: "M 120 400 H 480",
    s02_mount: rrect(262, 242, 76, 6, 1),
    s03_body: rrect(178, 248, 244, 56, 12),
    s04_panel: rrect(262, 260, 68, 32, 3),
    s05_grille: "M 216 262 L 216 292 L 206 292 L 206 262 L 196 262 L 196 292",
    s06_head: poly([[422, 254], [460, 248], [466, 274], [428, 282]], true),
    s06b_lens: circle(452, 262, 5),
    s07_llink: "M 244 304 L 238 320 L 218 320 L 212 304",
    s08_lsup: limb([[228, 318], [208, 358], [236, 394]], [12, 8]),
    s09_lsup2: limb([[242, 318], [224, 356], [252, 394]], [10, 7]),
    s10_ljoint: circle(228, 318, 9),
    s10b: circle(208, 358, 6),
    s11_rlink: "M 356 304 L 362 320 L 382 320 L 388 304",
    s12_rsup: limb([[372, 318], [354, 358], [380, 394]], [12, 8]),
    s13_rsup2: limb([[358, 318], [340, 356], [366, 394]], [10, 7]),
    s14_rjoint: circle(372, 318, 9),
    s14b: circle(354, 358, 6),
    s15_lfoot: rrect(226, 394, 22, 6, 2),
    s16_rfoot: rrect(370, 394, 22, 6, 2),
  },
  motorcycle: {
    s01_ground: "M 100 400 H 500",
    s02_mount: rrect(282, 242, 36, 8, 1),
    s03_body: poly(
      [[300, 250], [334, 254], [352, 268], [346, 290], [318, 296], [262, 296], [248, 280], [256, 258]],
      true,
    ),
    s04_panel: poly([[214, 270], [250, 272], [254, 290], [196, 292], [176, 284], [180, 272]], true),
    s05_grille: "M 332 306 L 270 306 L 270 318 L 332 318 L 332 330 L 270 330",
    s06_head: circle(432, 266, 12),
    s06b_lens: circle(372, 238, 5),
    s07_llink: "M 270 296 L 398 262 L 376 302 L 264 340 L 180 352",
    s08_lsup: circle(180, 352, 48),
    s09_lsup2: circle(180, 352, 36),
    s10_ljoint: circle(180, 352, 20),
    s10b: circle(180, 352, 6),
    s11_rlink: "M 372 238 L 384 254 L 398 262 L 420 352",
    s12_rsup: circle(420, 352, 48),
    s13_rsup2: circle(420, 352, 36),
    s14_rjoint: circle(420, 352, 20),
    s14b: circle(420, 352, 6),
    s15_lfoot: rrect(228, 358, 72, 14, 6),
    s16_rfoot: band(420, 352, 52, 58, 205, 335),
  },
  drone: {
    s01_ground: "M 140 400 H 460",
    s02_mount: rrect(262, 242, 76, 6, 1),
    s03_body: rrect(248, 248, 104, 40, 12),
    s04_panel: rrect(270, 292, 60, 14, 3),
    s05_grille: "M 262 258 L 262 278 L 270 278 L 270 258 L 278 258 L 278 278",
    s06_head: circle(346, 304, 10),
    s06b_lens: circle(350, 304, 4),
    s07_llink: "M 250 256 L 172 250 L 250 272",
    s08_lsup: ellipse(166, 244, 58, 14),
    s09_lsup2: ellipse(166, 236, 46, 5),
    s10_ljoint: circle(166, 252, 7),
    s10b: circle(166, 236, 3),
    s11_rlink: "M 350 256 L 428 250 L 350 272",
    s12_rsup: ellipse(434, 244, 58, 14),
    s13_rsup2: ellipse(434, 236, 46, 5),
    s14_rjoint: circle(434, 252, 7),
    s14b: circle(434, 236, 3),
    s15_lfoot: poly(
      [[266, 288], [274, 288], [274, 326], [292, 326], [292, 332], [236, 332], [236, 326], [266, 326]],
      true,
    ),
    s16_rfoot: poly(
      [[326, 288], [334, 288], [334, 326], [364, 326], [364, 332], [308, 332], [308, 326], [326, 326]],
      true,
    ),
  },
  /**
   * Remapped by nearest similar shape, not by name. Pairing the drone's pod to
   * the door leaf and its skids to the architrave sent parts 250–300px across
   * the plate and read as spaghetti; this mapping keeps almost every slot's
   * centroid travel modest and the in-between frames legible.
   */
  shelf: {
    s01_ground: "M 80 400 H 560",
    s02_mount: rrect(282, 242, 36, 4, 1), // mount puck on the board
    s03_body: rrect(232, 246, 136, 8, 0.5), // the shelf board
    s04_panel: poly([[430, 150], [484, 154], [484, 330], [430, 332]], true), // door panel inset
    s05_grille: "M 292 254 L 292 300 L 288 340 L 292 384", // power flex to the skirting
    s06_head: rrect(466, 254, 30, 6, 3), // door handle
    s06b_lens: circle(490, 257, 5), // handle rose
    s07_llink: "M 110 90 L 110 245 L 110 400", // wall corner
    s08_lsup: rrect(110, 384, 292, 8, 0.5), // skirting band
    s09_lsup2: rrect(142, 228, 16, 16, 2), // light-switch plate
    s10_ljoint: circle(150, 236, 4), // rocker
    s10b: circle(150, 243, 1.2), // switch screw
    s11_rlink: "M 414 398 L 414 118 L 532 118 L 532 398", // jamb
    s12_rsup: poly(
      [[402, 400], [402, 106], [544, 106], [544, 400], [532, 400], [532, 118], [414, 118], [414, 400]],
      true,
    ), // architrave band
    s13_rsup2: poly([[414, 118], [498, 124], [498, 394], [414, 398]], true), // door leaf, ajar
    s14_rjoint: circle(416, 140, 3), // upper hinge
    s14b: circle(416, 367, 3), // lower hinge
    s15_lfoot: bracket(252, 254, 28, 30, false),
    s16_rfoot: bracket(348, 254, 28, 30, true),
  },
};

/**
 * Stagger offsets within a 1.0-long morph window: supports move first, then
 * links, then the body, then joints, then details. Morphing everything at once
 * reads as soup at the midpoint; supports-first was the clearest of the three
 * schedules tested on all three transitions.
 */
export function slotStagger(slot: string): { at: number; duration: number } {
  if (/s(08|09|12|13|15|16)/.test(slot)) return { at: 0, duration: 0.7 };
  if (/s(07|11)/.test(slot)) return { at: 0.1, duration: 0.7 };
  if (/s0[123]/.test(slot)) return { at: 0.2, duration: 0.7 };
  if (/s(10|14)/.test(slot)) return { at: 0.25, duration: 0.7 };
  return { at: 0.3, duration: 0.7 };
}
