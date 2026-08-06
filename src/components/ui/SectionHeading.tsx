import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-10 flex flex-col gap-6 sm:mb-14 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <Reveal className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <div
            className={`mb-3 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
          >
            <span
              aria-hidden
              className="h-px w-8 bg-[linear-gradient(90deg,transparent,#00e5ff)]"
            />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-neon-blue">
              {eyebrow}
            </span>
            <span
              aria-hidden
              className="h-px w-8 bg-[linear-gradient(90deg,#00e5ff,transparent)]"
            />
          </div>
        )}

        <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-dim">{subtitle}</p>
        )}
      </Reveal>

      {action && <Reveal delay={0.15}>{action}</Reveal>}
    </div>
  );
}
