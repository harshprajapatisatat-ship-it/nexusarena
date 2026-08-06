"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Play, Star, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GAMES, formatPrice } from "@/lib/data";
import { useWishlist } from "@/components/providers/WishlistProvider";
import GameArt from "@/components/ui/GameArt";
import { NeonLink } from "@/components/ui/NeonButton";
import SectionHeading from "@/components/ui/SectionHeading";

const FEATURED = GAMES.filter((g) => g.featured);
const AUTOPLAY_MS = 6500;

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const { has, toggle } = useWishlist();

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + FEATURED.length) % FEATURED.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (!document.hidden) go(index + 1, 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const game = FEATURED[index];
  const wishlisted = has(game.id);

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeading
        eyebrow="Handpicked"
        title={
          <span id="featured-heading">
            Featured <span className="text-gradient">Games</span>
          </span>
        }
        subtitle="The titles our editors and our player base agree on — updated weekly."
        action={
          <NeonLink href="/games" variant="secondary" size="sm">
            Browse all games
          </NeonLink>
        }
      />

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Stage */}
        <div className="clip-corner relative overflow-hidden rounded-2xl border border-white/10 bg-carbon">
          <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-21/9">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={game.id}
                custom={dir}
                initial={{ opacity: 0, scale: 1.06, x: dir * 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: dir * -60 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(index + 1, 1);
                  else if (info.offset.x > 70) go(index - 1, -1);
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <GameArt
                  art={game.art}
                  title={game.title}
                  variant="hero"
                  className="h-full w-full"
                />

                {/* Readability scrims */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,#04050a_8%,rgba(4,5,10,0.75)_40%,transparent_75%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_right,#04050a_0%,rgba(4,5,10,0.6)_38%,transparent_70%)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Copy overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-end">
              <div className="w-full p-5 sm:p-8 lg:max-w-2xl lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    className="pointer-events-auto"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-neon-blue/20 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-neon-blue ring-1 ring-neon-blue/40">
                        {game.genre}
                      </span>
                      {game.discount && (
                        <span className="rounded bg-neon-pink px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white">
                          −{game.discount}% off
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs font-semibold text-neon-lime">
                        <Star size={12} className="fill-neon-lime" />
                        {game.rating}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-ink-dim">
                        <Users size={12} />
                        {game.players}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                      {game.title}
                    </h3>

                    <p className="mt-2 font-display text-sm text-neon-blue sm:text-base">
                      {game.tagline}
                    </p>

                    <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-ink-dim sm:block">
                      {game.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <NeonLink href={`/store`} size="md" icon={<Play size={15} />}>
                        {game.price === 0 ? "Play Free" : `Buy · ${formatPrice(game.price, game.discount)}`}
                      </NeonLink>

                      <button
                        type="button"
                        onClick={() => toggle(game.id)}
                        aria-pressed={wishlisted}
                        className="glass inline-flex items-center gap-2 rounded-lg px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:border-neon-pink/60"
                      >
                        <Heart
                          size={15}
                          className={wishlisted ? "fill-neon-pink text-neon-pink" : ""}
                        />
                        {wishlisted ? "Wishlisted" : "Wishlist"}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous featured game"
              className="glass-strong absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink transition-all duration-300 hover:scale-110 hover:border-neon-blue/60 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next featured game"
              className="glass-strong absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink transition-all duration-300 hover:scale-110 hover:border-neon-blue/60 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {/* Thumbnails / dots */}
        <div
          role="tablist"
          aria-label="Featured games"
          className="mt-5 flex items-center justify-center gap-2 sm:gap-3"
        >
          {FEATURED.map((g, i) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={i === index}
              aria-label={g.title}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={`group relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                i === index ? "w-14 bg-white/15 sm:w-20" : "w-6 bg-white/12 hover:bg-white/25 sm:w-8"
              }`}
            >
              {i === index && (
                <motion.span
                  key={`${g.id}-bar`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0.06 : 1 }}
                  transition={{ duration: paused ? 0.3 : AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(90deg,#00e5ff,#ff2e88)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
