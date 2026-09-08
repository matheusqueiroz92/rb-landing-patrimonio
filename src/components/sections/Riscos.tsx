import { House, Scale, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { RISCOS } from "@/content/riscos";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerInView } from "@/components/ui/StaggerInView";
import { fadeUp } from "@/lib/motion";

const ICONS = [Scale, House, TrendingUp] as const;

export function Riscos() {
  return (
    <section data-secao="riscos">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="O QUE ESTÁ EM JOGO" titulo="Três situações que se resolvem antes, ou não se resolvem">
            <p>Nenhuma delas aparece no dia a dia da empresa. Todas aparecem no pior momento possível.</p>
          </SectionHeading>
        </FadeInWhenVisible>
        <StaggerInView className="riscos">
          {RISCOS.map((risco, index) => {
            const Icon = ICONS[index];
            return (
              <motion.article
                className="risco"
                key={risco.titulo}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <span className="icon-wrap" aria-hidden="true">
                  <Icon size={44} strokeWidth={1.5} />
                </span>
                <h3>{risco.titulo}</h3>
                <p>{risco.texto}</p>
              </motion.article>
            );
          })}
        </StaggerInView>
        <FadeInWhenVisible delay={0.12}>
          <div className="acao-linha">
            <CtaButton origem="riscos">Quero avaliar a minha situação</CtaButton>
            <p className="sub">Análise individualizada, sem compromisso de contratação.</p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
