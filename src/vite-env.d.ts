/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_WHATSAPP_NUMERO: string;
  readonly VITE_WHATSAPP_MENSAGEM: string;
  readonly VITE_AGENDAMENTO_URL: string;
  readonly VITE_GTM_ID: string;
  readonly VITE_META_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    consentimentoMedicao?: boolean;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
