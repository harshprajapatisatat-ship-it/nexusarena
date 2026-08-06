"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";

const PERKS = [
  "Weekly patch digests",
  "Tournament invites first",
  "Store drops 24h early",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      setState("error");
      return;
    }

    setError("");
    setState("sending");

    // Demo only — there is no subscription endpoint behind this.
    setTimeout(() => setState("done"), 900);
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <Reveal>
        <div className="clip-corner relative overflow-hidden rounded-2xl border border-white/10 bg-carbon px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          {/* Animated gradient bed */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,229,255,0.16),rgba(124,58,237,0.2)_45%,rgba(255,46,136,0.16))] bg-[length:300%_100%] animate-gradient-pan"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.35),transparent_65%)] blur-3xl animate-float-slow"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,46,136,0.3),transparent_65%)] blur-3xl animate-float-slow [animation-delay:1.4s]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-neon-blue/15 ring-1 ring-neon-blue/40">
              <Mail size={24} className="text-neon-blue" />
            </span>

            <h2
              id="newsletter-heading"
              className="mt-6 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
            >
              Never miss a <span className="text-gradient">drop</span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-ink-dim">
              Patch notes, bracket openings, and store discounts — one email a week, no filler.
              Unsubscribe in a click.
            </p>

            {state === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                role="status"
                className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-xl border border-neon-lime/40 bg-neon-lime/10 px-5 py-4"
              >
                <CheckCircle2 size={20} className="shrink-0 text-neon-lime" />
                <p className="text-sm text-ink">
                  You&apos;re on the list. Check <strong className="text-neon-lime">{email}</strong>{" "}
                  to confirm.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mx-auto mt-9 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={state === "error"}
                      aria-describedby={state === "error" ? "newsletter-error" : undefined}
                      className={`w-full rounded-lg border bg-void/60 px-4 py-3.5 text-sm text-ink outline-none backdrop-blur-sm transition-colors placeholder:text-ink-faint focus:ring-2 ${
                        state === "error"
                          ? "border-neon-pink/70 focus:ring-neon-pink/40"
                          : "border-white/12 focus:border-neon-blue/60 focus:ring-neon-blue/30"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[linear-gradient(100deg,#00e5ff,#7c3aed_55%,#ff2e88)] bg-[length:200%_auto] px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-void transition-all duration-500 hover:bg-[position:100%_center] hover:shadow-[0_0_34px_-8px_rgba(255,46,136,0.85)] disabled:cursor-wait disabled:opacity-70"
                  >
                    {state === "sending" ? "Sending…" : "Subscribe"}
                    <Send
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>

                {state === "error" && (
                  <p id="newsletter-error" role="alert" className="mt-2.5 text-left text-xs text-neon-pink">
                    {error}
                  </p>
                )}
              </form>
            )}

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-1.5 text-xs text-ink-faint">
                  <CheckCircle2 size={12} className="text-neon-blue" aria-hidden />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
