import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, inView } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInWhenVisible({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={inView}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
