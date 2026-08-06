import type { Metadata } from "next";
import { Crown, Medal, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import LeaderboardTable from "@/components/pages/LeaderboardTable";
import Reveal from "@/components/ui/Reveal";
import { LEADERBOARD } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leaderboards — Season 7 Global Rankings",
  description:
    "Live Season 7 rankings across every Nexus Arena title. Filter by game and tier, and track 24-hour movement for the top competitive players worldwide.",
  alternates: { canonical: "/leaderboards" },
  openGraph: {
    title: "Leaderboards — Season 7 Global Rankings | Nexus Arena",
    description: "Live Season 7 rankings across every Nexus Arena title.",
    url: "/leaderboards",
  },
};

const PODIUM_STYLE = [
  { accent: "#ffd447", label: "Champion", order: "sm:order-2", scale: "sm:scale-108" },
  { accent: "#c9d4e5", label: "Runner-up", order: "sm:order-1", scale: "" },
  { accent: "#d98d4a", label: "Third", order: "sm:order-3", scale: "" },
];

export default function LeaderboardsPage() {
  const podium = LEADERBOARD.slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Global Ranking"
        crumb="Leaderboards"
        accent="#b6ff3c"
        title={
          <>
            The ladder doesn&apos;t <span className="text-gradient">lie.</span>
          </>
        }
        subtitle="Season 7 standings, recalculated every sixty seconds from ranked match results across all titles."
      />

      {/* Podium */}
      <section
        aria-labelledby="podium-heading"
        className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20"
      >
        <h2 id="podium-heading" className="sr-only">
          Top three players
        </h2>

        <ol className="grid gap-5 sm:grid-cols-3 sm:items-end">
          {podium.map((p, i) => {
            const s = PODIUM_STYLE[i];
            return (
              <li key={p.handle} className={`${s.order} ${s.scale}`}>
                <Reveal delay={i * 0.1}>
                  <article
                    style={{ ["--accent" as string]: s.accent }}
                    className="clip-corner group relative overflow-hidden rounded-2xl border border-white/10 bg-carbon p-6 text-center transition-all duration-500 hover:border-[var(--accent)]/60 hover:shadow-[0_0_54px_-16px_var(--accent)]"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -top-16 h-40 opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
                      style={{ background: s.accent }}
                    />

                    <div className="relative">
                      <span
                        className="mx-auto grid h-11 w-11 place-items-center rounded-xl"
                        style={{
                          background: `${s.accent}22`,
                          boxShadow: `inset 0 0 0 1px ${s.accent}55`,
                        }}
                      >
                        {i === 0 ? (
                          <Crown size={20} style={{ color: s.accent }} />
                        ) : (
                          <Medal size={20} style={{ color: s.accent }} />
                        )}
                      </span>

                      <p
                        className="mt-3 font-display text-[10px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: s.accent }}
                      >
                        {s.label}
                      </p>

                      <span
                        aria-hidden
                        className="mx-auto mt-5 grid h-16 w-16 place-items-center rounded-2xl font-display text-lg font-black transition-transform duration-500 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${s.accent}33, ${s.accent}0d)`,
                          boxShadow: `inset 0 0 0 1px ${s.accent}55`,
                          color: s.accent,
                        }}
                      >
                        {p.handle.slice(0, 2).toUpperCase()}
                      </span>

                      <h3 className="mt-4 font-display text-xl font-black text-ink">
                        {p.handle}
                      </h3>
                      <p className="mt-1 text-xs text-ink-faint">
                        <span aria-hidden>{p.flag}</span> {p.team}
                        <span className="sr-only">, {p.country}</span>
                      </p>

                      <p className="mt-5 font-display text-3xl font-black tabular-nums text-ink">
                        {p.points.toLocaleString("en-US")}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-ink-faint">
                        points
                      </p>

                      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-4 text-xs">
                        <div>
                          <dt className="text-ink-faint">Win Rate</dt>
                          <dd className="mt-0.5 font-display font-bold text-ink">{p.winRate}%</dd>
                        </div>
                        <div>
                          <dt className="text-ink-faint">K/D</dt>
                          <dd className="mt-0.5 font-display font-bold text-ink">
                            {p.kd.toFixed(2)}
                          </dd>
                        </div>
                      </dl>

                      {p.change !== 0 && (
                        <p
                          className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                            p.change > 0 ? "text-neon-lime" : "text-neon-pink"
                          }`}
                        >
                          <TrendingUp
                            size={12}
                            className={p.change < 0 ? "rotate-180" : ""}
                            aria-hidden
                          />
                          {p.change > 0 ? "+" : ""}
                          {p.change} in 24h
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <LeaderboardTable />
    </>
  );
}
