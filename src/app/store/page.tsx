import type { Metadata } from "next";
import { Gift, ShieldCheck, Zap } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import StoreGrid from "@/components/pages/StoreGrid";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Store — Games, Bundles, Battle Passes & Hardware",
  description:
    "Buy games, collector's bundles, battle passes, cosmetics, and pro hardware. Save up to 60% in the Nexus Arena store, with instant delivery and a 14-day refund window.",
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Store — Games, Bundles & Hardware | Nexus Arena",
    description: "Save up to 60% on games, bundles, battle passes, and pro hardware.",
    url: "/store",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nexus Arena Store",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      category: p.type,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        bestRating: 5,
        ratingCount: 1200 + i * 340,
      },
      offers: {
        "@type": "Offer",
        price: (p.price * (1 - (p.discount ?? 0) / 100)).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

const PERKS = [
  { Icon: Zap, title: "Instant delivery", body: "Keys land in your library the second payment clears." },
  { Icon: ShieldCheck, title: "14-day refunds", body: "Under two hours played? One click, no questions." },
  { Icon: Gift, title: "Gift anything", body: "Send any purchase to a friend with a scheduled reveal." },
];

export default function StorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Store"
        crumb="Store"
        accent="#7c3aed"
        title={
          <>
            Gear up for <span className="text-gradient">Season 7.</span>
          </>
        }
        subtitle="Games, bundles, battle passes, and the hardware our pros actually use — up to 60% off this week."
      >
        <ul className="mt-9 grid gap-4 sm:grid-cols-3">
          {PERKS.map(({ Icon, title, body }) => (
            <li key={title} className="glass clip-notch flex items-start gap-3 p-4">
              <Icon size={17} className="mt-0.5 shrink-0 text-neon-purple" aria-hidden />
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-wider text-ink">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </PageHeader>

      <StoreGrid />
    </>
  );
}
