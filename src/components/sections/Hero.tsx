import { useState } from "react";
import { CalendarDays, Shield } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { pushEvent } from "@/lib/analytics";

const CENAS = {
  hoje: {
    src: "/img/cena-hoje.webp",
    label: "Cenário atual: bens dispersos em nome das pessoas físicas convergindo para o inventário judicial.",
  },
  holding: {
    src: "/img/cena-holding.webp",
    label: "Cenário com holding: bens integralizados ao capital social e quotas doadas com usufruto reservado.",
  },
} as const;

export function Hero() {
  const [cena, setCena] = useState<"hoje" | "holding">("hoje");
  const reduce = useReducedMotion();

  const select = (next: "hoje" | "holding") => {
    setCena(next);
    pushEvent({ event: "comparador_alternado", cena: next });
  };

  return (
    <section className="abertura escuro" id="topo" data-secao="abertura">
      <div className="wrap">
        <FadeInWhenVisible>
          <div className="filete" aria-hidden="true" />
          <h1>Hoje, quem decide o destino do seu patrimônio é a lei.</h1>
          <p className="apoio">
            Enquanto os bens permanecem em nome das pessoas físicas, a partilha segue o regime legal e o calendário do
            processo. A holding transfere essa definição para o contrato social, redigido em vida.
          </p>
          <div className="acao-linha">
            <CtaButton origem="abertura">Agendar uma conversa</CtaButton>
          </div>
          <div className="confianca">
            <span>
              <Shield size={15} strokeWidth={1.75} aria-hidden="true" />
              OAB/BA 30.336 e OAB/SP 532.073
            </span>
            <span>
              <CalendarDays size={15} strokeWidth={1.75} aria-hidden="true" />
              Presencial ou por videoconferência
            </span>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.12}>
          <LayoutGroup>
          <div className="seletor" role="tablist" aria-label="Comparação entre cenários">
            {(["hoje", "holding"] as const).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={id === "hoje" ? "aba-hoje" : "aba-holding"}
                aria-selected={cena === id}
                aria-controls={id === "hoje" ? "cena-hoje" : "cena-holding"}
                onClick={() => select(id)}
              >
                {cena === id && !reduce ? <motion.span className="tab-pill" layoutId="hero-tab" /> : null}
                {cena === id && reduce ? <span className="tab-pill" /> : null}
                <span>{id === "hoje" ? "Situação atual" : "Com holding"}</span>
              </button>
            ))}
          </div>
          </LayoutGroup>
          <div className="palco">
            <AnimatePresence mode="wait">
              <motion.div
                key={cena}
                id={cena === "hoje" ? "cena-hoje" : "cena-holding"}
                role="tabpanel"
                aria-labelledby={cena === "hoje" ? "aba-hoje" : "aba-holding"}
                initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={CENAS[cena].src} alt={CENAS[cena].label} width={920} height={720} />
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
