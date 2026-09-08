import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

export function Fechamento() {
  return (
    <section className="fechamento" id="fechamento" data-secao="fechamento">
      <div className="wrap">
        <FadeInWhenVisible>
          <h2>Agende a conversa de diagnóstico</h2>
          <p>
            Examinamos a composição do patrimônio, as sociedades existentes e o cenário sucessório, e indicamos com
            clareza se a constituição de holding é adequada ao seu caso.
          </p>
          <div className="acao-linha">
            <CtaButton origem="fechamento" href="#">
              Agendar uma conversa
            </CtaButton>
          </div>
          <div className="confianca">
            <span>Presencial ou por videoconferência</span>
            <span>Análise individualizada</span>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
