"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crosshair,
  Flame,
  Gamepad2,
  Mountain,
  Shield,
  Swords,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  FPS: Crosshair,
  "Battle Royale": Flame,
  MOBA: Swords,
  RPG: Shield,
  Racing: Zap,
  Strategy: Target,
  Fighting: Gamepad2,
  Survival: Mountain,
};

export default function Categories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeading
        eyebrow="Find Your Lane"
        title={
          <span id="categories-heading">
            Gaming <span className="text-gradient">Categories</span>
          </span>
        }
        subtitle="Eleven hundred titles, sorted by how you like to win."
        align="center"
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.name] ?? Gamepad2;

          return (
            <motion.li
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ ["--accent" as string]: cat.accent }}
            >
              <Link
                href={`/games?genre=${encodeURIComponent(cat.name)}`}
                className="group clip-corner relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/8 bg-carbon p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--accent)]/55 hover:shadow-[0_0_48px_-14px_var(--accent)] sm:p-6"
              >
                {/* Hover wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 120% 90% at 50% 120%, ${cat.accent}26, transparent 65%)`,
                  }}
                />

                {/* Corner tick */}
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-10 w-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(225deg, ${cat.accent}44, transparent 60%)`,
                  }}
                />

                <span
                  aria-hidden
                  className="relative mb-8 grid h-12 w-12 place-items-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `${cat.accent}14`,
                    boxShadow: `inset 0 0 0 1px ${cat.accent}3d`,
                  }}
                >
                  <Icon size={21} style={{ color: cat.accent }} />
                </span>

                <span className="relative">
                  <span className="block font-display text-base font-bold text-ink transition-colors group-hover:text-[var(--accent)]">
                    {cat.name}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-faint">
                    {cat.blurb}
                  </span>
                  <span className="mt-3 block font-display text-[11px] font-bold uppercase tracking-widest text-ink-dim">
                    {cat.count} titles
                  </span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
