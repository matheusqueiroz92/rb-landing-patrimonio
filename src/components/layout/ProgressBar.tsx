import { motion } from "motion/react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ProgressBar() {
  const { pct } = useScrollProgress();

  return <motion.div className="progresso" style={{ width: `${pct}%` }} aria-hidden="true" />;
}
