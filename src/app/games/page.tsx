import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import GamesBrowser from "@/components/pages/GamesBrowser";
import { GAMES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Games — Browse 1,200+ Competitive Titles",
  description:
    "Search and filter the full Nexus Arena library by genre, platform, and price. FPS, battle royale, MOBA, RPG, racing, strategy, fighting, and survival titles.",
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Games — Browse 1,200+ Competitive Titles | Nexus Arena",
    description:
      "Search and filter the full Nexus Arena library by genre, platform, and price.",
    url: "/games",
  },
};

/** ItemList schema so the catalogue is eligible for rich results. */
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nexus Arena Game Library",
  numberOfItems: GAMES.length,
  itemListElement: GAMES.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoGame",
      name: g.title,
      description: g.description,
      genre: g.genre,
      gamePlatform: g.platforms,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: g.rating,
        bestRating: 5,
        ratingCount: Math.round(g.playersRaw / 100),
      },
      offers: {
        "@type": "Offer",
        price: (g.price * (1 - (g.discount ?? 0) / 100)).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export default function GamesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Library"
        crumb="Games"
        title={
          <>
            Every game. <span className="text-gradient">One arena.</span>
          </>
        }
        subtitle="Twelve hundred titles across eight genres and five platforms. Filter down to exactly what you want to play tonight."
      />

      {/* useSearchParams needs a Suspense boundary to keep the route statically renderable. */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
            <div className="h-12 animate-pulse rounded-lg bg-white/5" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-xl bg-white/5" />
              ))}
            </div>
          </div>
        }
      >
        <GamesBrowser />
      </Suspense>
    </>
  );
}
