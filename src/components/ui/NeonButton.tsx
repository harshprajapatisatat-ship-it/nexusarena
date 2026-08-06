"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "text-void bg-[linear-gradient(100deg,#00e5ff,#7c3aed_55%,#ff2e88)] bg-[length:200%_auto] hover:bg-[position:100%_center] shadow-[0_0_30px_-8px_rgba(0,229,255,0.7)] hover:shadow-[0_0_44px_-6px_rgba(255,46,136,0.75)] font-semibold",
  secondary:
    "text-ink glass hover:border-neon-blue/60 hover:shadow-[0_0_34px_-10px_rgba(0,229,255,0.65)]",
  ghost:
    "text-ink-dim hover:text-ink border border-transparent hover:border-white/15 hover:bg-white/5",
  danger:
    "text-ink bg-neon-pink/15 border border-neon-pink/50 hover:bg-neon-pink/25 hover:shadow-[0_0_30px_-8px_rgba(255,46,136,0.8)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  /** Renders the sweeping highlight on hover. */
  sweep?: boolean;
}

function classes(variant: Variant, size: Size, className: string) {
  return [
    "group relative inline-flex items-center justify-center overflow-hidden rounded-lg",
    "font-display uppercase tracking-wider transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-blue",
    "active:scale-[0.97]",
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(" ");
}

function Inner({ children, icon, sweep }: Pick<BaseProps, "children" | "icon" | "sweep">) {
  return (
    <>
      {sweep !== false && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {icon}
        {children}
      </span>
    </>
  );
}

type LinkButtonProps = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

export function NeonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  sweep,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      <Inner icon={icon} sweep={sweep}>
        {children}
      </Inner>
    </Link>
  );
}

type ButtonProps = BaseProps &
  Omit<ComponentProps<typeof motion.button>, "className" | "children">;

export default function NeonButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  sweep,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes(variant, size, className)}
      {...rest}
    >
      <Inner icon={icon} sweep={sweep}>
        {children}
      </Inner>
    </motion.button>
  );
}
