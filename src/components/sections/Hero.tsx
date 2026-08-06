"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Play, Sparkles, Trophy, Users, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import ParticleField from "@/components/layout/ParticleField";
import { NeonLink } from "@/components/ui/NeonButton";
import { charReveal, stagger } from "@/lib/motion";

const HEADLINE_TOP = "ENTER THE";
const HEADLINE_BOTTOM = "NEXUS";

const QUICK_STATS = [
  { Icon: Users, value: "1.2M+", label: "Players Online" },
  { Icon: Trophy, value: "$42M", label: "Prizes Awarded" },
  { Icon: Zap, value: "1,200+", label: "Titles" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax — normalised to [-0.5, 0.5] around the viewport centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smoothX = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-38, 38]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-26, 26]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  // Scroll-linked fade so the hero dissolves into the next section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <section
      ref={sectionRef}
      aria-label="Welcome to Nexus Arena"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden"
    >
      {/* ---- Background stack ---- */}
      <div aria-hidden className="absolute inset-0">
        {/* Base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(124,58,237,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_15%_100%,rgba(0,229,255,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_85%_85%,rgba(255,46,136,0.2),transparent_65%)]" />

        {/* Parallax orbs */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.4),transparent_65%)] blur-3xl animate-float-slow"
        />
        <motion.div
          style={{ x: layer2X, y: layer2Y }}
          className="absolute right-[10%] top-[26%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,46,136,0.32),transparent_65%)] blur-3xl animate-float-slow [animation-delay:1.6s]"
        />
        <motion.div
          style={{ x: layer1X, y: layer2Y }}
          className="absolute bottom-[12%] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.34),transparent_65%)] blur-3xl animate-float-slow [animation-delay:0.8s]"
        />

        {/* Particles */}
        <ParticleField />

        {/* Perspective floor grid */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42vh] opacity-45 [perspective:340px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.28) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            transform: "rotateX(66deg)",
            transformOrigin: "bottom",
            maskImage: "linear-gradient(to top, #000 5%, transparent 78%)",
          }}
        />

        {/* Scanline sweep */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,229,255,0.055),transparent)] animate-scan" />
        </div>

        {/* Bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,#04050a,transparent)]" />
      </div>

      {/* ---- Content ---- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 pt-28 text-center sm:px-8"
      >
        {/* Season badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-neon-blue/35 bg-neon-blue/8 px-4 py-2 backdrop-blur-md"
        >
          <Sparkles size={13} className="text-neon-blue" />
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-neon-blue">
            Season 7 · Now Live
          </span>
          <span className="h-1 w-1 rounded-full bg-neon-pink animate-pulse" />
          <span className="text-[11px] text-ink-dim">$2.5M prize pool</span>
        </motion.div>

        {/* Headline — per-character reveal */}
        <motion.h1
          style={{ x: textX, y: textY }}
          variants={stagger(0.3, 0.045)}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(2.75rem,11vw,8.5rem)] font-black leading-[0.86] tracking-tighter [perspective:800px]"
        >
          <span className="sr-only">Enter the Nexus</span>

          <span aria-hidden className="block">
            {HEADLINE_TOP.split("").map((c, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                className="inline-block text-ink"
                style={{ transformStyle: "preserve-3d" }}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>

          <span aria-hidden className="relative block">
            {HEADLINE_BOTTOM.split("").map((c, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                className="text-gradient inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {c}
              </motion.span>
            ))}
            {/* Chromatic echo */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 select-none text-neon-pink opacity-25 blur-[2px] mix-blend-screen translate-x-[3px]"
            >
              {HEADLINE_BOTTOM}
            </span>
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim sm:text-lg"
        >
          Twelve hundred titles. Million-dollar brackets. A ranked ladder that actually means
          something. This is where competitive players come to find their next match — and their
          next team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <NeonLink href="/games" size="lg" icon={<Play size={17} />} className="w-full sm:w-auto">
            Start Playing
          </NeonLink>
          <NeonLink
            href="/tournaments"
            size="lg"
            variant="secondary"
            icon={<Trophy size={17} />}
            className="w-full sm:w-auto"
          >
            View Tournaments
          </NeonLink>
        </motion.div>

        {/* Steam sign-in placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-6"
        >
          <button
            type="button"
            className="group inline-flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-xs text-ink-dim backdrop-blur-md transition-all duration-300 hover:border-neon-blue/50 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
              <path d="M11.98 0C5.66 0 .48 4.87 0 11.06l6.44 2.66a3.4 3.4 0 0 1 1.92-.59l.14.01 2.86-4.14v-.06a4.55 4.55 0 1 1 4.55 4.55h-.11l-4.08 2.9v.15a3.41 3.41 0 0 1-6.75.66L.06 15.3C1.48 20.3 6.3 24 11.98 24c6.62 0 11.99-5.37 11.99-12S18.6 0 11.98 0M7.53 18.2l-1.47-.61a2.56 2.56 0 0 0 4.7-1.14 2.56 2.56 0 0 0-3.5-2.38l1.52.63a1.89 1.89 0 1 1-1.45 3.49m10.4-8.7a3.03 3.03 0 1 0-6.06 0 3.03 3.03 0 0 0 6.06 0m-5.3 0a2.28 2.28 0 1 1 4.55 0 2.28 2.28 0 0 1-4.55 0" />
            </svg>
            Continue with Steam
            <span className="rounded bg-white/8 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink-faint">
              Demo
            </span>
          </button>
        </motion.div>

        {/* Quick stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3 sm:gap-6"
        >
          {QUICK_STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="glass clip-notch flex flex-col items-center gap-1 px-2 py-4 transition-colors duration-300 hover:border-neon-blue/40"
            >
              <Icon size={15} className="text-neon-blue" />
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-lg font-bold text-ink sm:text-2xl">{value}</dd>
              <p aria-hidden className="text-[10px] uppercase tracking-wider text-ink-faint sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        aria-label="Scroll to featured games"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ink-faint transition-colors hover:text-neon-blue"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown size={17} />
        </motion.span>
      </motion.a>
    </section>
  );
}
