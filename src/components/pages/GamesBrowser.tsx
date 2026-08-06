"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GAMES, GENRES, PLATFORMS, type Genre, type Platform } from "@/lib/data";
import GameCard from "@/components/ui/GameCard";
import GameArt from "@/components/ui/GameArt";
import { formatPrice } from "@/lib/data";
import { Star, Users } from "lucide-react";

type SortKey = "popular" | "rating" | "newest" | "price-low" | "price-high";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most Popular" },
  { key: "rating", label: "Top Rated" },
  { key: "newest", label: "Newest" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
];

export default function GamesBrowser() {
  const params = useSearchParams();
  const initialGenre = params.get("genre") as Genre | null;

  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState<Genre[]>(
    initialGenre && GENRES.includes(initialGenre) ? [initialGenre] : [],
  );
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState<SortKey>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keeps typing responsive while the (client-side) filter recomputes.
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    const filtered = GAMES.filter((g) => {
      if (q && !`${g.title} ${g.genre} ${g.tagline} ${g.tags.join(" ")}`.toLowerCase().includes(q))
        return false;
      if (genres.length && !genres.includes(g.genre)) return false;
      if (platforms.length && !platforms.some((p) => g.platforms.includes(p))) return false;
      if (freeOnly && g.price !== 0) return false;
      if (onSale && !g.discount) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case "price-low":
        sorted.sort(
          (a, b) =>
            a.price * (1 - (a.discount ?? 0) / 100) - b.price * (1 - (b.discount ?? 0) / 100),
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) =>
            b.price * (1 - (b.discount ?? 0) / 100) - a.price * (1 - (a.discount ?? 0) / 100),
        );
        break;
      default:
        sorted.sort((a, b) => b.playersRaw - a.playersRaw);
    }

    return sorted;
  }, [deferredQuery, genres, platforms, freeOnly, onSale, sort]);

  const activeCount =
    genres.length + platforms.length + (freeOnly ? 1 : 0) + (onSale ? 1 : 0) + (query ? 1 : 0);

  function toggleGenre(g: Genre) {
    setGenres((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]));
  }

  function togglePlatform(p: Platform) {
    setPlatforms((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  }

  function reset() {
    setQuery("");
    setGenres([]);
    setPlatforms([]);
    setFreeOnly(false);
    setOnSale(false);
  }

  const filterPanel = (
    <div className="space-y-7">
      {/* Genre */}
      <fieldset>
        <legend className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          Genre
        </legend>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => {
            const on = genres.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleGenre(g)}
                aria-pressed={on}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  on
                    ? "border-neon-blue/70 bg-neon-blue/15 text-neon-blue shadow-[0_0_20px_-8px_#00e5ff]"
                    : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Platform */}
      <fieldset>
        <legend className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          Platform
        </legend>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => {
            const on = platforms.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => togglePlatform(p)}
                aria-pressed={on}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  on
                    ? "border-neon-purple/70 bg-neon-purple/20 text-ink shadow-[0_0_20px_-8px_#7c3aed]"
                    : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset>
        <legend className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          Price
        </legend>
        <div className="space-y-2.5">
          {[
            { label: "Free to play only", checked: freeOnly, set: setFreeOnly },
            { label: "On sale", checked: onSale, set: setOnSale },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="h-4 w-4 shrink-0 accent-[#00e5ff]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs text-neon-pink transition-colors hover:text-ink"
        >
          <X size={12} />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <label htmlFor="games-search" className="sr-only">
            Search games
          </label>
          <input
            id="games-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, or tag…"
            className="w-full rounded-lg border border-white/10 bg-carbon py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/25"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="games-sort" className="sr-only">
            Sort games
          </label>
          <select
            id="games-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-white/10 bg-carbon px-3 py-3.5 text-sm text-ink-dim outline-none transition-colors focus:border-neon-blue/60"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key} className="bg-carbon">
                {s.label}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex rounded-lg border border-white/10 bg-carbon p-1">
            {([
              { key: "grid", Icon: LayoutGrid, label: "Grid view" },
              { key: "list", Icon: List, label: "List view" },
            ] as const).map(({ key, Icon, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-label={label}
                aria-pressed={view === key}
                className={`grid h-9 w-9 place-items-center rounded transition-colors ${
                  view === key ? "bg-neon-blue/20 text-neon-blue" : "text-ink-faint hover:text-ink"
                }`}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>

          {/* Mobile filter trigger */}
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
            className="relative flex items-center gap-2 rounded-lg border border-white/10 bg-carbon px-4 py-3.5 text-sm text-ink-dim transition-colors hover:text-ink lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeCount > 0 && (
              <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-neon-blue px-1 text-[10px] font-bold text-void">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28 rounded-xl border border-white/8 bg-carbon p-5">
            {filterPanel}
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <p aria-live="polite" className="mb-5 text-sm text-ink-faint">
            <span className="font-display font-bold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "game" : "games"}
            {activeCount > 0 && " matching your filters"}
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border border-white/8 bg-carbon py-20 text-center">
              <p className="font-display text-lg font-bold text-ink">No games found</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-dim">
                Nothing matches that combination. Try removing a filter or searching a broader
                term.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-lg border border-neon-blue/50 bg-neon-blue/10 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-neon-blue transition-colors hover:bg-neon-blue/20"
              >
                Reset filters
              </button>
            </div>
          ) : view === "grid" ? (
            <motion.ul
              layout
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {results.map((g) => (
                  <motion.li
                    key={g.id}
                    id={g.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="scroll-mt-28"
                  >
                    <GameCard game={g} tilt={false} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {results.map((g) => (
                  <motion.li
                    key={g.id}
                    id={g.slug}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="scroll-mt-28"
                  >
                    <article className="group flex gap-4 rounded-xl border border-white/8 bg-carbon p-3 transition-all duration-400 hover:border-neon-blue/45 hover:shadow-[0_0_40px_-16px_rgba(0,229,255,0.6)] sm:gap-5 sm:p-4">
                      <span className="h-20 w-32 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-40">
                        <GameArt
                          art={g.art}
                          title={g.title}
                          className="h-full w-full transition-transform duration-600 group-hover:scale-108"
                        />
                      </span>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-sm font-bold text-ink transition-colors group-hover:text-neon-blue sm:text-base">
                            {g.title}
                          </h3>
                          <span className="rounded bg-white/6 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-ink-faint">
                            {g.genre}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-1 text-xs text-ink-dim sm:line-clamp-2">
                          {g.tagline}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-faint">
                          <span className="flex items-center gap-1 text-neon-lime">
                            <Star size={11} className="fill-neon-lime" />
                            {g.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={11} />
                            {g.players}
                          </span>
                          <span className="hidden sm:inline">{g.platforms.join(" · ")}</span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end justify-center gap-1">
                        {g.discount ? (
                          <span className="text-[11px] text-ink-faint line-through">
                            ${g.price.toFixed(2)}
                          </span>
                        ) : null}
                        <span
                          className={`font-display text-sm font-bold ${
                            g.price === 0 ? "text-neon-lime" : "text-ink"
                          }`}
                        >
                          {formatPrice(g.price, g.discount)}
                        </span>
                      </div>
                    </article>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-void/75 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="fixed inset-x-0 bottom-0 z-51 max-h-[82vh] overflow-y-auto rounded-t-2xl border-t border-white/12 bg-abyss p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-base font-bold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint hover:bg-white/8 hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>

              {filterPanel}

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="mt-8 w-full rounded-lg bg-[linear-gradient(100deg,#00e5ff,#7c3aed_60%,#ff2e88)] py-3.5 font-display text-sm font-bold uppercase tracking-wider text-void"
              >
                Show {results.length} {results.length === 1 ? "game" : "games"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
