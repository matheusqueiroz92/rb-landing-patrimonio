import { CtaButton } from "@/components/ui/CtaButton";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

export function Autoridade() {
  return (
    <section className="autoridade escuro" data-secao="autoridade">
      <div className="wrap">
        <FadeInWhenVisible>
          <div className="retrato">
            <img
              src="/img/retrato-jose-ricardo.webp"
              alt="José Ricardo de Souza Rebouças Bulhões"
              width={360}
              height={450}
            />
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.1}>
          <span className="chapeu">QUEM CONDUZ</span>
          <h2>O diagnóstico é feito por quem assina a estrutura</h2>
          <p>
            A estruturação de holding não é um formulário. Cada arquitetura depende do regime de bens dos sócios, da
            natureza dos ativos, do passivo existente e da relação entre os herdeiros. Por isso conduzo pessoalmente a
            reunião de diagnóstico e o desenho da estrutura, do levantamento inicial até os atos de registro.
          </p>
          <div className="assinatura">
            <span className="nome">José Ricardo de Souza Rebouças Bulhões</span>
            <span className="registro">OAB/BA nº 30.336 e OAB/SP nº 532.073</span>
          </div>
          <div className="acao-linha">
            <CtaButton origem="autoridade">Agendar uma conversa</CtaButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
