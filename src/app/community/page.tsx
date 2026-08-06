import type { Metadata } from "next";
import { Award, Heart, MessageCircle, MessageSquare, Twitch, Users, Video, Youtube } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { NeonLink } from "@/components/ui/NeonButton";
import { COMMUNITY_POSTS, formatCompact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Community — Discord, Creators & Player Hub",
  description:
    "Join 842,000 players on Discord, apply to the Nexus creator program, browse forums, and read the community code of conduct.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "Community — Discord, Creators & Forums | Nexus Arena",
    description: "842,000 players on Discord, a creator program, and active forums.",
    url: "/community",
  },
};

const STATS = [
  { label: "Discord Members", value: 842_000, accent: "#5865F2" },
  { label: "Forum Posts", value: 3_400_000, accent: "#00e5ff" },
  { label: "Active Creators", value: 12_800, accent: "#9146FF" },
  { label: "Guides Published", value: 46_200, accent: "#b6ff3c" },
];

const CHANNELS = [
  {
    name: "Discord",
    Icon: MessageSquare,
    color: "#5865F2",
    members: "842K members",
    body: "Scrim finders, LFG by rank, patch discussion, and direct AMA channels with the dev teams.",
    href: "https://discord.com",
  },
  {
    name: "Twitch",
    Icon: Twitch,
    color: "#9146FF",
    members: "184K watching",
    body: "Official broadcasts, co-streams in nine languages, and a creator program that pays out weekly.",
    href: "https://twitch.tv",
  },
  {
    name: "YouTube",
    Icon: Youtube,
    color: "#FF0000",
    members: "2.4M subscribers",
    body: "Trailers, VOD breakdowns, frame-data deep dives, and full tournament replays in 4K.",
    href: "https://youtube.com",
  },
];

const FORUMS = [
  { name: "General Discussion", topics: 184_200, today: 1_420, accent: "#00e5ff" },
  { name: "Competitive & Strategy", topics: 96_800, today: 910, accent: "#ff2e88" },
  { name: "Bug Reports", topics: 42_100, today: 380, accent: "#ff8a00" },
  { name: "Looking for Group", topics: 231_400, today: 3_190, accent: "#b6ff3c" },
  { name: "Creative & Modding", topics: 58_700, today: 640, accent: "#7c3aed" },
  { name: "Off Topic", topics: 71_300, today: 1_080, accent: "#8fd8ff" },
];

const CONDUCT = [
  {
    title: "Compete hard, stay decent",
    body: "Trash talk is part of the game. Harassment, slurs, and targeted abuse are not, and they get you removed permanently.",
  },
  {
    title: "No cheating, ever",
    body: "Any third-party tool that reads or writes game memory is a permanent hardware ban across every title on the platform.",
  },
  {
    title: "Protect the newcomers",
    body: "Smurfing to farm low ranks is a competitive-integrity violation. Rank-restricted queues exist for a reason.",
  },
  {
    title: "Report, don't retaliate",
    body: "Every report is reviewed by a human within 24 hours. Griefing someone back just puts two names in the queue.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="The People"
        crumb="Community"
        accent="#7c3aed"
        title={
          <>
            A million players, <span className="text-gradient">one arena.</span>
          </>
        }
        subtitle="Find a squad, publish a guide, join a scrim, or just argue about frame data at three in the morning."
      >
        <dl className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{ ["--accent" as string]: s.accent }}
              className="glass clip-notch p-4 transition-colors duration-300 hover:border-[var(--accent)]/50"
            >
              <dd className="font-display text-xl font-black tabular-nums text-ink sm:text-2xl">
                <Counter value={s.value} live={i === 0} />
              </dd>
              <dt className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Channels */}
      <section
        aria-labelledby="channels-heading"
        className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
      >
        <SectionHeading
          eyebrow="Where We Hang Out"
          title={<span id="channels-heading">Official Channels</span>}
          subtitle="Three places to plug in. All free, all moderated, all open right now."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <li key={c.name} className="h-full">
              <Reveal delay={i * 0.09} className="h-full">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ["--accent" as string]: c.color }}
                  className="group clip-corner relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-14px_var(--accent)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(160deg, ${c.color}1f, rgba(12,15,26,0.95))`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-xl border transition-colors duration-500"
                    style={{ borderColor: `${c.color}40` }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
                    style={{ background: c.color }}
                  />

                  <span className="relative flex-1">
                    <c.Icon
                      size={30}
                      style={{ color: c.color }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="mt-4 block font-display text-lg font-bold text-ink">
                      {c.name}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink-dim">
                      {c.body}
                    </span>
                  </span>

                  <span className="relative mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-ink-dim">
                      <Users size={12} />
                      {c.members}
                    </span>
                    <span
                      className="font-display text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: c.color }}
                    >
                      Open →
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Forums */}
      <section
        id="forums"
        aria-labelledby="forums-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <SectionHeading
          eyebrow="Discussion"
          title={<span id="forums-heading">Forums</span>}
          subtitle="Six boards, 3.4 million posts, and moderation that actually responds."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORUMS.map((f, i) => (
            <li key={f.name}>
              <Reveal delay={(i % 3) * 0.07}>
                <div
                  style={{ ["--accent" as string]: f.accent }}
                  className="group clip-notch flex items-center gap-4 rounded-xl border border-white/8 bg-carbon p-5 transition-all duration-400 hover:border-[var(--accent)]/50 hover:shadow-[0_0_38px_-16px_var(--accent)]"
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-400 group-hover:scale-110"
                    style={{
                      background: `${f.accent}18`,
                      boxShadow: `inset 0 0 0 1px ${f.accent}44`,
                    }}
                  >
                    <MessageCircle size={17} style={{ color: f.accent }} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-ink transition-colors group-hover:text-[var(--accent)]">
                      {f.name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {formatCompact(f.topics)} topics · {formatCompact(f.today)} today
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Creator program */}
      <section
        id="creators"
        aria-labelledby="creators-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden rounded-2xl border border-white/10 bg-carbon p-6 sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(115deg,rgba(145,70,255,0.18),rgba(0,229,255,0.14)_50%,rgba(255,46,136,0.16))] bg-[length:300%_100%] animate-gradient-pan"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(145,70,255,0.35),transparent_65%)] blur-3xl animate-float-slow"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-neon-purple/20 px-3 py-1.5 ring-1 ring-neon-purple/45">
                  <Video size={12} className="text-neon-purple" />
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-neon-purple">
                    Creator Program
                  </span>
                </span>

                <h2
                  id="creators-heading"
                  className="mt-5 text-balance font-display text-3xl font-black leading-tight sm:text-4xl"
                >
                  Get paid for the content you&apos;re already making
                </h2>

                <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-ink-dim sm:text-base">
                  Revenue share on every sale from your creator code, early access to unreleased
                  builds, and a direct line to the studios. No follower minimum — we look at
                  engagement, not vanity counts.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "20% revenue share, paid weekly",
                    "Pre-release build access",
                    "Custom creator codes",
                    "Dedicated partner support",
                  ].map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-ink-dim">
                      <Award size={14} className="shrink-0 text-neon-purple" aria-hidden />
                      {perk}
                    </li>
                  ))}
                </ul>

                <NeonLink href="/contact" size="md" className="mt-8">
                  Apply now
                </NeonLink>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Program at a glance
                </p>
                <dl className="mt-5 space-y-4">
                  {[
                    ["Active creators", "12,800"],
                    ["Paid out in 2026", "$8.4M"],
                    ["Avg. approval time", "6 days"],
                    ["Countries", "94"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm text-ink-dim">{k}</dt>
                      <dd className="font-display text-base font-bold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Highlights */}
      <section
        aria-labelledby="highlights-heading"
        className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <SectionHeading
          eyebrow="From The Feed"
          title={<span id="highlights-heading">Community Highlights</span>}
          subtitle="What players are posting right now."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_POSTS.map((post, i) => (
            <li key={post.id} className="h-full">
              <Reveal delay={i * 0.07} className="h-full">
                <article
                  style={{ ["--accent" as string]: post.avatarAccent }}
                  className="group clip-notch flex h-full flex-col rounded-xl border border-white/8 bg-carbon p-5 transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_44px_-16px_var(--accent)]"
                >
                  <header className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-black transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${post.avatarAccent}3d, ${post.avatarAccent}0f)`,
                        boxShadow: `inset 0 0 0 1px ${post.avatarAccent}66`,
                        color: post.avatarAccent,
                      }}
                    >
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold text-ink">
                        {post.author}
                      </p>
                      <p className="truncate text-[11px] text-ink-faint">{post.posted}</p>
                    </div>
                  </header>

                  <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink-dim">
                    {post.content}
                  </p>

                  <footer className="mt-5 flex items-center gap-5 border-t border-white/6 pt-4 text-xs text-ink-faint">
                    <span className="flex items-center gap-1.5">
                      <Heart size={13} className="text-neon-pink" />
                      {formatCompact(post.likes)}
                      <span className="sr-only">likes</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={13} />
                      {formatCompact(post.replies)}
                      <span className="sr-only">replies</span>
                    </span>
                  </footer>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Code of conduct */}
      <section
        id="conduct"
        aria-labelledby="conduct-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28"
      >
        <SectionHeading
          eyebrow="Ground Rules"
          title={<span id="conduct-heading">Code of Conduct</span>}
          subtitle="Four rules. We enforce all of them."
          align="center"
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {CONDUCT.map((rule, i) => (
            <li key={rule.title} className="h-full">
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <div className="clip-notch flex h-full gap-4 rounded-xl border border-white/8 bg-carbon p-6">
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neon-blue/12 font-display text-sm font-black text-neon-blue ring-1 ring-neon-blue/35"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{rule.title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-dim">
                      {rule.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
