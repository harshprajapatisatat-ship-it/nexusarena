"use client";

import { memo, useId } from "react";

interface GameArtProps {
  art: { from: string; via: string; to: string; seed: number };
  title: string;
  className?: string;
  /** Larger art gets more detail passes. */
  variant?: "card" | "hero" | "wide";
}

/**
 * Procedural key art. Deterministic from `seed`, rendered as inline SVG so it
 * costs zero network requests and scales crisply at any size.
 *
 * Each seed produces a different terrain silhouette, star field, and set of
 * geometric accents, so no two covers read the same.
 */
function GameArt({ art, title, className = "", variant = "card" }: GameArtProps) {
  const { from, via, to, seed } = art;

  // The same game can render in two sections at once, and products reuse game
  // seeds — so the gradient/filter ids must be per-instance, not per-seed, or
  // we emit duplicate DOM ids and the wrong paint gets referenced.
  // Stripped to alphanumerics — React's raw useId contains delimiter characters
  // that don't belong in a url(#…) fragment reference.
  const uid = `art${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Deterministic pseudo-random so server and client render identically.
  const rnd = (n: number) => {
    const x = Math.sin(seed * 137.5 + n * 41.7) * 10_000;
    return x - Math.floor(x);
  };

  const detail = variant === "card" ? 1 : 2;
  const starCount = 26 * detail;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    cx: rnd(i) * 400,
    cy: rnd(i + 100) * 150,
    r: rnd(i + 200) * 1.15 + 0.25,
    o: rnd(i + 300) * 0.75 + 0.2,
  }));

  // Two parallax ridgelines built from the same seed.
  const ridge = (offset: number, height: number, points: number) => {
    const step = 400 / points;
    let d = `M 0 300`;
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      const y =
        260 -
        height * (0.45 + rnd(i + offset) * 0.55) -
        Math.sin((i / points) * Math.PI) * height * 0.35;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return `${d} L 400 300 Z`;
  };

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${title} key art`}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={from} stopOpacity="0.92" />
          <stop offset="48%" stopColor={via} stopOpacity="0.95" />
          <stop offset="100%" stopColor={to} />
        </linearGradient>

        <radialGradient id={`${uid}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={from} stopOpacity="0.95" />
          <stop offset="55%" stopColor={from} stopOpacity="0.22" />
          <stop offset="100%" stopColor={from} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${uid}-ridge-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={via} stopOpacity="0.75" />
          <stop offset="100%" stopColor={to} stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={`${uid}-ridge-near`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={to} stopOpacity="0.98" />
          <stop offset="100%" stopColor="#04050a" />
        </linearGradient>

        <linearGradient id={`${uid}-scan`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={from} stopOpacity="0" />
          <stop offset="50%" stopColor={from} stopOpacity="0.55" />
          <stop offset="100%" stopColor={from} stopOpacity="0" />
        </linearGradient>

        <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>

        <linearGradient id={`${uid}-scrim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04050a" stopOpacity="0" />
          <stop offset="100%" stopColor="#04050a" stopOpacity="0.88" />
        </linearGradient>

        {/* Fine grain keeps large flat gradients from banding. */}
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />

      {/* Stars */}
      <g>
        {stars.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" opacity={s.o} />
        ))}
      </g>

      {/* Celestial body — position varies by seed */}
      <circle
        cx={90 + rnd(7) * 220}
        cy={60 + rnd(8) * 45}
        r={46 + rnd(9) * 30}
        fill={`url(#${uid}-sun)`}
      />

      {/* Horizon glow */}
      <ellipse
        cx="200"
        cy="196"
        rx="230"
        ry="30"
        fill={from}
        opacity="0.32"
        filter={`url(#${uid}-blur)`}
      />

      {/* Ridgelines */}
      <path d={ridge(0, 74, 14)} fill={`url(#${uid}-ridge-far)`} />
      <path d={ridge(50, 44, 10)} fill={`url(#${uid}-ridge-near)`} />

      {/* Geometric accents — the "sci-fi structure" layer */}
      <g opacity="0.55" stroke={from} fill="none" strokeWidth="1">
        {seed % 3 === 0 && (
          <>
            <path d="M 300 300 L 300 150 L 340 130 L 340 300" strokeWidth="1.4" />
            <path d="M 305 170 H 335 M 305 195 H 335 M 305 220 H 335" opacity="0.6" />
          </>
        )}
        {seed % 3 === 1 && (
          <>
            <circle cx="325" cy="118" r="30" opacity="0.7" />
            <circle cx="325" cy="118" r="46" opacity="0.35" />
            <path d="M 325 72 V 164 M 279 118 H 371" opacity="0.4" />
          </>
        )}
        {seed % 3 === 2 && (
          <>
            <path d="M 60 300 L 60 178 L 96 160 L 132 178 L 132 300" strokeWidth="1.4" />
            <path d="M 96 160 V 300" opacity="0.45" />
            <path d="M 60 210 H 132 M 60 245 H 132" opacity="0.45" />
          </>
        )}
      </g>

      {/* Scan sweep */}
      <rect
        y={128 + rnd(13) * 60}
        width="400"
        height="1.5"
        fill={`url(#${uid}-scan)`}
        opacity="0.8"
      />

      {/* Grain + bottom scrim so overlaid text always meets contrast */}
      <rect width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.05" />
      <rect y="150" width="400" height="150" fill={`url(#${uid}-scrim)`} />
    </svg>
  );
}

export default memo(GameArt);
