import { ETAPAS } from "@/content/etapas";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Etapas() {
  return (
    <section data-secao="etapas">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="COMO CONDUZIMOS" titulo="Quatro etapas, na ordem" />
        </FadeInWhenVisible>
        <div className="etapas" id="etapas">
          {ETAPAS.map((etapa, index) => (
            <FadeInWhenVisible key={etapa.num} className="etapa" delay={index * 0.11}>
              <span className="num">{etapa.num}</span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.texto}</p>
            </FadeInWhenVisible>
          ))}
        </div>
        <FadeInWhenVisible>
          <div className="acao-linha">
            <CtaButton origem="etapas">Começar pelo diagnóstico</CtaButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
