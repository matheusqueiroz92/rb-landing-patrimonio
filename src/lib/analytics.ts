export function ensureDataLayer(): Record<string, unknown>[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushEvent(payload: Record<string, unknown>): void {
  ensureDataLayer().push(payload);
}

export function trackThirdParty(eventName: string, payload: Record<string, unknown>): void {
  if (window.consentimentoMedicao === false) {
    return;
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
  if (eventName === "interesse_agendamento" && typeof window.fbq === "function") {
    window.fbq("track", "Schedule", { content_name: payload.origem_do_clique });
  }
}
