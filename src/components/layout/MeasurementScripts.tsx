import { useEffect } from "react";
import { site } from "@/config/site";

function loadGtm(id: string) {
  if (document.querySelector(`script[src*="gtm.js?id=${id}"]`)) {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
}

export function MeasurementScripts() {
  useEffect(() => {
    if (!site.gtmId) {
      return;
    }
    if (window.consentimentoMedicao) {
      loadGtm(site.gtmId);
    }
    const onStorage = () => {
      if (window.consentimentoMedicao && site.gtmId) {
        loadGtm(site.gtmId);
      }
    };
    window.addEventListener("consentimento-medicao", onStorage);
    return () => window.removeEventListener("consentimento-medicao", onStorage);
  }, []);

  return null;
}
