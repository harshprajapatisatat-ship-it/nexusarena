"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  /** ISO 8601 target date. */
  target: string;
  compact?: boolean;
  className?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function remainingFrom(target: string): Remaining {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Live tournament countdown.
 *
 * The first paint renders placeholder dashes rather than a computed time —
 * server and client clocks differ, and rendering the real value on the server
 * would guarantee a hydration mismatch.
 */
export default function Countdown({ target, compact = false, className = "" }: CountdownProps) {
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(remainingFrom(target));
    const id = setInterval(() => setTime(remainingFrom(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time ? pad(time.days) : "--" },
    { label: "Hrs", value: time ? pad(time.hours) : "--" },
    { label: "Min", value: time ? pad(time.minutes) : "--" },
    { label: "Sec", value: time ? pad(time.seconds) : "--" },
  ];

  const live = time?.done;

  if (compact) {
    return (
      <span
        className={`font-display tabular-nums ${className}`}
        aria-label={live ? "Event is live" : "Time remaining"}
      >
        {live
          ? "LIVE NOW"
          : `${units[0].value}d : ${units[1].value}h : ${units[2].value}m : ${units[3].value}s`}
      </span>
    );
  }

  if (live) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-pink opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-pink" />
        </span>
        <span className="font-display text-sm font-bold tracking-widest text-neon-pink">
          LIVE NOW
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-4 gap-2 ${className}`}
      role="timer"
      aria-label="Time until event starts"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="glass clip-notch flex flex-col items-center justify-center px-1 py-2"
        >
          <span className="font-display text-lg font-bold tabular-nums text-ink sm:text-xl">
            {u.value}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-ink-faint">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
