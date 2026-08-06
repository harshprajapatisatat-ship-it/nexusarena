import type { Metadata } from "next";
import { Activity, Bug, CreditCard, LifeBuoy, Mail, MapPin, MessageSquare, Twitch } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/pages/ContactForm";
import SignInPanel from "@/components/pages/SignInPanel";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact — Support, Press & Partnerships",
  description:
    "Get help from Nexus Arena support, report a bug, check server status, or reach our press and partnerships teams. Average first response under two hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Support | Nexus Arena",
    description: "Support, bug reports, server status, press, and partnerships.",
    url: "/contact",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Nexus Arena",
  description: "Support, press, and partnership contact channels for Nexus Arena.",
  mainEntity: {
    "@type": "Organization",
    name: "Nexus Arena",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@nexus-arena.example.com",
        availableLanguage: ["English", "German", "Korean", "Portuguese", "Japanese"],
      },
      {
        "@type": "ContactPoint",
        contactType: "press",
        email: "press@nexus-arena.example.com",
      },
    ],
  },
};

const CHANNELS = [
  {
    Icon: LifeBuoy,
    title: "Player Support",
    body: "Account, billing, and gameplay issues. Staffed 24/7 in five languages.",
    meta: "Avg. response: 1h 40m",
    accent: "#00e5ff",
  },
  {
    Icon: Bug,
    title: "Bug Reports",
    body: "Reproducible issues go straight to the owning studio's tracker.",
    meta: "Triaged within 24h",
    accent: "#ff8a00",
  },
  {
    Icon: CreditCard,
    title: "Refunds",
    body: "Under two hours played and within 14 days? It's automatic.",
    meta: "Instant on eligible orders",
    accent: "#b6ff3c",
  },
  {
    Icon: Mail,
    title: "Press & Partnerships",
    body: "Media enquiries, sponsorship, and creator partnerships.",
    meta: "Response in 2 business days",
    accent: "#ff2e88",
  },
];

const STATUS = [
  { service: "Matchmaking", state: "Operational", uptime: "99.98%" },
  { service: "Store & Payments", state: "Operational", uptime: "99.99%" },
  { service: "Leaderboards", state: "Degraded", uptime: "98.42%" },
  { service: "Voice Chat", state: "Operational", uptime: "99.94%" },
  { service: "Tournament Servers", state: "Operational", uptime: "100%" },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Get In Touch"
        crumb="Contact"
        accent="#ff2e88"
        title={
          <>
            Talk to an actual <span className="text-gradient">human.</span>
          </>
        }
        subtitle="Support is staffed around the clock in five languages, and every bug report reaches the studio that owns the code."
      />

      {/* Channels */}
      <section
        aria-labelledby="channels-heading"
        className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20"
      >
        <h2 id="channels-heading" className="sr-only">
          Support channels
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <li key={c.title} className="h-full">
              <Reveal delay={(i % 4) * 0.07} className="h-full">
                <div
                  style={{ ["--accent" as string]: c.accent }}
                  className="group clip-notch flex h-full flex-col rounded-xl border border-white/8 bg-carbon p-5 transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_0_42px_-16px_var(--accent)]"
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${c.accent}16`,
                      boxShadow: `inset 0 0 0 1px ${c.accent}3d`,
                    }}
                  >
                    <c.Icon size={19} style={{ color: c.accent }} />
                  </span>

                  <h3 className="mt-4 font-display text-sm font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-dim">{c.body}</p>
                  <p
                    className="mt-4 border-t border-white/6 pt-3 text-[11px] font-medium"
                    style={{ color: c.accent }}
                  >
                    {c.meta}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Form + sidebar */}
      <section
        id="bugs"
        aria-labelledby="form-heading"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Send A Message"
              title={
                <span id="form-heading">
                  How can we <span className="text-gradient">help?</span>
                </span>
              }
              subtitle="Pick a category so it routes to the right team the first time."
            />
            <ContactForm />
          </div>

          <div className="flex flex-col gap-5">
            <SignInPanel />

            {/* Server status */}
            <Reveal delay={0.1}>
              <div
                id="status"
                className="clip-notch scroll-mt-24 rounded-xl border border-white/8 bg-carbon p-6"
              >
                <div className="flex items-center gap-2.5">
                  <Activity size={17} className="text-neon-lime" aria-hidden />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                    Server Status
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {STATUS.map((s) => {
                    const ok = s.state === "Operational";
                    return (
                      <li key={s.service} className="flex items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              ok ? "bg-neon-lime" : "bg-[#ff8a00]"
                            }`}
                          />
                          <span className="truncate text-sm text-ink-dim">{s.service}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="text-[11px] tabular-nums text-ink-faint">
                            {s.uptime}
                          </span>
                          <span
                            className={`text-[11px] font-medium ${
                              ok ? "text-neon-lime" : "text-[#ff8a00]"
                            }`}
                          >
                            {s.state}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-5 border-t border-white/6 pt-4 text-xs leading-relaxed text-ink-faint">
                  Leaderboard recalculation is running behind by roughly four minutes while we
                  migrate the ranking shard. No match results are affected.
                </p>
              </div>
            </Reveal>

            {/* Community channels */}
            <Reveal delay={0.16}>
              <div className="clip-notch rounded-xl border border-white/8 bg-carbon p-6">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                  Faster answers
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  The community usually beats our queue. Both channels have staff in them.
                </p>

                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "Discord — #support", href: "https://discord.com", Icon: MessageSquare, color: "#5865F2" },
                    { label: "Twitch — live Q&A", href: "https://twitch.tv", Icon: Twitch, color: "#9146FF" },
                  ].map(({ label, href, Icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ["--accent" as string]: color }}
                      className="flex items-center gap-3 rounded-lg border border-white/8 px-4 py-3 text-sm text-ink-dim transition-all duration-300 hover:border-[var(--accent)] hover:text-ink"
                    >
                      <Icon size={15} style={{ color }} />
                      {label}
                      <span className="ml-auto text-xs text-ink-faint" aria-hidden>
                        →
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-2.5 border-t border-white/6 pt-5 text-xs text-ink-faint">
                  <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden />
                  <p className="leading-relaxed">
                    Nexus Arena HQ — Studio 4, Kreuzberg, Berlin. Postal enquiries only; there is no
                    walk-in support desk.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
