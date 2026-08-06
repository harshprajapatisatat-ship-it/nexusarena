import Link from "next/link";
import { Gamepad2, Github, MessageSquare, Twitch, Twitter, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Browse Games", href: "/games" },
      { label: "Tournaments", href: "/tournaments" },
      { label: "Leaderboards", href: "/leaderboards" },
      { label: "Store", href: "/store" },
      { label: "News & Updates", href: "/news" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community Hub", href: "/community" },
      { label: "Creator Program", href: "/community#creators" },
      { label: "Forums", href: "/community#forums" },
      { label: "Events Calendar", href: "/tournaments" },
      { label: "Code of Conduct", href: "/community#conduct" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press Kit", href: "/about#press" },
      { label: "Partners", href: "/about#partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/contact" },
      { label: "Server Status", href: "/contact#status" },
      { label: "Bug Reports", href: "/contact#bugs" },
      { label: "Refund Policy", href: "/contact#refunds" },
      { label: "Accessibility", href: "/about#accessibility" },
    ],
  },
];

const SOCIALS = [
  { label: "Discord", href: "https://discord.com", Icon: MessageSquare, color: "#5865F2" },
  { label: "Twitch", href: "https://twitch.tv", Icon: Twitch, color: "#9146FF" },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube, color: "#FF0000" },
  { label: "X", href: "https://x.com", Icon: Twitter, color: "#00e5ff" },
  { label: "GitHub", href: "https://github.com", Icon: Github, color: "#ffffff" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/8 bg-abyss">
      {/* Top edge glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#00e5ff,#7c3aed,#ff2e88,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.16),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-[linear-gradient(135deg,#00e5ff,#7c3aed,#ff2e88)] transition-transform duration-500 group-hover:rotate-45"
                />
                <Gamepad2 size={18} className="relative text-void" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-black tracking-tight">
                NEXUS<span className="text-gradient">ARENA</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-ink-dim">
              The competitive gaming platform where 1.2 million players find their next match,
              their next team, and their next title. Built for the people who take the game
              seriously.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  style={{ ["--hover" as string]: color }}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/3 text-ink-dim transition-all duration-300 hover:-translate-y-1 hover:border-[var(--hover)] hover:text-[var(--hover)] hover:shadow-[0_0_24px_-6px_var(--hover)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-neon-blue"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-neon-blue transition-all duration-300 group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Nexus Arena. A fictional platform built as a design
            showcase. All titles and teams are invented.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-faint">
            {["Privacy Policy", "Terms of Service", "Cookie Settings", "EULA"].map((t) => (
              <li key={t}>
                <Link href="/contact" className="transition-colors hover:text-ink">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
