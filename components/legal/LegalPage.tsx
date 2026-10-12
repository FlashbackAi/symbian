/**
 * Symbian — legal page shell.
 *
 * Shared frame for /privacy and /terms. Same grammar as the partner
 * promises in § 08: a title block on the left (sticky on desktop) and
 * numbered hairline rows on the right. Static, no motion — these pages
 * are for reading. Site nav on top, site footer below.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";

export const LEGAL_UPDATED = "12 October 2026";
export const LEGAL_CONTACT = "hello@symbian.world";

const linkClass =
  "text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink transition-colors duration-220";

type LegalPageProps = {
  marker: string;
  title: string;
  summary: ReactNode;
  sibling: { label: string; href: string };
  children: ReactNode;
};

export default function LegalPage({
  marker,
  title,
  summary,
  sibling,
  children,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen">
      <Nav />

      <article className="relative pt-36 md:pt-44 pb-24 md:pb-32">
        {/* hairline dot grid, fading out below the title — engineering-drawing cue */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[480px] pointer-events-none bg-grid-hairline opacity-[0.5] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative mx-auto max-w-[1240px] px-6 md:px-14 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <header className="lg:sticky lg:top-32">
            <p className="font-mono text-[10.5px] md:text-[11px] tracking-[0.3em] uppercase text-steel mb-5">
              {marker}
            </p>
            <h1 className="font-display text-ink leading-[1.08] tracking-[-0.015em] text-[clamp(2.2rem,4.6vw,3.4rem)]">
              {title}
            </h1>
            <p className="mt-6 text-ink-soft text-[15px] md:text-[16px] max-w-[440px] leading-[1.55]">
              {summary}
            </p>

            {/* title-block plate — scope, revision, contact */}
            <dl className="mt-8 max-w-[440px] border-t border-ink/30 font-mono text-[10.5px] tracking-[0.2em] uppercase">
              {[
                { term: "Applies to", value: "symbian.world" },
                { term: "Last updated", value: LEGAL_UPDATED },
                {
                  term: "Contact",
                  value: (
                    <a
                      href={`mailto:${LEGAL_CONTACT}`}
                      className="normal-case tracking-[0.12em] text-ink hover:text-hotrod transition-colors duration-220"
                    >
                      {LEGAL_CONTACT}
                    </a>
                  ),
                },
              ].map(({ term, value }) => (
                <div
                  key={term}
                  className="flex justify-between gap-6 py-3 border-b border-ink/20"
                >
                  <dt className="text-steel">{term}</dt>
                  <dd className="text-ink text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={sibling.href}
              className="mt-8 inline-block font-mono text-[11px] tracking-widest uppercase text-steel hover:text-ink transition-colors duration-220"
            >
              {sibling.label} →
            </Link>
          </header>

          <ol className="border-t border-ink/30 list-none p-0 m-0 min-w-0">
            {children}
          </ol>
        </div>
      </article>

      <Footer />
    </main>
  );
}

/* One numbered row. `id` doubles as the deep-link anchor. */
export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li
      id={id}
      className="grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7 md:py-8 border-b border-ink/20 scroll-mt-32"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hud-deep pt-1">
        {number}
      </span>
      <div className="min-w-0">
        <h2 className="font-mono text-[11px] tracking-[0.26em] uppercase text-ink">
          {title}
        </h2>
        <div className="mt-3 space-y-4 text-ink-soft text-[14px] md:text-[15px] leading-[1.65] max-w-[62ch]">
          {children}
        </div>
      </div>
    </li>
  );
}

/* A lettered sub-part inside a section — "a. Emails you send us". */
export function LegalSubsection({
  letter,
  title,
  children,
}: {
  letter: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-1">
      <h3 className="text-ink font-medium text-[14px] md:text-[15px]">
        <span className="font-mono text-[11px] text-steel mr-2">{letter}.</span>
        {title}
      </h3>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}

/* Dash-marked list — steel dashes, not bullets. A glyph rather than a 1px
   rule: rows land on fractional pixels and a rule renders at uneven weights. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-none p-0 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="relative pl-6">
          <span aria-hidden="true" className="absolute left-0 text-steel">
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ContactLink() {
  return (
    <a href={`mailto:${LEGAL_CONTACT}`} className={linkClass}>
      {LEGAL_CONTACT}
    </a>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  if (!external) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
    </a>
  );
}
