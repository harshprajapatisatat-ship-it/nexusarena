"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Headphones, MessageCircle, Send, Twitch, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const QUICK_REPLIES = [
  "How do I join a tournament?",
  "Where is my wishlist?",
  "Refund policy",
  "Report a player",
];

/**
 * Bottom-right cluster: back-to-top and the support chat launcher.
 * Grouped into one component so they share stacking and spacing.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "me"; text: string }[]>([
    { from: "bot", text: "Hey — Nexus Support here. What can I help you with?" },
  ]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setChatOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { from: "me", text: trimmed }]);
    setDraft("");

    // Demo-only canned response — no backend is wired up.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Thanks! This is a demo widget, so nothing is sent anywhere. A live agent would pick this up in under two minutes.",
        },
      ]);
    }, 900);
  }

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-60 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-label="Support chat"
            className="glass-strong pointer-events-auto flex h-[min(70vh,460px)] w-[min(88vw,360px)] flex-col overflow-hidden rounded-2xl shadow-[0_0_60px_-16px_rgba(124,58,237,0.7)]"
          >
            <header className="flex items-center gap-3 border-b border-white/8 bg-[linear-gradient(100deg,rgba(0,229,255,0.12),rgba(255,46,136,0.12))] px-4 py-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-neon-blue/15">
                <Headphones size={16} className="text-neon-blue" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-abyss bg-neon-lime" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-bold">Nexus Support</p>
                <p className="text-[11px] text-neon-lime">Online · avg. reply 2 min</p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="grid h-7 w-7 place-items-center rounded-md text-ink-faint hover:bg-white/8 hover:text-ink"
              >
                <X size={15} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === "me"
                        ? "rounded-br-sm bg-neon-blue/20 text-ink"
                        : "rounded-bl-sm bg-white/6 text-ink-dim"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-ink-dim transition-colors hover:border-neon-blue/60 hover:text-neon-blue"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 border-t border-white/8 p-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:ring-1 focus:ring-neon-blue/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[linear-gradient(120deg,#00e5ff,#7c3aed)] text-void transition-transform hover:scale-105"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twitch quick-link */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.a
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            href="https://twitch.tv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Nexus Arena on Twitch (opens in a new tab)"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-[#9146FF]/50 bg-[#9146FF]/15 text-[#c9a6ff] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#9146FF]/30 hover:shadow-[0_0_28px_-6px_#9146FF]"
          >
            <Twitch size={17} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="glass-strong pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-ink-dim transition-all duration-300 hover:scale-110 hover:border-neon-blue/60 hover:text-neon-blue"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat launcher */}
      <button
        type="button"
        onClick={() => setChatOpen((v) => !v)}
        aria-label={chatOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={chatOpen}
        className="group pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#00e5ff,#7c3aed_55%,#ff2e88)] text-void shadow-[0_0_34px_-6px_rgba(0,229,255,0.8)] transition-transform duration-300 hover:scale-110"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-neon-blue/40 animate-ping [animation-duration:2.5s]"
        />
        <span className="relative">
          {chatOpen ? <X size={21} strokeWidth={2.5} /> : <MessageCircle size={21} strokeWidth={2.5} />}
        </span>
      </button>
    </div>
  );
}
