import { Heart, MessageCircle, MessageSquare, Twitch, Users } from "lucide-react";
import { COMMUNITY_POSTS, formatCompact } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";

export default function CommunityHighlights() {
  return (
    <section
      aria-labelledby="community-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)] blur-3xl"
      />

      <SectionHeading
        eyebrow="The People"
        title={
          <span id="community-heading">
            Community <span className="text-gradient">Highlights</span>
          </span>
        }
        subtitle="Guides, milestones, and the occasional impossible clutch — posted by players."
        action={
          <NeonLink href="/community" variant="secondary" size="sm">
            Join the community
          </NeonLink>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        {/* Posts */}
        <ul className="grid gap-4 sm:grid-cols-2">
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

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-ink">
                        {post.author}
                      </p>
                      <p className="truncate text-[11px] text-ink-faint">
                        {post.handle} · {post.posted}
                      </p>
                    </div>

                    <span
                      className="shrink-0 rounded px-2 py-1 font-display text-[9px] font-bold uppercase tracking-widest"
                      style={{
                        color: post.avatarAccent,
                        background: `${post.avatarAccent}1a`,
                        boxShadow: `inset 0 0 0 1px ${post.avatarAccent}3d`,
                      }}
                    >
                      {post.tag}
                    </span>
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

        {/* Social rail */}
        <div className="flex flex-col gap-4">
          {/* Discord */}
          <Reveal delay={0.1} className="h-full">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group clip-corner relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#5865F2]/25 bg-[linear-gradient(160deg,rgba(88,101,242,0.16),rgba(12,15,26,0.9))] p-6 transition-all duration-500 hover:border-[#5865F2]/70 hover:shadow-[0_0_48px_-14px_#5865F2]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#5865F2]/25 blur-3xl transition-all duration-500 group-hover:bg-[#5865F2]/45"
              />

              <span className="relative">
                <MessageSquare
                  size={30}
                  className="text-[#8b95ff] transition-transform duration-500 group-hover:scale-110"
                />
                <span className="mt-4 block font-display text-lg font-bold text-ink">
                  Discord
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-dim">
                  842,000 members. Scrim finders, LFG channels, and direct lines to the dev teams.
                </span>
              </span>

              <span className="relative mt-6 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-neon-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-lime" />
                  62,410 online
                </span>
                <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#8b95ff]">
                  Join →
                </span>
              </span>
            </a>
          </Reveal>

          {/* Twitch */}
          <Reveal delay={0.18} className="h-full">
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="group clip-corner relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#9146FF]/25 bg-[linear-gradient(160deg,rgba(145,70,255,0.16),rgba(12,15,26,0.9))] p-6 transition-all duration-500 hover:border-[#9146FF]/70 hover:shadow-[0_0_48px_-14px_#9146FF]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#9146FF]/25 blur-3xl transition-all duration-500 group-hover:bg-[#9146FF]/45"
              />

              <span className="relative">
                <span className="flex items-center gap-2.5">
                  <Twitch
                    size={28}
                    className="text-[#c9a6ff] transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="flex items-center gap-1.5 rounded-full bg-neon-pink/20 px-2.5 py-1 ring-1 ring-neon-pink/40">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-pink" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-pink" />
                    </span>
                    <span className="font-display text-[9px] font-bold uppercase tracking-widest text-neon-pink">
                      Live
                    </span>
                  </span>
                </span>

                <span className="mt-4 block font-display text-lg font-bold text-ink">
                  Twitch
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-dim">
                  APAC Qualifier finals streaming now, with co-streams in nine languages.
                </span>
              </span>

              <span className="relative mt-6 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-ink-dim">
                  <Users size={12} />
                  184,203 watching
                </span>
                <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#c9a6ff]">
                  Watch →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
