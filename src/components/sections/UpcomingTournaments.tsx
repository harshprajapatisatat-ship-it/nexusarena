"use client";

import { Globe, Trophy, Users } from "lucide-react";
import { TOURNAMENTS, type Tournament } from "@/lib/data";
import Countdown from "@/components/ui/Countdown";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";

const TIER_ACCENT: Record<Tournament["tier"], string> = {
  Invitational: "#ff2e88",
  Major: "#00e5ff",
  "Open Qualifier": "#7c3aed",
  "Community Cup": "#b6ff3c",
};

export function TournamentCard({ t, index = 0 }: { t: Tournament; index?: number }) {
  const accent = TIER_ACCENT[t.tier];
  const isLive = t.status === "live";
  const filled = t.slotsLeft === 0;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        style={{ ["--accent" as string]: accent }}
        className="clip-corner group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-carbon p-5 transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_46px_-14px_var(--accent)]"
      >
        {/* Accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
          style={{ background: accent }}
        />

        <header className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              className="inline-block rounded px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest"
              style={{ color: accent, background: `${accent}1f`, boxShadow: `inset 0 0 0 1px ${accent}44` }}
            >
              {t.tier}
            </span>
            <h3 className="mt-2.5 text-balance font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-[var(--accent)]">
              {t.name}
            </h3>
            <p className="mt-1 text-xs text-ink-faint">{t.game}</p>
          </div>

          {isLive && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-neon-pink/15 px-2.5 py-1 ring-1 ring-neon-pink/40">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-pink" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-pink" />
              </span>
              <span className="font-display text-[9px] font-bold uppercase tracking-widest text-neon-pink">
                Live
              </span>
            </span>
          )}
        </header>

        {/* Prize */}
        <div className="relative mt-5 flex items-end justify-between border-y border-white/6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-faint">Prize Pool</p>
            <p className="font-display text-2xl font-black text-ink">
              ${t.prizePool.toLocaleString("en-US")}
            </p>
          </div>
          <Trophy size={26} style={{ color: accent }} className="opacity-70" />
        </div>

        {/* Meta */}
        <dl className="relative mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Globe size={13} className="shrink-0 text-ink-faint" />
            <div className="min-w-0">
              <dt className="sr-only">Region</dt>
              <dd className="truncate text-ink-dim">{t.region}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={13} className="shrink-0 text-ink-faint" />
            <div className="min-w-0">
              <dt className="sr-only">Teams</dt>
              <dd className="truncate text-ink-dim">{t.teams} teams</dd>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            <dt className="sr-only">Format</dt>
            <dd className="truncate text-ink-dim">{t.format}</dd>
          </div>
        </dl>

        {/* Countdown */}
        <div className="relative mt-5">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-ink-faint">
            {isLive ? "Status" : "Starts in"}
          </p>
          <Countdown target={t.startsAt} />
        </div>

        {/* CTA */}
        <div className="relative mt-5 flex items-center justify-between gap-3 pt-1">
          <span className={`text-xs font-medium ${filled ? "text-ink-faint" : "text-neon-lime"}`}>
            {filled ? "Registration closed" : `${t.slotsLeft} slots left`}
          </span>
          <NeonLink
            href="/tournaments"
            size="sm"
            variant={filled ? "secondary" : "primary"}
          >
            {filled ? "Details" : "Register"}
          </NeonLink>
        </div>
      </article>
    </Reveal>
  );
}

export default function UpcomingTournaments() {
  const upcoming = TOURNAMENTS.slice(0, 3);

  return (
    <section
      aria-labelledby="tournaments-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,46,136,0.1),transparent_70%)] blur-3xl"
      />

      <SectionHeading
        eyebrow="Compete"
        title={
          <span id="tournaments-heading">
            Upcoming <span className="text-gradient">Tournaments</span>
          </span>
        }
        subtitle="Open brackets, invitationals, and community cups. Registration closes fast."
        action={
          <NeonLink href="/tournaments" variant="secondary" size="sm">
            All tournaments
          </NeonLink>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((t, i) => (
          <TournamentCard key={t.id} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
