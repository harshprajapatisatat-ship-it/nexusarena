import type { Metadata } from "next";
import {
  Accessibility,
  Briefcase,
  Building2,
  Download,
  Globe2,
  Handshake,
  Rocket,
  Target,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { NeonLink } from "@/components/ui/NeonButton";
import { SPONSORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Our Story, Careers & Press",
  description:
    "Nexus Arena is a competitive gaming platform built by players. Read our story, browse open roles, download the press kit, and see our accessibility commitments.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nexus Arena — Built by Players",
    description: "Our story, open roles, press kit, and accessibility commitments.",
    url: "/about",
  },
};

const TIMELINE = [
  {
    year: "2019",
    title: "Four people and a Discord server",
    body: "Nexus started as a scrim-finding bot for a single FPS community. It hit 40,000 users before anyone thought to build a website.",
  },
  {
    year: "2021",
    title: "The first Invitational",
    body: "A $15,000 community-funded bracket with 64 teams. The stream peaked at 90,000 concurrents and broke every server we owned.",
  },
  {
    year: "2023",
    title: "Platform launch",
    body: "Store, library, and ranked ladder shipped together. 400 titles at launch; a million registered accounts inside eleven weeks.",
  },
  {
    year: "2025",
    title: "Season format",
    body: "Cross-title ranked seasons with unified points. The ladder finally meant the same thing whether you played MOBA or fighting games.",
  },
  {
    year: "2026",
    title: "Where we are now",
    body: "1,200 titles, 1.2M concurrent players, and $42M paid out in prize money across every region we operate in.",
  },
];

const VALUES = [
  {
    Icon: Target,
    title: "Competitive integrity first",
    body: "Anti-cheat, matchmaking, and ranked decay are decided by the competition team, not by growth targets. We publish the enforcement numbers quarterly.",
    accent: "#00e5ff",
  },
  {
    Icon: Globe2,
    title: "Regional parity",
    body: "Every region gets the same prize structure, the same server tick rate, and the same qualifier slots per capita. No tier-two markets.",
    accent: "#ff2e88",
  },
  {
    Icon: Rocket,
    title: "Ship it, then explain it",
    body: "Every balance change comes with the data behind it. If we can't justify a nerf in writing, it doesn't go out.",
    accent: "#7c3aed",
  },
  {
    Icon: Accessibility,
    title: "Playable by everyone",
    body: "Full remapping, colourblind modes, scalable UI, and screen-reader support are launch requirements — not post-launch patches.",
    accent: "#b6ff3c",
  },
];

const STATS = [
  { label: "Players", value: 1_284_930, suffix: "" },
  { label: "Titles", value: 1_200, suffix: "+" },
  { label: "Paid in Prizes", value: 42, prefix: "$", suffix: "M" },
  { label: "Countries", value: 94, suffix: "" },
];

const ROLES = [
  { title: "Senior Netcode Engineer", team: "Platform", location: "Remote (EU)", type: "Full-time" },
  { title: "Competitive Systems Designer", team: "Esports", location: "Berlin", type: "Full-time" },
  { title: "Accessibility Specialist", team: "Product", location: "Remote (Global)", type: "Full-time" },
  { title: "Anti-Cheat Researcher", team: "Trust & Safety", location: "Remote (NA)", type: "Full-time" },
  { title: "Tournament Operations Lead", team: "Esports", location: "Seoul", type: "Full-time" },
  { title: "Community Manager, APAC", team: "Community", location: "Singapore", type: "Contract" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        crumb="About"
        accent="#00e5ff"
        title={
          <>
            Built by players who got <span className="text-gradient">tired of waiting.</span>
          </>
        }
        subtitle="Nexus Arena started as a scrim-finding bot in 2019. Seven years later it is a platform, a league, and a payout system — still run by people who queue ranked at 2am."
      >
        <dl className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass clip-notch p-4">
              <dd className="font-display text-xl font-black tabular-nums text-ink sm:text-2xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Values */}
      <section
        aria-labelledby="values-heading"
        className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
      >
        <SectionHeading
          eyebrow="What We Hold To"
          title={<span id="values-heading">Our Principles</span>}
          subtitle="Four commitments we've turned down money to keep."
        />

        <ul className="grid gap-5 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <li key={v.title} className="h-full">
              <Reveal delay={(i % 2) * 0.09} className="h-full">
                <div
                  style={{ ["--accent" as string]: v.accent }}
                  className="group clip-corner relative flex h-full gap-5 overflow-hidden rounded-xl border border-white/8 bg-carbon p-6 transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_48px_-16px_var(--accent)] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: v.accent }}
                  />

                  <span
                    aria-hidden
                    className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${v.accent}16`,
                      boxShadow: `inset 0 0 0 1px ${v.accent}3d`,
                    }}
                  >
                    <v.Icon size={21} style={{ color: v.accent }} />
                  </span>

                  <div className="relative">
                    <h3 className="font-display text-base font-bold text-ink transition-colors group-hover:text-[var(--accent)]">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-pretty text-sm leading-relaxed text-ink-dim">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <section
        aria-labelledby="timeline-heading"
        className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <SectionHeading
          eyebrow="How We Got Here"
          title={<span id="timeline-heading">Seven Years, Briefly</span>}
        />

        <ol className="relative ml-1 border-l border-white/10 pl-8 sm:ml-3 sm:pl-12">
          {TIMELINE.map((item, i) => (
            <li key={item.year} className="relative pb-10 last:pb-0">
              <Reveal delay={i * 0.07}>
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute -left-[2.3rem] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-neon-blue bg-void sm:-left-[3.55rem]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-blue" />
                </span>

                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon-blue">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-ink-dim">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Careers */}
      <section
        id="careers"
        aria-labelledby="careers-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <SectionHeading
          eyebrow="Join Us"
          title={<span id="careers-heading">Open Roles</span>}
          subtitle="Six positions open. Remote-first, with hubs in Berlin, Seoul, and Austin."
          action={
            <NeonLink href="/contact" variant="secondary" size="sm" icon={<Briefcase size={13} />}>
              General application
            </NeonLink>
          }
        />

        <ul className="clip-corner divide-y divide-white/6 overflow-hidden rounded-xl border border-white/8 bg-carbon">
          {ROLES.map((role, i) => (
            <li key={role.title}>
              <Reveal delay={Math.min(i * 0.05, 0.25)}>
                <a
                  href="/contact"
                  className="group flex flex-col gap-2 p-5 transition-colors hover:bg-[linear-gradient(90deg,rgba(0,229,255,0.06),transparent)] sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-bold text-ink transition-colors group-hover:text-neon-blue sm:text-base">
                      {role.title}
                    </span>
                    <span className="mt-1 block text-xs text-ink-faint">{role.team}</span>
                  </span>

                  <span className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-white/6 px-2.5 py-1 text-[11px] text-ink-dim">
                      {role.location}
                    </span>
                    <span className="rounded bg-neon-blue/12 px-2.5 py-1 text-[11px] text-neon-blue ring-1 ring-neon-blue/30">
                      {role.type}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="hidden font-display text-[11px] font-bold uppercase tracking-widest text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-neon-blue sm:block"
                  >
                    Apply →
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Press + Partners */}
      <section
        className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Press */}
          <Reveal className="h-full">
            <div
              id="press"
              className="clip-corner flex h-full scroll-mt-24 flex-col rounded-xl border border-white/8 bg-carbon p-6 sm:p-8"
            >
              <Building2 size={26} className="text-neon-blue" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-bold text-ink">Press Kit</h2>
              <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-ink-dim">
                Logos in SVG and PNG, brand colour specifications, executive headshots, product
                screenshots at 4K, and our latest platform fact sheet. Free to use in editorial
                coverage without asking first.
              </p>

              <ul className="mt-5 space-y-2 text-sm text-ink-dim">
                {["Brand assets (24 MB)", "Fact sheet, Q3 2026 (PDF)", "Executive bios & photos"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Download size={13} className="shrink-0 text-neon-blue" aria-hidden />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <NeonLink href="/contact" variant="secondary" size="sm" className="mt-6 self-start">
                Media enquiries
              </NeonLink>
            </div>
          </Reveal>

          {/* Partners */}
          <Reveal delay={0.09} className="h-full">
            <div
              id="partners"
              className="clip-corner flex h-full scroll-mt-24 flex-col rounded-xl border border-white/8 bg-carbon p-6 sm:p-8"
            >
              <Handshake size={26} className="text-neon-pink" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-bold text-ink">Partners</h2>
              <p className="mt-2.5 text-pretty text-sm leading-relaxed text-ink-dim">
                Eight technology and hardware partners underwrite our prize pools and keep the
                servers at sub-15ms tick across every region.
              </p>

              <ul className="mt-6 grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {SPONSORS.map((s) => (
                  <li
                    key={s.name}
                    className="clip-notch flex flex-col items-center justify-center gap-0.5 border border-white/8 bg-void/40 px-2 py-4 text-center transition-colors duration-300 hover:border-neon-pink/40"
                  >
                    <span className="font-display text-[11px] font-black tracking-tight text-ink-dim">
                      {s.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-ink-faint">
                      {s.tag}
                    </span>
                  </li>
                ))}
              </ul>

              <NeonLink href="/contact" variant="secondary" size="sm" className="mt-6 self-start">
                Partnership enquiries
              </NeonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accessibility */}
      <section
        id="accessibility"
        aria-labelledby="a11y-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden rounded-2xl border border-neon-lime/25 bg-carbon p-6 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(182,255,60,0.22),transparent_65%)] blur-3xl"
            />

            <div className="relative">
              <Accessibility size={28} className="text-neon-lime" aria-hidden />
              <h2 id="a11y-heading" className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                Accessibility commitment
              </h2>
              <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-ink-dim sm:text-base">
                This platform targets WCAG 2.2 Level AA. Every interactive element is keyboard
                reachable with a visible focus ring, all motion respects{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-xs text-neon-lime">
                  prefers-reduced-motion
                </code>
                , colour is never the sole carrier of meaning, and text meets 4.5:1 contrast against
                its background. Found something that doesn&apos;t? Tell us and we&apos;ll fix it.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Full keyboard navigation",
                  "Screen-reader landmarks",
                  "Reduced-motion support",
                  "4.5:1 minimum contrast",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-white/8 bg-void/40 px-3 py-2.5 text-xs text-ink-dim"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-lime" />
                    {item}
                  </li>
                ))}
              </ul>

              <NeonLink href="/contact" variant="secondary" size="sm" className="mt-7">
                Report an issue
              </NeonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
