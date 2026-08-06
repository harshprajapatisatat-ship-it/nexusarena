"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { GAMES, PRODUCTS, formatPrice, type Product } from "@/lib/data";
import { useWishlist } from "@/components/providers/WishlistProvider";
import GameArt from "@/components/ui/GameArt";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";

const TYPES = ["All", "Game", "Bundle", "Battle Pass", "Currency", "Cosmetic", "Hardware"] as const;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [added, setAdded] = useState(false);
  const discounted = product.discount && product.discount > 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="h-full"
    >
      <article className="clip-corner group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-carbon transition-all duration-500 hover:border-neon-purple/50 hover:shadow-[0_0_48px_-14px_rgba(124,58,237,0.75)]">
        <div className="relative aspect-16/10 overflow-hidden">
          <GameArt
            art={product.art}
            title={product.name}
            className="h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="glass-strong rounded px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-neon-purple">
              {product.type}
            </span>
            {product.badge && (
              <span className="rounded bg-neon-blue px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-void">
                {product.badge}
              </span>
            )}
          </div>

          {discounted && (
            <span className="absolute right-3 top-3 rounded bg-neon-pink px-2.5 py-1 font-display text-xs font-black text-white shadow-[0_0_20px_-4px_#ff2e88]">
              −{product.discount}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-balance font-display text-sm font-bold leading-snug text-ink transition-colors group-hover:text-neon-purple">
              {product.name}
            </h3>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neon-lime">
              <Star size={11} className="fill-neon-lime" />
              {product.rating}
            </span>
          </div>

          <p className="mt-2.5 flex-1 text-xs leading-relaxed text-ink-dim">
            {product.description}
          </p>

          <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/6 pt-4">
            <div>
              {discounted && (
                <p className="text-xs text-ink-faint line-through">
                  ${product.price.toFixed(2)}
                </p>
              )}
              <p className="font-display text-xl font-black text-ink">
                {formatPrice(product.price, product.discount)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAdded((v) => !v)}
              aria-pressed={added}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2.5 font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                added
                  ? "bg-neon-lime/20 text-neon-lime ring-1 ring-neon-lime/50"
                  : "bg-[linear-gradient(100deg,#00e5ff,#7c3aed)] text-void hover:shadow-[0_0_26px_-6px_#7c3aed]"
              }`}
            >
              {added ? <Check size={13} /> : <ShoppingCart size={13} />}
              {added ? "In cart" : "Add"}
            </button>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default function StoreGrid() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const { ids, toggle, clear, count } = useWishlist();

  const results = useMemo(
    () => (type === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.type === type)),
    [type],
  );

  const wishlistGames = useMemo(() => GAMES.filter((g) => ids.includes(g.id)), [ids]);

  const wishlistTotal = wishlistGames.reduce(
    (sum, g) => sum + g.price * (1 - (g.discount ?? 0) / 100),
    0,
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      {/* ---- Wishlist ---- */}
      <section id="wishlist" aria-labelledby="wishlist-heading" className="mb-20 scroll-mt-28">
        <SectionHeading
          eyebrow="Saved"
          title={
            <span id="wishlist-heading">
              Your <span className="text-gradient">Wishlist</span>
            </span>
          }
          subtitle="Saved to this browser. We'll flag anything here the moment it goes on sale."
          action={
            count > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs text-ink-dim transition-colors hover:border-neon-pink/50 hover:text-neon-pink"
              >
                <Trash2 size={12} />
                Clear wishlist
              </button>
            ) : undefined
          }
        />

        {count === 0 ? (
          <div className="clip-corner rounded-xl border border-dashed border-white/12 bg-carbon/50 py-16 text-center">
            <Heart size={30} className="mx-auto text-ink-faint" aria-hidden />
            <p className="mt-4 font-display text-base font-bold text-ink">
              Nothing saved yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-dim">
              Tap the heart on any game card to track its price. Your list stays on this device.
            </p>
            <NeonLink href="/games" variant="secondary" size="sm" className="mt-6">
              Browse games
            </NeonLink>
          </div>
        ) : (
          <div className="clip-corner overflow-hidden rounded-xl border border-white/8 bg-carbon">
            <ul className="divide-y divide-white/6">
              <AnimatePresence initial={false}>
                {wishlistGames.map((g) => (
                  <motion.li
                    key={g.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 p-4">
                      <span className="h-14 w-24 shrink-0 overflow-hidden rounded-lg">
                        <GameArt art={g.art} title={g.title} className="h-full w-full" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold text-ink">
                          {g.title}
                        </p>
                        <p className="truncate text-xs text-ink-faint">
                          {g.genre} · {g.platforms.join(", ")}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        {g.discount ? (
                          <p className="text-[11px] text-ink-faint line-through">
                            ${g.price.toFixed(2)}
                          </p>
                        ) : null}
                        <p
                          className={`font-display text-sm font-bold ${
                            g.price === 0 ? "text-neon-lime" : "text-ink"
                          }`}
                        >
                          {formatPrice(g.price, g.discount)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggle(g.id)}
                        aria-label={`Remove ${g.title} from wishlist`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-faint transition-colors hover:bg-neon-pink/12 hover:text-neon-pink"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 bg-white/2 px-5 py-4">
              <p className="text-sm text-ink-dim">
                {count} {count === 1 ? "item" : "items"} ·{" "}
                <span className="font-display font-bold text-ink">
                  ${wishlistTotal.toFixed(2)}
                </span>{" "}
                total
              </p>
              <NeonLink href="/contact#signin" size="sm" icon={<ShoppingCart size={13} />}>
                Buy all
              </NeonLink>
            </div>
          </div>
        )}
      </section>

      {/* ---- Catalogue ---- */}
      <section aria-labelledby="catalogue-heading">
        <SectionHeading
          eyebrow="This Week"
          title={
            <span id="catalogue-heading">
              Featured <span className="text-gradient">Deals</span>
            </span>
          }
          subtitle="Discounts refresh every Thursday at 18:00 UTC."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                type === t
                  ? "border-neon-purple/70 bg-neon-purple/20 text-ink shadow-[0_0_22px_-8px_#7c3aed]"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </div>
  );
}
