import type { Metadata } from "next";
import LegalPage, {
  ContactLink,
  LegalList,
  LegalSection,
  TextLink,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms for using symbian.world — a site that describes a prototype, not a shop.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      marker="§ Legal // Terms"
      title="Terms and Conditions"
      summary={
        <>
          This site describes an idea and a prototype. It doesn&apos;t sell
          anything, and nothing on it is a promise about what Symbian will be.
        </>
      }
      sibling={{ label: "Privacy Policy", href: "/privacy" }}
    >
      <LegalSection id="introduction" number="01" title="Introduction">
        <p>
          These terms govern your use of symbian.world (the &ldquo;site&rdquo;),
          run by Flashback Labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using
          the site you agree to them. If you don&apos;t, please don&apos;t use
          the site.
        </p>
      </LegalSection>

      <LegalSection id="what-this-site-is" number="02" title="What this site is">
        <p>
          The site describes Symbian, an idea and a prototype. Nothing on it is
          an offer to sell, a specification, a warranty, or a promise about
          what Symbian will be or when.
        </p>
        <p>
          The hosts shown on the site are illustrations of the kinds of
          machines the module is meant to ride on. Mentioning a kind of
          machine, or a problem someone else has solved, does not imply a
          partnership or an endorsement.
        </p>
        <p>
          Emailing us for early access doesn&apos;t reserve, order or commit
          either of us to anything.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" number="03" title="Acceptable use">
        <LegalList
          items={[
            "Don't use the site for anything unlawful.",
            "Don't try to break, overload or gain unauthorised access to the site or the systems behind it.",
            "Don't copy or republish the site's content in bulk, or present it as your own.",
            "Don't send us malicious files or links.",
          ]}
        />
      </LegalSection>

      <LegalSection
        id="intellectual-property"
        number="04"
        title="Intellectual property"
      >
        <p>
          The site&apos;s text, design, illustrations and code, the Symbian
          name and the loop mark belong to Flashback Labs or its licensors.
          You&apos;re welcome to link to the site and to quote short passages
          with credit. Anything beyond that needs our written permission.
        </p>
      </LegalSection>

      <LegalSection id="things-you-send-us" number="05" title="Things you send us">
        <p>
          If you email us ideas, feedback, or a skill you wish existed,
          we&apos;re free to use it without owing you anything for it
          &mdash; that&apos;s what lets us co-build instead of guessing.
        </p>
        <p>
          Please don&apos;t send anything confidential. If you want to share
          something under NDA, say so first and we&apos;ll sort that out
          before you send it.
        </p>
      </LegalSection>

      <LegalSection id="privacy" number="06" title="Privacy">
        <p>
          How we handle the little information the site receives is set out
          in our <TextLink href="/privacy">Privacy Policy</TextLink>.
        </p>
      </LegalSection>

      <LegalSection id="other-sites" number="07" title="Other sites">
        <p>
          Links to{" "}
          <TextLink href="https://x.com/SymbianRobotics">X</TextLink> and{" "}
          <TextLink href="https://teepin.com">teepin.com</TextLink> are
          provided for convenience. We don&apos;t control those sites and
          aren&apos;t responsible for them; their own terms apply.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" number="08" title="Disclaimer">
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. We work to keep it accurate, but we don&apos;t
          guarantee that everything on it is complete, current or error-free,
          or that the site will always be available.
        </p>
      </LegalSection>

      <LegalSection
        id="limitation-of-liability"
        number="09"
        title="Limitation of liability"
      >
        <p>
          To the fullest extent permitted by law, Flashback Labs is not liable
          for any indirect, incidental or consequential damages arising from
          your use of the site or from relying on anything it says. Nothing in
          these terms limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection id="changes" number="10" title="Changes to these terms">
        <p>
          We may update these terms as the site changes. The &ldquo;last
          updated&rdquo; date above shows when. Using the site after a change
          means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection id="contact" number="11" title="Contact">
        <p>
          Questions about these terms: <ContactLink />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
