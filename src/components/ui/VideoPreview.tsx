"use client";

import { motion } from "framer-motion";
import { Eye, Play, Youtube } from "lucide-react";
import { useState } from "react";

interface VideoItem {
  id: string;
  /** YouTube video id — only loaded once the user clicks. */
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  accent: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    youtubeId: "aqz-KE-bpKQ",
    title: "Eclipse Protocol — Season 7 Cinematic Trailer",
    channel: "Nexus Arena",
    duration: "3:12",
    views: "8.4M",
    accent: "#00e5ff",
  },
  {
    id: "v2",
    youtubeId: "aqz-KE-bpKQ",
    title: "Nexus Invitational — Grand Final Highlights",
    channel: "Nexus Esports",
    duration: "12:47",
    views: "2.1M",
    accent: "#ff2e88",
  },
  {
    id: "v3",
    youtubeId: "aqz-KE-bpKQ",
    title: "Neon Dynasty — District Eight Gameplay Reveal",
    channel: "Studio Nexus",
    duration: "8:03",
    views: "5.6M",
    accent: "#7c3aed",
  },
];

/**
 * Lite YouTube facade.
 *
 * Rendering three real iframes would pull in ~1.5MB of YouTube JS before the
 * user has asked for any of it, which wrecks LCP and TBT. Instead we paint a
 * static poster and swap in the iframe (autoplaying) on click.
 */
export default function VideoPreview() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <Youtube size={17} className="text-[#FF0000]" aria-hidden />
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-ink-dim">
          Watch the latest
        </h3>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => {
          const isPlaying = playing === v.id;

          return (
            <motion.li
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ ["--accent" as string]: v.accent }}
              className="group clip-corner relative overflow-hidden rounded-xl border border-white/8 bg-carbon transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_44px_-16px_var(--accent)]"
            >
              <div className="relative aspect-video overflow-hidden">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(v.id)}
                    aria-label={`Play video: ${v.title}`}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                  >
                    {/* Poster */}
                    <span
                      aria-hidden
                      className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-108"
                      style={{
                        background: `radial-gradient(ellipse 100% 90% at 30% 10%, ${v.accent}66, transparent 60%), radial-gradient(ellipse 90% 80% at 85% 95%, ${v.accent}2a, transparent 55%), #090c15`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,5,10,0.9),transparent_60%)]"
                    />

                    {/* Play button */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FF0000]/90 shadow-[0_0_30px_-4px_rgba(255,0,0,0.8)] transition-transform duration-400 group-hover:scale-115"
                    >
                      <Play size={20} className="ml-0.5 fill-white text-white" />
                    </span>

                    <span
                      aria-hidden
                      className="absolute bottom-2.5 right-2.5 rounded bg-void/85 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink"
                    >
                      {v.duration}
                    </span>
                  </button>
                )}
              </div>

              <div className="p-4">
                <h4 className="line-clamp-2 text-balance font-display text-sm font-bold leading-snug text-ink transition-colors group-hover:text-[var(--accent)]">
                  {v.title}
                </h4>
                <p className="mt-2 flex items-center gap-2.5 text-[11px] text-ink-faint">
                  <span className="truncate">{v.channel}</span>
                  <span aria-hidden>·</span>
                  <span className="flex shrink-0 items-center gap-1">
                    <Eye size={10} />
                    {v.views}
                  </span>
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
