import { FAQ } from "@/content/faq";
import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section className="alterna" data-secao="perguntas">
      <div className="wrap">
        <FadeInWhenVisible>
          <SectionHeading chapeu="ESCLARECIMENTOS" titulo="O que costuma ser perguntado na primeira reunião" />
        </FadeInWhenVisible>
        <div className="perguntas">
          {FAQ.map((item, index) => (
            <FadeInWhenVisible key={item.pergunta} delay={index * 0.06}>
              <details>
                <summary>{item.pergunta}</summary>
                <div className="resposta">
                  <p>{item.resposta}</p>
                </div>
              </details>
            </FadeInWhenVisible>
          ))}
        </div>
        <FadeInWhenVisible>
          <div className="acao-linha">
            <CtaButton origem="perguntas">Tirar as minhas dúvidas</CtaButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
