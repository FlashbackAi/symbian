import Link from "next/link";

export default function Footer() {
  return (
    <footer
      aria-label="Symbian site footer"
      className="relative w-full min-h-[50vh] bg-paper border-t border-hairline"
    >
      {/* hairline dot grid — matches engineering-drawing texture on the rest of the site */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-grid-hairline opacity-[0.4]"
      />
      {/* faint hotrod hairline along the top — a thread of brand color */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-40 bg-hotrod"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-16 flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
        {/* Left (desktop) / top (mobile) — Nevera wordmark */}
        <div
          className="w-full md:w-[55%] md:shrink-0"
          style={{ containerType: "inline-size" }}
        >
          <span
            className="block text-ink leading-none whitespace-nowrap text-center md:text-left"
            style={{
              fontFamily: "var(--font-nevera), sans-serif",
              fontSize: "clamp(1rem, 10cqw, 5rem)",
            }}
          >
            symbian
          </span>
        </div>

        {/* Right (desktop) / bottom (mobile) — content */}
        <div className="w-full md:flex-1 flex flex-col min-w-0">
          <p className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-steel text-center md:text-left">
            § SYMBIAN
          </p>
          <div className="border-t border-hairline my-5 w-full max-w-lg mx-auto md:mx-0 md:max-w-none" />

          <p className="text-ink-soft text-[14px] leading-[1.6] text-center md:text-left max-w-[52ch] mx-auto md:mx-0">
            Symbian is built by Flashback Labs, the team behind{" "}
            <a
              href="https://teepin.com"
              className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink transition-colors duration-220"
            >
              Teepin
            </a>
            .
          </p>

          {/* Link grid — 2 columns, left on desktop, stacks+centers on mobile */}
          <div className="mt-10 flex flex-col sm:flex-row gap-10 sm:gap-16 justify-center md:justify-start items-center sm:items-start">
            <div className="text-center sm:text-left">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel mb-3">
                Symbian
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Skills",     href: "/#principles" },
                  { label: "The stack",  href: "/#infrastructure" },
                  { label: "The module", href: "/#products" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-mono text-[11px] tracking-widest text-ink-soft hover:text-ink transition-colors duration-220"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel mb-3">
                Company
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Partners", href: "/#partners" },
                  { label: "Teepin",   href: "https://teepin.com" },
                  { label: "Contact",  href: "mailto:hello@symbian.world" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-mono text-[11px] tracking-widest text-ink-soft hover:text-ink transition-colors duration-220"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center md:justify-start gap-6 mt-10">
            <a
              href="https://x.com/SymbianRobotics"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Symbian on X (Twitter)"
              className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-steel hover:text-ink transition-colors duration-220"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.265 5.638 5.9-5.638Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
          </div>

          {/* Bottom row */}
          <div className="mt-12 pt-5 border-t border-hairline flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center">
            <div className="flex items-center gap-5">
              <p className="font-mono text-[10px] tracking-[0.15em] text-steel">
                © 2026 Symbian
              </p>
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms",   href: "/terms" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-mono text-[10px] tracking-[0.15em] text-steel hover:text-ink transition-colors duration-220"
                >
                  {label}
                </Link>
              ))}
            </div>
            <a
              href="mailto:hello@symbian.world"
              className="font-mono text-[10px] tracking-[0.15em] text-steel hover:text-ink transition-colors duration-220"
            >
              hello@symbian.world
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
