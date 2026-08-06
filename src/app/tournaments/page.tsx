import type { Metadata } from "next";
import { Calendar, Trophy, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import TournamentBrowser from "@/components/pages/TournamentBrowser";
import Countdown from "@/components/ui/Countdown";
import Reveal from "@/components/ui/Reveal";
import { NeonLink } from "@/components/ui/NeonButton";
import { TOURNAMENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tournaments — Million-Dollar Brackets & Open Qualifiers",
  description:
    "Register for Nexus Arena tournaments: invitationals, majors, open qualifiers, and community cups with prize pools up to $2.5M. Live countdowns and open slots.",
  alternates: { canonical: "/tournaments" },
  openGraph: {
    title: "Tournaments — Million-Dollar Brackets | Nexus Arena",
    description:
      "Invitationals, majors, and open qualifiers with prize pools up to $2.5M.",
    url: "/tournaments",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nexus Arena Tournaments",
  itemListElement: TOURNAMENTS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SportsEvent",
      name: t.name,
      startDate: t.startsAt,
      eventStatus:
        t.status === "live"
          ? "https://schema.org/EventScheduled"
          : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: {
        "@type": "VirtualLocation",
        url: "https://nexus-arena.example.com/tournaments",
      },
      organizer: { "@type": "Organization", name: "Nexus Arena" },
      description: `${t.format} · ${t.teams} teams · ${t.region}`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability:
          t.slotsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        url: "https://nexus-arena.example.com/tournaments",
      },
    },
  })),
};

export default function TournamentsPage() {
  const totalPrize = TOURNAMENTS.reduce((sum, t) => sum + t.prizePool, 0);
  const totalTeams = TOURNAMENTS.reduce((sum, t) => sum + t.teams, 0);
  const featured = TOURNAMENTS[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Compete"
        crumb="Tournaments"
        accent="#ff2e88"
        title={
          <>
            Play for something <span className="text-gradient">real.</span>
          </>
        }
        subtitle="Eight active brackets, $6.1M in combined prize money, and open qualifiers anyone can enter."
      >
        <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
          {[
            { Icon: Trophy, label: "Total Prizes", value: `$${(totalPrize / 1_000_000).toFixed(1)}M` },
            { Icon: Calendar, label: "Active Events", value: String(TOURNAMENTS.length) },
            { Icon: Users, label: "Team Slots", value: totalTeams.toLocaleString("en-US") },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="glass clip-notch flex flex-col gap-1.5 px-4 py-4">
              <Icon size={15} className="text-neon-pink" aria-hidden />
              <dd className="font-display text-xl font-black text-ink sm:text-2xl">{value}</dd>
              <dt className="text-[10px] uppercase tracking-wider text-ink-faint">{label}</dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Spotlight event */}
      <section
        aria-labelledby="spotlight-heading"
        className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden rounded-2xl border border-neon-pink/25 bg-carbon p-6 sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,46,136,0.18),rgba(124,58,237,0.16)_50%,rgba(0,229,255,0.14))] bg-[length:300%_100%] animate-gradient-pan"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,46,136,0.4),transparent_65%)] blur-3xl animate-float-slow"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-neon-pink/20 px-3 py-1.5 ring-1 ring-neon-pink/45">
                  <Trophy size={12} className="text-neon-pink" />
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-neon-pink">
                    Flagship Event
                  </span>
                </span>

                <h2
                  id="spotlight-heading"
                  className="mt-5 text-balance font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                >
                  {featured.name}
                </h2>

                <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-ink-dim sm:text-base">
                  Thirty-two invited teams, double elimination, and the largest community-funded
                  prize pool in Nexus history. Group stage runs five days; the grand final is a
                  best-of-seven.
                </p>

                <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                  {[
                    ["Prize Pool", `$${featured.prizePool.toLocaleString("en-US")}`],
                    ["Format", featured.format],
                    ["Region", featured.region],
                    ["Teams", String(featured.teams)],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] uppercase tracking-widest text-ink-faint">
                        {label}
                      </dt>
                      <dd className="mt-1 font-display text-base font-bold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <p className="mb-4 text-center text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                  Group stage begins in
                </p>
                <Countdown target={featured.startsAt} />
                <NeonLink href="/contact#signin" size="md" className="mt-6 w-full">
                  Watch Live
                </NeonLink>
                <p className="mt-3 text-center text-[11px] text-ink-faint">
                  Free on Twitch and YouTube in nine languages
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <TournamentBrowser />
    </>
  );
}
