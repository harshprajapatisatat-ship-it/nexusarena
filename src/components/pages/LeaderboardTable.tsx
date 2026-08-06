"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GAMES, LEADERBOARD, type Player } from "@/lib/data";
import LeaderboardRow from "@/components/ui/LeaderboardRow";
import SectionHeading from "@/components/ui/SectionHeading";

const TIERS = ["All", "Radiant", "Immortal", "Ascendant", "Diamond"] as const;
const GAME_FILTERS = ["All", ...Array.from(new Set(LEADERBOARD.map((p) => p.game)))];

const HEADERS = [
  { label: "Rank", cls: "pl-3 sm:pl-4 text-left" },
  { label: "Player", cls: "text-left" },
  { label: "Tier", cls: "hidden md:table-cell text-left" },
  { label: "Game", cls: "hidden lg:table-cell text-left" },
  { label: "Win Rate", cls: "hidden sm:table-cell text-left" },
  { label: "K/D", cls: "hidden sm:table-cell text-left" },
  { label: "Points", cls: "text-right" },
  { label: "24h", cls: "text-right pr-3 sm:pr-4" },
];

export default function LeaderboardTable() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<(typeof TIERS)[number]>("All");
  const [game, setGame] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return LEADERBOARD.filter((p) => {
      if (q && !`${p.handle} ${p.team} ${p.country}`.toLowerCase().includes(q)) return false;
      if (tier !== "All" && p.tier !== (tier as Player["tier"])) return false;
      if (game !== "All" && p.game !== game) return false;
      return true;
    });
  }, [query, tier, game]);

  return (
    <section
      aria-labelledby="full-leaderboard-heading"
      className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <SectionHeading
        eyebrow="Season 7"
        title={<span id="full-leaderboard-heading">Full Standings</span>}
        subtitle={`${LEADERBOARD.length} ranked competitors across every Nexus title.`}
      />

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <label htmlFor="lb-search" className="sr-only">
            Search players
          </label>
          <input
            id="lb-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by handle, team, or country…"
            className="w-full rounded-lg border border-white/10 bg-carbon py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-neon-lime/60 focus:ring-2 focus:ring-neon-lime/25"
          />
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="lb-tier" className="sr-only">
              Filter by tier
            </label>
            <select
              id="lb-tier"
              value={tier}
              onChange={(e) => setTier(e.target.value as (typeof TIERS)[number])}
              className="rounded-lg border border-white/10 bg-carbon px-3 py-3.5 text-sm text-ink-dim outline-none focus:border-neon-lime/60"
            >
              {TIERS.map((t) => (
                <option key={t} value={t} className="bg-carbon">
                  {t === "All" ? "All tiers" : t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lb-game" className="sr-only">
              Filter by game
            </label>
            <select
              id="lb-game"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="rounded-lg border border-white/10 bg-carbon px-3 py-3.5 text-sm text-ink-dim outline-none focus:border-neon-lime/60"
            >
              {GAME_FILTERS.map((g) => (
                <option key={g} value={g} className="bg-carbon">
                  {g === "All" ? "All games" : g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mb-4 text-sm text-ink-faint">
        <span className="font-display font-bold text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "player" : "players"}
      </p>

      <div className="clip-corner overflow-hidden rounded-xl border border-white/8 bg-carbon">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse">
            <caption className="sr-only">
              Season 7 ranked standings, sortable by rank and filterable by tier and game
            </caption>
            <thead>
              <tr className="border-b border-white/8 bg-white/2">
                {HEADERS.map((h) => (
                  <th
                    key={h.label}
                    scope="col"
                    className={`py-3 pr-2 font-display text-[10px] font-bold uppercase tracking-widest text-ink-faint ${h.cls}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={HEADERS.length} className="py-16 text-center">
                    <p className="font-display text-base font-bold text-ink">No players found</p>
                    <p className="mt-1.5 text-sm text-ink-dim">
                      Try a different handle or clear the tier filter.
                    </p>
                  </td>
                </tr>
              ) : (
                results.map((p, i) => <LeaderboardRow key={p.handle} player={p} index={i} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-5 text-xs text-ink-faint">
        Rankings reflect ranked matches only. Points decay 2% weekly after 14 days of inactivity.
        Season 7 closes in 41 days across all {GAMES.length} titles.
      </p>
    </section>
  );
}
