import type { Metadata } from "next";
import { Gamepad2, Home, Search } from "lucide-react";
import { NeonLink } from "@/components/ui/NeonButton";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-5 py-32">
      {/* Ambience */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_20%,rgba(124,58,237,0.28),transparent_60%)]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,46,136,0.24),transparent_65%)] blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative text-center">
        <p
          aria-hidden
          className="font-display text-[clamp(6rem,22vw,14rem)] font-black leading-none tracking-tighter text-gradient animate-flicker"
        >
          404
        </p>

        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          This match doesn&apos;t exist
        </h1>

        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-ink-dim sm:text-base">
          The page you&apos;re looking for was moved, renamed, or never made it out of the lobby.
          Let&apos;s get you back somewhere useful.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NeonLink href="/" size="md" icon={<Home size={15} />}>
            Back to home
          </NeonLink>
          <NeonLink href="/games" size="md" variant="secondary" icon={<Search size={15} />}>
            Browse games
          </NeonLink>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-xs text-ink-faint">
          <Gamepad2 size={13} aria-hidden />
          Error code: NEXUS_ROUTE_NOT_FOUND
        </p>
      </div>
    </div>
  );
}
