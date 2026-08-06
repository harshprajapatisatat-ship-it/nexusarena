"use client";

import { motion } from "framer-motion";
import { Info, MessageSquare, Twitch } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const PROVIDERS = [
  {
    id: "steam",
    label: "Continue with Steam",
    color: "#c7d5e0",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M11.98 0C5.66 0 .48 4.87 0 11.06l6.44 2.66a3.4 3.4 0 0 1 1.92-.59l.14.01 2.86-4.14v-.06a4.55 4.55 0 1 1 4.55 4.55h-.11l-4.08 2.9v.15a3.41 3.41 0 0 1-6.75.66L.06 15.3C1.48 20.3 6.3 24 11.98 24c6.62 0 11.99-5.37 11.99-12S18.6 0 11.98 0M7.53 18.2l-1.47-.61a2.56 2.56 0 0 0 4.7-1.14 2.56 2.56 0 0 0-3.5-2.38l1.52.63a1.89 1.89 0 1 1-1.45 3.49m10.4-8.7a3.03 3.03 0 1 0-6.06 0 3.03 3.03 0 0 0 6.06 0m-5.3 0a2.28 2.28 0 1 1 4.55 0 2.28 2.28 0 0 1-4.55 0" />
      </svg>
    ),
  },
  {
    id: "discord",
    label: "Continue with Discord",
    color: "#5865F2",
    icon: <MessageSquare size={16} />,
  },
  {
    id: "twitch",
    label: "Continue with Twitch",
    color: "#9146FF",
    icon: <Twitch size={16} />,
  },
];

/**
 * OAuth sign-in placeholder. No auth provider is wired up — clicking a button
 * surfaces an inline notice rather than pretending to authenticate.
 */
export default function SignInPanel() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <Reveal>
      <div
        id="signin"
        className="clip-notch scroll-mt-24 rounded-xl border border-white/8 bg-carbon p-6"
      >
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
          Sign in
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          Link an existing account to sync your library, wishlist, and ranked history.
        </p>

        <div className="mt-5 space-y-2.5">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setNotice(p.label.replace("Continue with ", ""))}
              style={{ ["--accent" as string]: p.color }}
              className="group flex w-full items-center gap-3 rounded-lg border border-white/10 bg-void/40 px-4 py-3 text-sm text-ink-dim transition-all duration-300 hover:border-[var(--accent)] hover:text-ink"
            >
              <span style={{ color: p.color }} className="shrink-0">
                {p.icon}
              </span>
              {p.label}
              <span
                aria-hidden
                className="ml-auto text-xs text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          ))}
        </div>

        {notice && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="mt-4 flex items-start gap-2 rounded-lg border border-neon-blue/30 bg-neon-blue/8 px-3.5 py-3 text-xs leading-relaxed text-ink-dim"
          >
            <Info size={13} className="mt-0.5 shrink-0 text-neon-blue" aria-hidden />
            <span>
              <strong className="text-ink">{notice} sign-in is a placeholder.</strong> This is a
              design demo, so no OAuth provider is connected and no credentials are collected.
            </span>
          </motion.p>
        )}

        <p className="mt-5 border-t border-white/6 pt-4 text-[11px] leading-relaxed text-ink-faint">
          By signing in you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </Reveal>
  );
}
