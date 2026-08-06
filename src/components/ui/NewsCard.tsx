import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { NewsItem } from "@/lib/data";

interface Props {
  item: NewsItem;
  /** The lead story renders taller with the excerpt always visible. */
  featured?: boolean;
}

export default function NewsCard({ item, featured = false }: Props) {
  const date = new Date(item.date);

  return (
    <article
      style={{ ["--accent" as string]: item.accent }}
      className={`clip-corner group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-carbon transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_46px_-16px_var(--accent)] ${
        featured ? "lg:row-span-2" : ""
      }`}
    >
      {/* Abstract header art */}
      <div
        className={`relative overflow-hidden ${featured ? "h-56 lg:h-72" : "h-32"}`}
        aria-hidden
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-110"
          style={{
            background: `radial-gradient(ellipse 90% 120% at 20% 0%, ${item.accent}55, transparent 60%), radial-gradient(ellipse 80% 100% at 90% 100%, ${item.accent}22, transparent 55%), #0c0f1a`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(115deg, ${item.accent}18 0px, ${item.accent}18 1px, transparent 1px, transparent 14px)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0c0f1a,transparent_65%)]" />

        <span
          className="absolute left-4 top-4 rounded px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
          style={{
            color: item.accent,
            background: `${item.accent}1f`,
            boxShadow: `inset 0 0 0 1px ${item.accent}55`,
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-faint">
          <time dateTime={item.date}>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {item.readTime} min read
          </span>
        </div>

        <h3
          className={`text-balance font-display font-bold leading-snug text-ink transition-colors group-hover:text-[var(--accent)] ${
            featured ? "text-xl lg:text-2xl" : "text-base"
          }`}
        >
          <Link href={`/news#${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>

        <p
          className={`mt-3 text-pretty text-sm leading-relaxed text-ink-dim ${
            featured ? "" : "line-clamp-2"
          }`}
        >
          {item.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="truncate text-xs text-ink-faint">{item.author}</span>
          <span className="flex shrink-0 items-center gap-1 font-display text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
            Read
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
