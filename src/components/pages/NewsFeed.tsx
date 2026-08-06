"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NEWS, type NewsItem } from "@/lib/data";
import NewsCard from "@/components/ui/NewsCard";

const CATEGORIES = [
  "All",
  "Patch Notes",
  "Esports",
  "Announcement",
  "Dev Blog",
  "Community",
] as const;

export default function NewsFeed() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return NEWS.filter((n) => {
      if (category !== "All" && n.category !== (category as NewsItem["category"])) return false;
      if (q && !`${n.title} ${n.excerpt} ${n.author}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  const [lead, ...rest] = results;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      {/* Controls */}
      <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                category === c
                  ? "border-neon-blue/70 bg-neon-blue/15 text-neon-blue shadow-[0_0_22px_-8px_#00e5ff]"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative lg:w-72">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <label htmlFor="news-search" className="sr-only">
            Search articles
          </label>
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-lg border border-white/10 bg-carbon py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/25"
          />
        </div>
      </div>

      <p aria-live="polite" className="mb-6 text-sm text-ink-faint">
        <span className="font-display font-bold text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "article" : "articles"}
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-white/8 bg-carbon py-20 text-center">
          <p className="font-display text-lg font-bold text-ink">Nothing published here yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-dim">
            Try another category, or clear your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          <motion.div layout className="lg:col-span-1 lg:row-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={lead.id}
                id={lead.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="h-full scroll-mt-28"
              >
                <NewsCard item={lead} featured />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {rest.map((item, i) => (
                <motion.li
                  key={item.id}
                  id={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                  className="h-full scroll-mt-28"
                >
                  <NewsCard item={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      )}
    </div>
  );
}
