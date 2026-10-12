import type { Metadata } from "next";
import LegalPage, {
  ContactLink,
  LegalList,
  LegalSection,
  LegalSubsection,
  TextLink,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What happens to information about you on symbian.world: no cookies, no analytics, no forms — only the emails you choose to send us.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      marker="§ Legal // Privacy"
      title="Privacy Policy"
      summary={
        <>
          No cookies, no analytics, no forms. The only personal information
          this site receives is what you choose to put in an email to us
          &mdash; and we never sell it.
        </>
      }
      sibling={{ label: "Terms and Conditions", href: "/terms" }}
    >
      <LegalSection id="overview" number="01" title="Overview">
        <p>
          This policy explains what happens to information about you when you
          visit symbian.world (the &ldquo;site&rdquo;). The site is run by
          Flashback Labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;), the team that
          builds Symbian.
        </p>
        <p>
          The site is built to know as little about you as possible. It sets
          no cookies, runs no analytics and has no accounts or forms. We do
          not sell, rent or monetise your data, and we do not use it for
          advertising. Ever.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" number="02" title="What we collect">
        <LegalSubsection letter="a" title="Emails you send us">
          <p>
            If you write to <ContactLink /> &mdash; to ask for early access,
            to tell us what you build, or for any other reason &mdash; we
            receive your email address, your name if your email client
            includes it, and whatever you write. We only get this if you send
            it.
          </p>
        </LegalSubsection>
        <LegalSubsection letter="b" title="Server logs">
          <p>
            Like every website, this one is served by a hosting provider that
            records basic technical details of each request: your IP address,
            browser type, the page requested and the time. These logs exist to
            keep the site running and secure. We do not use them to identify,
            track or profile visitors.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection
        id="what-we-dont-collect"
        number="03"
        title="What we don't collect"
      >
        <LegalList
          items={[
            "No cookies, of any kind.",
            "No analytics, tracking pixels or advertising scripts.",
            "No accounts, sign-ups or forms.",
            "Nothing stored in your browser.",
            "No third-party font or script requests — the site's fonts are served from the site itself.",
          ]}
        />
      </LegalSection>

      <LegalSection id="how-we-use-it" number="04" title="How we use it">
        <LegalList
          items={[
            "To reply to you.",
            "If you asked for early access, to tell you when there's something worth looking at.",
            "If you told us you build robots, drones or other hosts, to follow up about working together.",
            "To keep the site running and secure.",
          ]}
        />
        <p>
          We will not add you to a mailing list you didn&apos;t ask for.
        </p>
      </LegalSection>

      <LegalSection id="sharing" number="05" title="Who sees it">
        <p>
          We never sell your data. The only other parties that handle it are
          the service providers that make the above possible &mdash; the
          provider that hosts this site and the provider that delivers our
          email &mdash; and only so they can do that job. We may also disclose
          information where the law requires us to.
        </p>
      </LegalSection>

      <LegalSection id="retention" number="06" title="How long we keep it">
        <p>
          We keep your emails for as long as we need them to reply and to
          follow up the way you asked. If you ask us to delete them, we will.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" number="07" title="Your rights">
        <p>You can ask us at any time to:</p>
        <LegalList
          items={[
            "show you what we hold about you — in practice, the emails you've sent us;",
            "correct it;",
            "delete it;",
            "stop contacting you.",
          ]}
        />
        <p>
          Write to <ContactLink /> and we&apos;ll do it. Depending on where you
          live, data protection law (such as the GDPR or the CCPA) may give
          you further rights; we will honour those too.
        </p>
      </LegalSection>

      <LegalSection id="children" number="08" title="Children">
        <p>
          This site is not intended for children under 13, and we don&apos;t
          knowingly collect information from them. If you believe a child has
          emailed us, tell us and we will promptly delete it.
        </p>
      </LegalSection>

      <LegalSection id="other-sites" number="09" title="Other sites">
        <p>
          The site links to{" "}
          <TextLink href="https://x.com/SymbianRobotics">X</TextLink> and to{" "}
          <TextLink href="https://teepin.com">teepin.com</TextLink>. Those
          sites have their own privacy policies; this one doesn&apos;t cover
          them.
        </p>
      </LegalSection>

      <LegalSection id="the-module" number="10" title="The module">
        <p>
          This policy covers symbian.world only. The Symbian module is a
          prototype, and nothing here describes how it handles data. If it is
          ever offered to anyone, it will come with its own policy.
        </p>
      </LegalSection>

      <LegalSection id="changes" number="11" title="Changes to this policy">
        <p>
          We may update this policy as the site changes. When we do, the
          &ldquo;last updated&rdquo; date above changes with it. If a change
          affects how we use emails you&apos;ve already sent, we&apos;ll tell
          you by email before it applies.
        </p>
      </LegalSection>

      <LegalSection id="contact" number="12" title="Contact">
        <p>
          Questions about this policy, or requests about your data:{" "}
          <ContactLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
