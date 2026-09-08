import { GitFork, Layers, Shield, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import { FRENTES } from "@/content/frentes";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerInView } from "@/components/ui/StaggerInView";
import { fadeUp } from "@/lib/motion";

const ICONS = [Shield, GitFork, TrendingDown, Layers] as const;

export function Frentes() {
  return (
    <section data-secao="frentes">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="POR QUE ESTRUTURAR" titulo="Uma estrutura, quatro objetivos">
            <p>
              A holding não resolve um problema isolado. Ela reorganiza, de uma só vez, a proteção, a sucessão, a
              tributação e a administração do patrimônio.
            </p>
          </SectionHeading>
        </FadeInWhenVisible>
        <StaggerInView className="frentes">
          {FRENTES.map((frente, index) => {
            const Icon = ICONS[index];
            return (
              <motion.article
                className="frente"
                key={frente.titulo}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <span className="icon-wrap" aria-hidden="true">
                  <Icon size={36} strokeWidth={1.5} />
                </span>
                <h3>{frente.titulo}</h3>
                <p>{frente.texto}</p>
              </motion.article>
            );
          })}
        </StaggerInView>
      </div>
    </section>
  );
}
