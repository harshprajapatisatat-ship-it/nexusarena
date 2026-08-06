"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Play, Star, Users } from "lucide-react";
import type { MouseEvent } from "react";
import { formatPrice, type Game } from "@/lib/data";
import { useWishlist } from "@/components/providers/WishlistProvider";
import GameArt from "./GameArt";

interface GameCardProps {
  game: Game;
  /** Disables the tilt on dense grids where it would feel noisy. */
  tilt?: boolean;
  priority?: boolean;
}

export default function GameCard({ game, tilt = true }: GameCardProps) {
  const { has, toggle } = useWishlist();
  const wishlisted = has(game.id);

  // Pointer position drives both the tilt and the spotlight highlight.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 22 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 22 });

  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${spotX} ${spotY}, rgba(0,229,255,0.16), transparent 70%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const discounted = game.discount && game.price > 0;

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        tilt
          ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }
          : undefined
      }
      className="group relative h-full"
    >
      <div className="clip-corner relative h-full overflow-hidden rounded-xl border border-white/8 bg-carbon transition-all duration-500 group-hover:border-neon-blue/45 group-hover:shadow-[0_0_50px_-14px_rgba(0,229,255,0.65)]">
        {/* Cover */}
        <div className="relative aspect-16/10 overflow-hidden">
          <GameArt
            art={game.art}
            title={game.title}
            className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-115"
          />

          {/* Pointer spotlight */}
          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="glass-strong rounded px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-neon-blue">
              {game.genre}
            </span>
            {discounted && (
              <span className="rounded bg-neon-pink px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-white">
                −{game.discount}%
              </span>
            )}
            {game.price === 0 && (
              <span className="rounded bg-neon-lime px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-void">
                Free
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => toggle(game.id)}
            aria-pressed={wishlisted}
            aria-label={
              wishlisted ? `Remove ${game.title} from wishlist` : `Add ${game.title} to wishlist`
            }
            className="glass-strong absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full transition-all duration-300 hover:scale-110 hover:border-neon-pink/70"
          >
            <Heart
              size={16}
              className={
                wishlisted ? "fill-neon-pink text-neon-pink" : "text-ink-dim hover:text-neon-pink"
              }
            />
          </button>

          {/* Hover play affordance */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="grid h-14 w-14 translate-y-3 place-items-center rounded-full border border-neon-blue/60 bg-neon-blue/15 backdrop-blur-sm transition-transform duration-400 group-hover:translate-y-0">
              <Play size={20} className="ml-0.5 fill-neon-blue text-neon-blue" />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base font-bold leading-tight text-ink transition-colors group-hover:text-neon-blue">
              <Link href={`/games#${game.slug}`} className="after:absolute after:inset-0">
                {game.title}
              </Link>
            </h3>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neon-lime">
              <Star size={12} className="fill-neon-lime" />
              {game.rating}
            </span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-ink-dim">{game.tagline}</p>

          <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-3">
            <span className="flex items-center gap-1.5 text-xs text-ink-faint">
              <Users size={12} />
              {game.players}
            </span>

            <span className="flex items-baseline gap-2">
              {discounted && (
                <span className="text-xs text-ink-faint line-through">
                  ${game.price.toFixed(2)}
                </span>
              )}
              <span
                className={`font-display text-sm font-bold ${
                  game.price === 0 ? "text-neon-lime" : "text-ink"
                }`}
              >
                {formatPrice(game.price, game.discount)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
