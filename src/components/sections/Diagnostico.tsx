import { type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DIAGNOSTICO_FAIXAS, DIAGNOSTICO_ITENS } from "@/content/diagnostico";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTracking } from "@/hooks/useTracking";
import { pushEvent } from "@/lib/analytics";

function faixaDe(marcados: number) {
  return DIAGNOSTICO_FAIXAS.find((f) => marcados >= f.min && marcados <= f.max);
}

export function Diagnostico() {
  const { marcados, setMarcados } = useTracking();
  const reduce = useReducedMotion();
  const total = DIAGNOSTICO_ITENS.length;
  const faixa = faixaDe(marcados);

  const onChange = (event: FormEvent<HTMLUListElement>) => {
    const checked = event.currentTarget.querySelectorAll("input:checked").length;
    setMarcados(checked);
    if (checked === 0) {
      return;
    }
    const next = faixaDe(checked);
    if (next) {
      pushEvent({ event: "diagnostico_respondido", marcados: checked, faixa: next.titulo });
    }
  };

  return (
    <section className="escuro" id="diagnostico" data-secao="diagnostico">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="DIAGNÓSTICO PRELIMINAR" titulo="Seis perguntas antes da conversa">
            <p>
              Marque as afirmações verdadeiras no seu caso. O resultado indica o grau de complexidade da estruturação, não
              o mérito de qualquer medida.
            </p>
          </SectionHeading>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08}>
          <div className="diagnostico">
          <h3>Marque o que se aplica</h3>
          <p className="sub">Nenhum dado pessoal é solicitado nesta etapa.</p>
          <ul className="lista" id="quiz" onChange={onChange}>
            {DIAGNOSTICO_ITENS.map((item) => (
              <li key={item}>
                <label>
                  <input type="checkbox" /> {item}
                </label>
              </li>
            ))}
          </ul>
          <div className="medidor" aria-hidden="true">
            <i id="barra" style={{ width: `${(marcados / total) * 100}%` }} />
          </div>
          <p className="contador" id="contador">
            {marcados} de {total} marcadas
          </p>
          <AnimatePresence>
            {faixa ? (
              <motion.div
                className="resultado ativo"
                id="resultado"
                role="status"
                aria-live="polite"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.38, ease: "easeOut" }}
              >
                <strong id="res-titulo">{faixa.titulo}</strong>
                <p id="res-texto">{faixa.texto}</p>
                <CtaButton origem="diagnostico">Agendar a conversa de diagnóstico</CtaButton>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
