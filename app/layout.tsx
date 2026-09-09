import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nevera = localFont({
  src: "../public/fonts/Nevera-Regular.otf",
  variable: "--font-nevera",
  display: "swap",
  weight: "400",
});

const glitchGoblin = localFont({
  src: "../public/fonts/GlitchGoblin-2O87v.ttf",
  variable: "--font-glitch",
  display: "swap",
  weight: "400",
});

const hydrogen = localFont({
  src: "../public/fonts/hydrogen.ttf",
  variable: "--font-hydrogen",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://symbian.world";
const siteName = "Symbian";
const siteTitle =
  "Symbian — An interoperable pair of eyes for anything you already own";
const siteDescription =
  "Symbian is an interoperable module that attaches to any host — robot, drone, vehicle, or something that never moves — and gives it sight, hearing and a voice through Teepin's cloud.";
const contactEmail = "hello@symbian.world";
const xUrl = "https://x.com/SymbianRobotics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Symbian",
    "interoperable perception",
    "robot perception module",
    "skills",
    "Teepin",
    "Flashback Labs",
    "drone",
    "quadruped",
    "machine vision",
    "voice",
  ],
  authors: [{ name: "Flashback Labs", url: siteUrl }],
  creator: "Flashback Labs",
  publisher: "Flashback Labs",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/symbian-mark.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/symbian-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/symbian-mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/symbian-mark.svg",
        width: 320,
        height: 120,
        alt: "The Symbian loop mark — two lenses, three lines each",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@SymbianRobotics",
    title: siteTitle,
    description: siteDescription,
    images: ["/symbian-mark.svg"],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/symbian-mark.svg`,
      description: siteDescription,
      email: contactEmail,
      sameAs: [xUrl],
      parentOrganization: {
        "@type": "Organization",
        name: "Flashback Labs",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nevera.variable} ${glitchGoblin.variable} ${hydrogen.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-full bg-paper text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
