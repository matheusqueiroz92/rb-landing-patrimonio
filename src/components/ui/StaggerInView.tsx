import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { inView, stagger } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
};

export function StaggerInView({ children, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </motion.div>
  );
}
