"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, Star, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GAMES, formatPrice } from "@/lib/data";
import GameArt from "@/components/ui/GameArt";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GAMES.filter((g) => g.trending).slice(0, 6);

    return GAMES.filter((g) =>
      [g.title, g.genre, g.tagline, ...g.tags].join(" ").toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      // Wait for the enter animation before stealing focus
      const id = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 flex items-start justify-center bg-void/85 px-4 pt-[12vh] backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search games"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="glass-strong w-full max-w-2xl overflow-hidden rounded-2xl shadow-[0_0_80px_-20px_rgba(0,229,255,0.5)]"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <Search size={18} className="shrink-0 text-neon-blue" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search games, genres, tags…"
                aria-label="Search games"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-faint transition-colors hover:bg-white/8 hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {!query && (
                <p className="px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Trending now
                </p>
              )}

              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-ink-dim">
                  No games match “{query}”. Try a genre like{" "}
                  <span className="text-neon-blue">FPS</span> or{" "}
                  <span className="text-neon-blue">Roguelite</span>.
                </p>
              ) : (
                <ul>
                  {results.map((g, i) => (
                    <li key={g.id}>
                      <Link
                        href={`/games#${g.slug}`}
                        onClick={onClose}
                        onMouseEnter={() => setCursor(i)}
                        className={`flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors ${
                          i === cursor ? "bg-neon-blue/10" : "hover:bg-white/4"
                        }`}
                      >
                        <span className="h-11 w-16 shrink-0 overflow-hidden rounded-md">
                          <GameArt art={g.art} title={g.title} className="h-full w-full" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-sm font-semibold text-ink">
                            {g.title}
                          </span>
                          <span className="block truncate text-xs text-ink-faint">
                            {g.genre} · {g.players} players
                          </span>
                        </span>

                        <span className="hidden items-center gap-1 text-xs text-neon-lime sm:flex">
                          <Star size={11} className="fill-neon-lime" />
                          {g.rating}
                        </span>

                        <span className="shrink-0 font-display text-xs font-bold text-ink-dim">
                          {formatPrice(g.price, g.discount)}
                        </span>

                        {i === cursor && (
                          <CornerDownLeft size={13} className="shrink-0 text-neon-blue" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/8 px-5 py-2.5 text-[11px] text-ink-faint">
              <span className="flex gap-3">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
                <span>esc close</span>
              </span>
              <Link href="/games" onClick={onClose} className="text-neon-blue hover:underline">
                Browse all {GAMES.length} games
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
