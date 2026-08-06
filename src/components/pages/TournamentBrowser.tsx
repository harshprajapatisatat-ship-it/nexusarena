"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { TOURNAMENTS, type Tournament } from "@/lib/data";
import { TournamentCard } from "@/components/sections/UpcomingTournaments";
import SectionHeading from "@/components/ui/SectionHeading";

const TIERS = ["All", "Invitational", "Major", "Open Qualifier", "Community Cup"] as const;
const REGIONS = ["All", "Global", "NA / EU", "APAC", "EU", "NA"] as const;

export default function TournamentBrowser() {
  const [tier, setTier] = useState<(typeof TIERS)[number]>("All");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [openOnly, setOpenOnly] = useState(false);

  const results = useMemo(
    () =>
      TOURNAMENTS.filter((t) => {
        if (tier !== "All" && t.tier !== (tier as Tournament["tier"])) return false;
        if (region !== "All" && t.region !== region) return false;
        if (openOnly && t.slotsLeft === 0) return false;
        return true;
      }),
    [tier, region, openOnly],
  );

  return (
    <section
      aria-labelledby="all-tournaments-heading"
      className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <SectionHeading
        eyebrow="Full Schedule"
        title={<span id="all-tournaments-heading">All Tournaments</span>}
        subtitle="Filter by tier, region, and availability."
      />

      {/* Filters */}
      <div className="mb-9 flex flex-col gap-5 rounded-xl border border-white/8 bg-carbon p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          <fieldset>
            <legend className="mb-2.5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              Tier
            </legend>
            <div className="flex flex-wrap gap-2">
              {TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  aria-pressed={tier === t}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    tier === t
                      ? "border-neon-pink/70 bg-neon-pink/15 text-neon-pink shadow-[0_0_20px_-8px_#ff2e88]"
                      : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2.5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              Region
            </legend>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  aria-pressed={region === r}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    region === r
                      ? "border-neon-blue/70 bg-neon-blue/15 text-neon-blue shadow-[0_0_20px_-8px_#00e5ff]"
                      : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-ink-dim transition-colors hover:text-ink">
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(e) => setOpenOnly(e.target.checked)}
            className="h-4 w-4 accent-[#ff2e88]"
          />
          Open registration only
        </label>
      </div>

      <p aria-live="polite" className="mb-5 text-sm text-ink-faint">
        <span className="font-display font-bold text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "tournament" : "tournaments"}
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-white/8 bg-carbon py-20 text-center">
          <p className="font-display text-lg font-bold text-ink">No tournaments match</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-dim">
            Try widening the region or clearing the tier filter.
          </p>
        </div>
      ) : (
        <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((t, i) => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TournamentCard t={t} index={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  );
}
