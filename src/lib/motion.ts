import type { Variants } from "framer-motion";

/** Shared easing curve — matches --ease-out-expo in globals.css. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Parent wrapper that staggers its children. */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: { delayChildren, staggerChildren },
    },
  };
}

/** Per-character reveal for hero headlines. */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -55 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

/** Default viewport config so scroll reveals fire once, slightly early. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
