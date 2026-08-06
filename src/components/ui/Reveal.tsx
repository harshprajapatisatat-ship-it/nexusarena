"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating in. */
  delay?: number;
  variants?: Variants;
  className?: string;
  id?: string;
}

/**
 * Fade/slide content in the first time it scrolls into view.
 * Respects prefers-reduced-motion via the global CSS override.
 *
 * The delay is merged into the variant's own transition — a `transition` prop
 * on the element would be ignored, since variant transitions take precedence.
 */
export default function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
  id,
}: RevealProps) {
  const delayed = useMemo<Variants>(() => {
    if (!delay) return variants;
    const show = variants.show;
    if (typeof show !== "object" || show === null) return variants;

    const { transition, ...rest } = show as Record<string, unknown>;
    return {
      ...variants,
      show: {
        ...rest,
        transition: { ...(transition as object), delay },
      },
    };
  }, [variants, delay]);

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={delayed}
    >
      {children}
    </motion.div>
  );
}
