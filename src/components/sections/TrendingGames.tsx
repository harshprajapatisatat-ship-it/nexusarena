import { Flame } from "lucide-react";
import { GAMES } from "@/lib/data";
import GameCard from "@/components/ui/GameCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";

export default function TrendingGames() {
  const trending = GAMES.filter((g) => g.trending).slice(0, 8);

  return (
    <section
      aria-labelledby="trending-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.1),transparent_70%)] blur-3xl"
      />

      <SectionHeading
        eyebrow="Right Now"
        title={
          <span id="trending-heading" className="inline-flex items-center gap-3">
            <Flame className="text-neon-pink" size={30} aria-hidden />
            Trending <span className="text-gradient">Games</span>
          </span>
        }
        subtitle="Ranked by concurrent players over the last 24 hours."
        action={
          <NeonLink href="/games" variant="secondary" size="sm">
            Explore library
          </NeonLink>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((game, i) => (
          <Reveal key={game.id} delay={(i % 4) * 0.08} className="h-full">
            <GameCard game={game} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
