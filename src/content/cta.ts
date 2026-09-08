export type CtaOrigem =
  | "menu_topo"
  | "abertura"
  | "frentes"
  | "autoridade"
  | "riscos"
  | "pilares"
  | "diagnostico"
  | "etapas"
  | "perguntas"
  | "fechamento"
  | "barra_fixa_mobile";

export const CTA_ROTULOS: Record<CtaOrigem, string> = {
  menu_topo: "menu do topo",
  abertura: "abertura da página",
  frentes: "seção das quatro frentes",
  autoridade: "seção sobre quem conduz o trabalho",
  riscos: "seção sobre o que está em jogo",
  pilares: "seção das frentes detalhadas",
  diagnostico: "diagnóstico preliminar",
  etapas: "seção sobre como o trabalho é conduzido",
  perguntas: "perguntas frequentes",
  fechamento: "fechamento da página",
  barra_fixa_mobile: "barra fixa do celular",
};
