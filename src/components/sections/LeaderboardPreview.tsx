import { LEADERBOARD } from "@/lib/data";
import LeaderboardRow from "@/components/ui/LeaderboardRow";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";

export default function LeaderboardPreview() {
  const top = LEADERBOARD.slice(0, 8);

  return (
    <section
      aria-labelledby="leaderboard-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeading
        eyebrow="Global Ranking"
        title={
          <span id="leaderboard-heading">
            Top <span className="text-gradient">Players</span>
          </span>
        }
        subtitle="Season 7 standings across every ranked title. Updated every 60 seconds."
        action={
          <NeonLink href="/leaderboards" variant="secondary" size="sm">
            Full leaderboard
          </NeonLink>
        }
      />

      <Reveal>
        <div className="clip-corner overflow-hidden rounded-xl border border-white/8 bg-carbon">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <caption className="sr-only">
                Top eight ranked players in Season 7, by points
              </caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/2">
                  {[
                    { label: "Rank", cls: "pl-3 sm:pl-4 text-left" },
                    { label: "Player", cls: "text-left" },
                    { label: "Tier", cls: "hidden md:table-cell text-left" },
                    { label: "Game", cls: "hidden lg:table-cell text-left" },
                    { label: "Win Rate", cls: "hidden sm:table-cell text-left" },
                    { label: "K/D", cls: "hidden sm:table-cell text-left" },
                    { label: "Points", cls: "text-right" },
                    { label: "24h", cls: "text-right pr-3 sm:pr-4" },
                  ].map((h) => (
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
                {top.map((p, i) => (
                  <LeaderboardRow key={p.handle} player={p} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
