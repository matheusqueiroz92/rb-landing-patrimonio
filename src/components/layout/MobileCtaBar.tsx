import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CtaButton } from "@/components/ui/CtaButton";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function MobileCtaBar() {
  const { barraVisivel } = useScrollProgress();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {barraVisivel ? (
        <motion.div
          className="barra-fixa"
          id="barra-fixa"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "110%" }}
          transition={{ duration: reduce ? 0 : 0.28, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <p className="rotulo">
            Diagnóstico patrimonial
            <br />
            presencial ou online
          </p>
          <CtaButton origem="barra_fixa_mobile">Agendar</CtaButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
