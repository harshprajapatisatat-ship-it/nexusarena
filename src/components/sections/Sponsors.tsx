import { SPONSORS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

/**
 * Infinite marquee. The list is duplicated once and translated -50%, so the
 * seam lands exactly where the copy repeats.
 */
export default function Sponsors() {
  const track = [...SPONSORS, ...SPONSORS];

  return (
    <section
      aria-labelledby="sponsors-heading"
      className="relative overflow-hidden border-y border-white/8 bg-abyss py-14"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2
            id="sponsors-heading"
            className="text-center font-display text-xs font-bold uppercase tracking-[0.3em] text-ink-faint"
          >
            Sponsors &amp; Partners
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-10"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        {/* Pauses on hover so names stay readable */}
        <ul className="group flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
          {track.map((s, i) => (
            <li
              key={`${s.name}-${i}`}
              // The duplicate half is decorative — don't read it out twice.
              aria-hidden={i >= SPONSORS.length}
            >
              <div className="clip-notch flex w-56 shrink-0 flex-col items-center justify-center gap-1 border border-white/8 bg-carbon px-6 py-6 transition-all duration-500 hover:border-neon-blue/50 hover:shadow-[0_0_38px_-14px_rgba(0,229,255,0.7)]">
                <span className="font-display text-lg font-black tracking-tight text-ink-dim transition-colors duration-300 hover:text-ink">
                  {s.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  {s.tag}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
