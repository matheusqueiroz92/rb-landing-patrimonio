import { site } from "@/config/site";
import { CTA_ROTULOS, type CtaOrigem } from "@/content/cta";

export function destinoConfigurado(): boolean {
  return site.whatsappNumero.length > 8 || (site.agendamentoUrl !== "" && site.agendamentoUrl !== "#");
}

export function montarLink(origem: CtaOrigem, marcados: number, percurso: string[]): string {
  if (site.whatsappNumero.length > 8) {
    let texto = `${site.whatsappMensagem}\n\n(Cheguei pela ${CTA_ROTULOS[origem]}.`;
    if (marcados > 0) {
      texto += ` Marquei ${marcados} de 6 itens no diagnóstico.`;
    }
    texto += ")";
    return `https://wa.me/${site.whatsappNumero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
  }

  const sep = site.agendamentoUrl.includes("?") ? "&" : "?";
  return (
    site.agendamentoUrl +
    sep +
    "utm_source=lp_holding&utm_medium=landing_page&utm_campaign=holding_familiar" +
    `&utm_content=${encodeURIComponent(origem)}` +
    `&percurso=${encodeURIComponent(percurso.join(">"))}`
  );
}
