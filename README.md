<div align="center">

# Symbian

**Eyes for everything you already own.**

*The marketing site for Symbian at symbian.world — a stabilized pair of eyes, a voice and a mind that you attach to anything you already own. Built by Flashback Labs, the team behind Teepin. Next.js 16, React 19, GSAP, anime.js.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-149ECA?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## § 00 · What this is

A single long-form page that makes one idea legible: robots, drones and vehicles already move beautifully and understand nothing. Symbian is the missing awareness layer — a small module with cameras, a microphone and a speaker on a gimbal — and a **skill** learned once runs on every host the module is attached to.

The page is read top to bottom. There is one conversion: an email.

## § 01 · The sections

| # | Section | What it does |
|---|---|---|
| 01 | Hero | *Eyes for everything you already own.* The loop mark — Symbian's visor, Teepin's logo — boots like an instrument behind the headline. |
| 02 | The problem | Capable machines that understand nothing. Three stanzas. |
| 03 | One skill, every host | **The signature moment.** The module stays pinned; the host beneath it changes: quadruped → motorcycle → drone → a shelf watching a doorway. |
| 04 | Skills | Why one skill works everywhere — four squircles. |
| 05 | The stack | One module, one cloud, any host. Isometric tower: host → module → Teepin cloud → skills. |
| 06 | Position | What it costs to support one more host. Blueprint plate; Symbian's marker rests at *every platform*. |
| 07 | The module | Eyes in the box, mind in the cloud. Attach → See → Reason → Speak. |
| 08 | What we don't build | Balance, flight, legs and the car took a decade to solve. We won't redo that work. Five partner promises. |
| 09 | Early access | *We didn't build the robot. We taught it to notice.* One mailto. |
| — | Footer | Built by Flashback Labs, the team behind Teepin. X: [@SymbianRobotics](https://x.com/SymbianRobotics). |

## § 02 · Brand lineage

Teepin's mascot is a cloud wearing infinity-loop sunglasses. Symbian's module is a sphere with a two-lens visor. They arrived at the same shape independently, so the site uses one mark for both: read forward, Symbian wears Teepin's logo; read backward, Teepin's logo is Symbian's eyes. `components/svg/TeepinMark.tsx` is that single path; `TeepinReactor.tsx` boots it in the hero.

## § 03 · Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.2** (Turbopack, App Router) |
| UI | **React 19.2** · **Tailwind CSS 4** |
| Motion | **GSAP 3.15** (scrub, ScrollTrigger) · **anime.js 4** · **Lenis** |
| Graphics | Hand-authored SVG plates — no raster imagery yet |
| Language | **TypeScript 5** strict |

> ⚠️ This is **not** the Next.js you know. v16 has breaking changes in routing, fetching, and caching. See `node_modules/next/dist/docs/` before writing against it — and heed deprecation notices.

## § 04 · Run it

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
```

## § 05 · Layout

```
app/                     # App Router — page.tsx composes all sections
components/
  sections/              # One file per section (HeroCinematic, Manifesto, Hosts, …)
  svg/                   # TeepinMark (the shared loop mark), TeepinReactor, TeepinWordmark
  ui/                    # Nav + NavReactor dial + ScrollReveal
lib/                     # Motion tokens, reduced-motion check
docs/superpowers/        # Design specs and plans
```

## § 06 · What is deliberately not on the page

Specifications, sensor details, pricing, launch dates, the skill roadmap, partner names we haven't signed, performance claims we can't demonstrate, and the first skill. The idea is stable; everything else is not.

---

<div align="center">

**— Symbian · Flashback Labs —**
[hello@symbian.world](mailto:hello@symbian.world)

</div>
