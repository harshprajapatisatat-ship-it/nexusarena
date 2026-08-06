"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHASES = ["Initialising core", "Syncing shaders", "Linking servers", "Entering arena"];

/**
 * Cinematic first-paint loader. Shown once per browser session — returning to
 * the tab later in the same session goes straight to content.
 */
export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("nexus-arena:booted")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("nexus-arena:booted", "1");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - started) / 1900, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("nexus-arena:booted", "1");
        setVisible(false);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  const phase = PHASES[Math.min(Math.floor(progress / 25), PHASES.length - 1)];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-void"
          role="status"
          aria-live="polite"
          aria-label="Loading Nexus Arena"
        >
          {/* Ambient bloom */}
          <div
            aria-hidden
            className="absolute h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.18),transparent_65%)] blur-3xl animate-pulse-glow"
          />

          <div className="relative flex flex-col items-center gap-8 px-6">
            {/* Rotating rings */}
            <div className="relative grid h-28 w-28 place-items-center">
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue border-r-neon-blue/30"
              />
              <motion.span
                aria-hidden
                animate={{ rotate: -360 }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border-2 border-transparent border-b-neon-pink border-l-neon-pink/30"
              />
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-transparent border-t-neon-purple"
              />
              <span className="font-display text-xl font-black tabular-nums text-ink">
                {progress}
              </span>
            </div>

            <div className="text-center">
              <p className="font-display text-2xl font-black tracking-tight">
                NEXUS<span className="text-gradient">ARENA</span>
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">
                {phase}
              </p>
            </div>

            {/* Progress rail */}
            <div className="h-0.5 w-56 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full bg-[linear-gradient(90deg,#00e5ff,#7c3aed,#ff2e88)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
