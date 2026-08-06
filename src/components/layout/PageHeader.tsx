import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  /** Current page name for the breadcrumb trail. */
  crumb: string;
  accent?: string;
  children?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumb,
  accent = "#00e5ff",
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/8 pb-14 pt-32 sm:pb-20 sm:pt-40">
      {/* Ambience */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 110% 80% at 50% -20%, ${accent}2e, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_100%,rgba(124,58,237,0.18),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "radial-gradient(ellipse 70% 100% at 50% 0%, #000, transparent 75%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs text-ink-faint">
              <li>
                <Link href="/" className="transition-colors hover:text-neon-blue">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={12} />
              </li>
              <li aria-current="page" className="text-ink-dim">
                {crumb}
              </li>
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-8" style={{ background: accent }} />
            <span
              className="font-display text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim sm:text-lg">
            {subtitle}
          </p>
        </Reveal>

        {children && <Reveal delay={0.16}>{children}</Reveal>}
      </div>
    </header>
  );
}
