"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Adds a small random walk after the count-up, so the figure reads as live. */
  live?: boolean;
  className?: string;
}

/**
 * Counts up from zero once scrolled into view, then optionally drifts to
 * simulate a live feed. Pauses when the tab is hidden so we aren't burning
 * frames in the background.
 */
export default function Counter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  live = false,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      setSettled(true);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setSettled(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  useEffect(() => {
    if (!live || !settled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (document.hidden) return;
      const drift = Math.round((Math.random() - 0.45) * Math.max(value * 0.0009, 1));
      setDisplay((d) => Math.max(0, d + drift));
    }, 2200);

    return () => clearInterval(id);
  }, [live, settled, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
