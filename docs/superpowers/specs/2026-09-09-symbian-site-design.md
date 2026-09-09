# Symbian site — design

**Date:** 2026-09-09
**Repo:** `teepin` (fork of the Flashback Labs site). Ships at symbian.world.
**Sources:** Symbian Vision Brief, Website Build Brief, Content Replacement Map, Hardware & Skills, Roadmap & Evolution (Vinay, Flashback Labs).

## Decision summary

- Keep this repo's layout, motion and styling exactly as they are. Do not adopt the Build Brief's alternate design system (Archivo, #E9EEF1, brackets). The Content Replacement Map's "keep every line of CSS, replace the text" instruction wins.
- From `gpteeorgweb` take **only** `components/svg/TeepinMark.tsx`, `TeepinReactor.tsx`, `TeepinWordmark.tsx` and `public/teepin-mark.svg`. `TeepinReactor` replaces `ArcReactor` in the hero. Nothing else is copied across.
- Every string on the site becomes Symbian copy — visible text, aria-labels, alt text, metadata, code comments, README. Teepin is mentioned only where the docs say so: the cloud layer, the Products row, the footer line. Nothing Flashback remains.
- Single page. `/community`, `/press`, `/manifesto` routes are removed.
- One net-new section: **Hosts**, the Build Brief's signature moment, built with SVG line-art silhouettes since no renders exist.
- Email conversion is a `mailto:hello@symbian.world?subject=Symbian%20early%20access` link. No form backend.
- Footer links X: `https://x.com/SymbianRobotics`. LinkedIn removed.
- Skill 01 (the contextual companion), specs, pricing, dates and unsigned partner names are **not** on the page.

## Brand

Teepin's loop mark is the two-lens visor with three-line lens detail — Symbian's eyes. It is used as: the hero reactor, the nav mark beside `SYMBIAN` set in type, the featured "module" image in Products, the pinned module in Hosts, and the favicon. Component names stay `Teepin*`; a header comment records the lineage. `TeepinReactor` gains an optional `serialText` prop; the hero passes `SYMBIAN · MODULE · SERIES·S-01 · ONE SKILL · EVERY HOST · `.

## Page order

| # | Component (file) | id | Role |
|---|---|---|---|
| 01 | `HeroCinematic` | hero | The idea + the module |
| 02 | `Manifesto` | manifesto | The problem |
| 03 | `Hosts` **(new)** | hosts | Signature: one module, host changes |
| 04 | `Principles` | principles | Why one skill works everywhere |
| 05 | `Infrastructure` | infrastructure | One module, one cloud, any host |
| 06 | `Thesis` | thesis | Cost of supporting one more host |
| 07 | `Products` | products | The module + where the thinking happens |
| 08 | `EnterpriseProof` | partners | What we don't build / Partners |
| 09 | `ClosingManifesto` | closing | Early access |
| 10 | `Footer` | — | Flashback Labs, contact |

Section markers renumber to match (§ 02 … § 09).

## Copy, section by section

### Nav
- Wordmark: `TeepinMark` at 17px + `SYMBIAN` (mono, tracked, same treatment weight as the old wordmark).
- Dial items: home → `/` (spy: hero) · thesis → `#manifesto` (spy: manifesto, hosts) · skills → `#principles` · stack → `#infrastructure` (spy: infrastructure, thesis, products) · partners → `#partners` · early access → `#closing`.

### 01 Hero
- Byline: `Symbian`
- H1: `Eyes for everything you already own.` — highlighted final word `own.` (existing hotrod + hud underline treatment)
- Sub: `Symbian is a small, interoperable module you attach to a robot, a drone, a vehicle, or something that never moves at all. It sees what you see, works out what matters, and talks to you about it — amplifying whatever host it's riding, without changing what that host already does best.`
- CTA 1: `Get early access` → mailto. CTA 2: `See how it works` → `#manifesto`.
- Corner labels: `SB · V0.1`, `EST · 2026`, `CORE · S-01`, `HOST · YOURS`.

### 02 Manifesto — the problem
- Marker `§ 02 · THE PROBLEM`
- I · THE MACHINES — `A quadruped can cross rubble. A drone can hold position in wind. A car can keep itself in a lane.`
- II · THE GAP — `None of them know what they're looking at, where they are, or what you want. The hard problems got solved. Awareness never arrived.`
- III · THE ANSWER — `One small module, riding on top of what already works. Eyes, ears and a voice for anything you already own.`

### 03 Hosts — signature moment (new)
- Marker `§ 03 · ONE SKILL, EVERY HOST`
- H2: `Learn it once. It works on all of them.`
- Body: `A capability on Symbian is called a skill, and skills do not belong to a platform. The same skill runs whether the module is riding a warehouse quadruped, clipped to a motorcycle, or sitting on a shelf watching a doorway. You do not buy a version for each machine. You buy it once and it follows the module.`
- Closing line: `It is the way your headphones follow you between your phone and your laptop, applied to machines that cost a hundred times more.`
- Stage: sticky viewport-height stage. `TeepinMark` pinned centre, unmoving, on a thin drawn gimbal ring. Four inline SVG line-art hosts (hairline strokes, `--color-steel`) crossfade by scroll progress; the mark layer is never re-rendered. Caption under the stage, sentence case, changes with state: `Warehouse quadruped` · `Motorcycle` · `Drone` · `A shelf watching a doorway`. No dots, no counter.
- Motion: CSS `position: sticky` + one GSAP ScrollTrigger scrub driving only opacity. Reduced motion: static 4-up row, mark composited above each.

### 04 Principles — why one skill works everywhere
- Marker `§ 04 · SKILLS`; eyebrow `Skills // 01–04 // why one skill works everywhere`
- H2: `Written once. Runs on whatever it's riding.`
- Sub: `A skill is a capability the module can perform — seeing, reasoning, talking.`
- 01 `Interoperable by design` — `A skill is written against the module's eyes and ears, not against any one platform's SDK. It doesn't need to be rewritten to ride something new.`
- 02 `It amplifies the host` — `The robot keeps doing exactly what it was built to do. Symbian adds perception on top — it doesn't compete with the platform, it makes the platform more capable.`
- 03 `The host can change` — `A quadruped today, a motorcycle tomorrow, a fixed shelf watching a doorway after that. The module doesn't need to know in advance what it's riding.`
- 04 `Built with platforms, not against them` — `We're not a robotics company and we're not trying to become one. We collaborate with the companies who've spent a decade solving locomotion.`

### 05 Infrastructure — the stack
- Marker `§ 05 · THE STACK`; eyebrow `Stack // 01-04 // host > skills`
- H2: `One module. One cloud.` / `Any host.` (hotrod on `host`)
- Sub: `The host keeps its strengths. We add the senses.`
- Layers bottom→top (name · thesis · modules · spec · partners):
  - 01 `The host` · `Whatever already moves, flies, drives or stands still. Unchanged.` · [`Quadruped`, `Drone`, `Vehicle`, `Fixed mount`] · `their strengths · untouched` · []
  - 02 `The module` · `A sphere with a visor, cameras behind it, a microphone, a speaker — on a gimbal that keeps it level.` · [`Visor & cameras`, `Mic & speaker`, `Mechanical gimbal`] · `eyes · ears · mouth · radio` · []
  - 03 `Teepin cloud` · `The reasoning, the model calls, the retrieval — all of it runs on Teepin, the platform our team already builds for enterprises.` · [`Live video reasoning`, `Retrieval`, `Voice in and out`] · `where the thinking actually happens` · [`Teepin`]
  - 04 `Skills` · `A capability written once and interoperable across every host it's attached to.` · [`Written once`, `Runs anywhere`, `Skill marketplace`] · `interoperable by design` · []
- Status bar text `01 → 04`, panel copy follows layer data.

### 06 Thesis — the cost of one more host
- Marker `§ 06 · POSITION`; subline `Interoperability zone // this is where we stand`
- H3: `Every platform rebuilds perception.` / `We don't.` (hotrod on `don't`)
- Axis label: `hosts you support →`
- Zones: `ONE PLATFORM` · `one team, one codebase` (hairline, 0–25) / `TWO PLATFORMS` · `nearly double the maintenance` (hairline, 25–50) / `FOUR PLATFORMS` · `a team per platform, forever` (hotrod, 50–80) / `EVERY PLATFORM` · `symbian: built once, runs on all of them` (hud, 80–100)
- Marker rests at 90; readout `this is us · ONE SKILL, ANY HOST`.
- Title block: `06 · interoperability zone` · `09.2026 · 1.0` · `symbian · built once`

### 07 Products — the module and the mind
- Marker `§ 07 · THE MODULE`; eyebrow `Module // 01-04 // eyes in the box, mind in the cloud`
- H2: `Eyes in the box.` / `Mind in the cloud.` (hotrod on `cloud`)
- Featured status `PROTOTYPE · MODULE`, tag `01 · the module`. Image panel renders `TeepinMark` large (the visor) instead of the product SVG.
- Featured H3 `A stabilized pair of eyes.` Body: `A sphere with a visor across the front. Behind the visor, the cameras. A microphone to hear you, a speaker to answer. No mouth, because the speaker is the mouth.`
- Bullets: `visor & cameras` — `the face is nothing but eyes.` / `mic & speaker` — `it hears you and answers.` / `mechanical gimbal` — `holds level while the host does whatever it does.` / `a radio` — `almost no intelligence of its own; the thinking happens elsewhere.`
- Flow `attach → speak`: 01 `Attach` · `mount · level · pair` (lock) / 02 `See` · `look · sample · notice` (signal) / 03 `Reason` · `think · retrieve · decide` (hammer) / 04 `Speak` · `answer · or stay quiet` (mic)
- Stat: `1` with caption `skill · written once · every host` (no counter).
- Rows `index · 02 → 04`: 02 `Teepin cloud` · status `RUNNING` · `The platform we already build for enterprises.` · `Where the thinking happens — the reasoning, the model calls, the retrieval.` (links teepin.com) / 03 `Skills` · `BUILDING` · `The unit of value` · `Written against the module's sensors, not a platform's SDK.` / 04 `The gimbal` · `MECHANICAL` · `Version one` · `Settles level under gravity. No firmware, no calibration. Motorised only if a host proves it needs it.`
- Row images: render `TeepinMark` small in the existing frame. No new raster assets; the Flashback product SVGs are deleted.

### 08 EnterpriseProof → Partners / what we don't build
- Marker `§ 08 · WHAT WE DON'T BUILD`
- Mono headline: `WE DIDN'T SOLVE WALKING. SOMEBODY ELSE DID.`
- Boxes (monogram · name · what they solved): `BD` · Boston Dynamics · `balance` / `DJI` · DJI · `flight` / `UT` · Unitree · `affordable legs` / `AUTO` · Automakers · `the car`. Framed as respect, not clients.
- Tagline: `Symbian has no motors that move it, no chassis, no drivetrain, and no opinion about how your host gets from one place to another. The only moving part we care about is the gimbal that keeps the cameras level.`
- Below, H2 `We don't compete with the hosts we ride on.` and the five promises as a hairline list:
  1. `We don't build robots` — `No legs, no rotors, no chassis, no drivetrain. The physical machine stays entirely the platform's work.`
  2. `We amplify, we don't replace` — `A skill adds sight, hearing and a voice on top of what a host already does. It never asks a platform to change how it moves, balances, or flies.`
  3. `One skill, every partner's hardware` — `The same interoperable skill runs across every platform we work with. No partner gets a worse version because they came second.`
  4. `Revenue that respects the platform` — `Where a platform brings the customer, the platform takes its share, the way app stores do.`
  5. `Open to co-building` — `If a platform wants a skill that doesn't exist yet, we'd rather build it together than guess at it alone.`

### 09 ClosingManifesto — early access
- Marker `§ 09 · EARLY ACCESS`
- Headline: `We didn't build the robot.` (struck word `robot.`) / `We taught it to notice.` (gold word `notice.`)
- Sign-off: `It doesn't exist yet. There's a prototype and a small team. No launch date, no price, no waitlist theatre. Leave an email and we'll tell you when there's something worth looking at — and if you build robots, drones or anything with a host, tell us that too. We'd rather co-build than guess.`
- Label `SYMBIAN`. CTA 1 `Get early access` → mailto. CTA 2 `See how it works` → `#manifesto`.

### 10 Footer
- Wordmark `symbian` (Nevera, as before). Label `§ SYMBIAN`.
- Line: `Symbian is built by Flashback Labs, the team behind Teepin.`
- Columns — Product: `Skills` #principles · `The stack` #infrastructure · `The module` #products. Company: `Partners` #partners · `Teepin` https://teepin.com · `Contact` mailto.
- Social: `X / Twitter` → https://x.com/SymbianRobotics (live link). LinkedIn removed.
- Bottom: `© 2026 Symbian` · `hello@symbian.world`.

### Metadata (`app/layout.tsx`)
- `siteUrl` https://symbian.world, `siteName` Symbian
- Title `Symbian — An interoperable pair of eyes for anything you already own`
- Description `Symbian is an interoperable module that attaches to any host — robot, drone, vehicle, or something that never moves — and gives it sight, hearing and a voice through Teepin's cloud.`
- Keywords: Symbian, interoperable perception, robot perception module, skills, Teepin, Flashback Labs, drone, quadruped, machine vision, voice.
- Icons → `/symbian-mark.svg` (copy of the loop mark). OG/Twitter image → same SVG.
- JSON-LD: Organization Symbian (email hello@symbian.world, `parentOrganization` Flashback Labs, `sameAs` the X URL) + WebSite. Drop SoftwareApplication.

### README
Rewrite the header and section list for Symbian; keep the stack badges.

## Removals
`components/svg/ArcReactor.tsx`, `ArcReactor3D.tsx`, `components/sections/Hero.tsx` (unused), `app/community/`, `app/press/`, `app/manifesto/`, `public/flashback.jpg`, `public/images/products/*`. Drop `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` from `package.json` if nothing imports them after the reactor is removed.

## Verification
`npm install` → `npx tsc --noEmit` → `npm run lint` → `npm run build`. Dev server + Playwright screenshots at 375 / 768 / 1280 / 1920, plus reduced-motion emulation on the hero and Hosts. Final grep for `Flashback`, `flashbacklabs`, `teepin.com`, `contact@`, `ArcReactor` — only the intentional mentions listed above remain.
