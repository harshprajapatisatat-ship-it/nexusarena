import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import FloatingActions from "@/components/layout/FloatingActions";
import PageTransition from "@/components/layout/PageTransition";
import { WishlistProvider } from "@/components/providers/WishlistProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const SITE = "https://nexus-arena.example.com";
const DESCRIPTION =
  "Nexus Arena is the competitive gaming platform for players who take it seriously — 1,200+ titles, million-dollar tournaments, live leaderboards, and a community of 1.2M.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Nexus Arena — Next-Generation Competitive Gaming Platform",
    template: "%s | Nexus Arena",
  },
  description: DESCRIPTION,
  applicationName: "Nexus Arena",
  keywords: [
    "gaming platform",
    "esports tournaments",
    "competitive gaming",
    "game store",
    "leaderboards",
    "battle royale",
    "FPS",
    "MOBA",
    "esports prize pool",
  ],
  authors: [{ name: "Nexus Arena" }],
  creator: "Nexus Arena",
  publisher: "Nexus Arena",
  category: "games",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Nexus Arena",
    title: "Nexus Arena — Next-Generation Competitive Gaming Platform",
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nexus Arena — competitive gaming platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Arena — Next-Generation Competitive Gaming Platform",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
    creator: "@nexusarena",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Organization + WebSite schema, emitted once on every page. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Nexus Arena",
      url: SITE,
      description: DESCRIPTION,
      sameAs: [
        "https://twitch.tv",
        "https://youtube.com",
        "https://discord.com",
        "https://x.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Nexus Arena",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE}/games?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />

        <WishlistProvider>
          <Loader />
          <Navbar />
          <PageTransition>
            <main id="main" className="relative z-10">
              {children}
            </main>
          </PageTransition>
          <Footer />
          <FloatingActions />
        </WishlistProvider>
      </body>
    </html>
  );
}
