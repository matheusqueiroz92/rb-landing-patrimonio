import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { PILARES } from "@/content/pilares";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { PilarScene } from "@/components/illustrations/PilarScenes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pushEvent } from "@/lib/analytics";

export function Pilares() {
  const [ativo, setAtivo] = useState<(typeof PILARES)[number]["id"]>("p1");
  const reduce = useReducedMotion();
  const pilar = PILARES.find((p) => p.id === ativo) ?? PILARES[0];

  return (
    <section className="alterna" data-secao="pilares">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="O QUE A ESTRUTURA ENDEREÇA" titulo="Quatro frentes, tratadas em conjunto">
            <p>Escolha a que mais se aproxima da sua preocupação principal.</p>
          </SectionHeading>
        </FadeInWhenVisible>
        <LayoutGroup>
        <div className="abas" role="tablist" aria-label="Frentes de atuação">
          {PILARES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={ativo === item.id}
              onClick={() => {
                setAtivo(item.id);
                pushEvent({ event: "pilar_aberto", pilar: item.aba });
              }}
            >
              {ativo === item.id && !reduce ? <motion.span className="tab-pill" layoutId="pilar-tab" /> : null}
              {ativo === item.id && reduce ? <span className="tab-pill" /> : null}
              <span>{item.aba}</span>
            </button>
          ))}
        </div>
        </LayoutGroup>
        <AnimatePresence mode="wait">
          <motion.div
            key={pilar.id}
            className="painel"
            role="tabpanel"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h3>{pilar.titulo}</h3>
              <p>{pilar.texto}</p>
              <p className="fonte">{pilar.fonte}</p>
            </div>
            <div className="ilustra">
              <PilarScene id={pilar.id} />
            </div>
          </motion.div>
        </AnimatePresence>
        <FadeInWhenVisible>
          <div className="acao-linha">
            <CtaButton origem="pilares">Falar sobre esta frente</CtaButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
