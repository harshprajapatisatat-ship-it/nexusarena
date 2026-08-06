"use client";

import { motion } from "framer-motion";
import { Crown, Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { Player } from "@/lib/data";

const TIER_COLOR: Record<Player["tier"], string> = {
  Radiant: "#ff2e88",
  Immortal: "#7c3aed",
  Ascendant: "#00e5ff",
  Diamond: "#8fd8ff",
};

const RANK_COLOR = ["#ffd447", "#c9d4e5", "#d98d4a"];

interface Props {
  player: Player;
  index: number;
  /** Hides the columns that don't fit a narrow preview. */
  compact?: boolean;
}

export default function LeaderboardRow({ player, index, compact = false }: Props) {
  const podium = player.rank <= 3;
  const rankColor = podium ? RANK_COLOR[player.rank - 1] : undefined;
  const tier = TIER_COLOR[player.tier];

  return (
    <motion.tr
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      style={{ ["--tier" as string]: tier }}
      className="group border-b border-white/5 transition-colors duration-300 last:border-0 hover:bg-[linear-gradient(90deg,rgba(0,229,255,0.07),transparent)]"
    >
      {/* Rank */}
      <td className="py-3.5 pl-3 pr-2 sm:pl-4">
        <span className="flex items-center gap-2">
          {podium ? (
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
              style={{ background: `${rankColor}22`, boxShadow: `inset 0 0 0 1px ${rankColor}55` }}
            >
              <Crown size={13} style={{ color: rankColor }} />
            </span>
          ) : (
            <span className="grid h-7 w-7 shrink-0 place-items-center font-display text-sm font-bold text-ink-faint">
              {player.rank}
            </span>
          )}
        </span>
      </td>

      {/* Player */}
      <td className="py-3.5 pr-2">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-display text-xs font-black transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${tier}33, ${tier}0d)`,
              boxShadow: `inset 0 0 0 1px ${tier}55`,
              color: tier,
            }}
          >
            {player.handle.slice(0, 2).toUpperCase()}
          </span>

          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-ink transition-colors group-hover:text-neon-blue">
              {player.handle}
            </span>
            <span className="block truncate text-[11px] text-ink-faint">
              <span aria-hidden>{player.flag}</span>{" "}
              <span className="sr-only">{player.country}, </span>
              {player.team}
            </span>
          </span>
        </span>
      </td>

      {/* Tier */}
      {!compact && (
        <td className="hidden py-3.5 pr-2 md:table-cell">
          <span
            className="rounded px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider"
            style={{ color: tier, background: `${tier}1a`, boxShadow: `inset 0 0 0 1px ${tier}40` }}
          >
            {player.tier}
          </span>
        </td>
      )}

      {/* Game */}
      {!compact && (
        <td className="hidden py-3.5 pr-2 text-xs text-ink-dim lg:table-cell">{player.game}</td>
      )}

      {/* Win rate */}
      {!compact && (
        <td className="hidden py-3.5 pr-2 sm:table-cell">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-white/8">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${player.winRate}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block h-full rounded-full bg-[linear-gradient(90deg,#00e5ff,#b6ff3c)]"
              />
            </span>
            <span className="text-xs tabular-nums text-ink-dim">{player.winRate}%</span>
          </span>
        </td>
      )}

      {/* K/D */}
      {!compact && (
        <td className="hidden py-3.5 pr-2 text-xs tabular-nums text-ink-dim sm:table-cell">
          {player.kd.toFixed(2)}
        </td>
      )}

      {/* Points */}
      <td className="py-3.5 pr-2 text-right font-display text-sm font-bold tabular-nums text-ink">
        {player.points.toLocaleString("en-US")}
      </td>

      {/* Movement */}
      <td className="py-3.5 pr-3 text-right sm:pr-4">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
            player.change > 0
              ? "text-neon-lime"
              : player.change < 0
                ? "text-neon-pink"
                : "text-ink-faint"
          }`}
        >
          {player.change > 0 ? (
            <TrendingUp size={12} />
          ) : player.change < 0 ? (
            <TrendingDown size={12} />
          ) : (
            <Minus size={12} />
          )}
          <span className="sr-only">
            {player.change > 0 ? "up " : player.change < 0 ? "down " : "no change"}
          </span>
          {player.change !== 0 && Math.abs(player.change)}
        </span>
      </td>
    </motion.tr>
  );
}
