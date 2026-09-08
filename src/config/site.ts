export const site = {
  url: import.meta.env.VITE_SITE_URL || "https://sucessoes.reboucasbulhoes.com",
  whatsappNumero: import.meta.env.VITE_WHATSAPP_NUMERO || "5577998654477",
  whatsappMensagem:
    import.meta.env.VITE_WHATSAPP_MENSAGEM ||
    "Olá. Vim pela página sobre holding familiar e empresarial e gostaria de agendar uma conversa de diagnóstico.",
  agendamentoUrl: import.meta.env.VITE_AGENDAMENTO_URL || "",
  gtmId: import.meta.env.VITE_GTM_ID || "",
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || "",
} as const;

export const LEGAL_NOTICE =
  "Conteúdo de caráter meramente informativo, divulgado nos termos do Provimento nº 205/2021 do Conselho Federal da Ordem dos Advogados do Brasil e dos artigos 39 a 47 do Código de Ética e Disciplina da OAB. Não constitui oferta de serviços, consulta jurídica, promessa de resultado nem garantia de economia tributária. As ilustrações desta página são esquemáticas e não representam resultado assegurado. A adequação de qualquer estrutura societária depende de análise individualizada do caso concreto.";

export const COOKIE_NOTICE =
  "Utilizamos cookies apenas para medir o desempenho desta página. O diagnóstico é processado no seu próprio navegador e nenhum dado pessoal é enviado.";
