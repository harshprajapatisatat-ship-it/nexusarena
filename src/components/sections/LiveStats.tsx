"use client";

import { Activity, DollarSign, Swords, Users } from "lucide-react";
import type { ComponentType } from "react";
import { LIVE_STATS } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

const ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  Users,
  Swords,
  DollarSign,
  Activity,
];

export default function LiveStats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden border-y border-white/8 bg-abyss py-16 lg:py-20"
    >
      {/* Animated gradient bed */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,229,255,0.09),rgba(124,58,237,0.11)_45%,rgba(255,46,136,0.09))] bg-[length:300%_100%] animate-gradient-pan"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-10 flex items-center justify-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-lime" />
          </span>
          <h2
            id="stats-heading"
            className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ink-dim"
          >
            Live Platform Statistics
          </h2>
        </Reveal>

        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {LIVE_STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div
                  style={{ ["--accent" as string]: stat.accent }}
                  className="group glass clip-notch relative flex h-full flex-col items-center gap-3 overflow-hidden p-5 text-center transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_44px_-14px_var(--accent)] sm:p-7"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-12 h-24 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: stat.accent }}
                  />

                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${stat.accent}1a`,
                      boxShadow: `inset 0 0 0 1px ${stat.accent}40`,
                    }}
                  >
                    <Icon size={19} className="text-[var(--accent)]" />
                  </span>

                  <dd className="font-display text-2xl font-black tabular-nums text-ink sm:text-3xl lg:text-4xl">
                    <Counter
                      value={stat.value}
                      prefix={"prefix" in stat ? (stat.prefix as string) : ""}
                      suffix={stat.suffix}
                      live={i < 2}
                    />
                  </dd>

                  <dt className="text-[11px] font-medium uppercase tracking-widest text-ink-faint sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
