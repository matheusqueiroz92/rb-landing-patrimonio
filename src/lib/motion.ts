import type { Transition, Variants } from "motion/react";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const inView = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -8% 0px",
} as const;
