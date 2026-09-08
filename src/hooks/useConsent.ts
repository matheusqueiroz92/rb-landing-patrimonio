import { useEffect, useState } from "react";

const CHAVE = "consentimento_medicao";

export function useConsent() {
  const [aceito, setAceito] = useState(true);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    let jaAceito = false;
    try {
      jaAceito = localStorage.getItem(CHAVE) === "1";
    } catch {
      jaAceito = false;
    }
    window.consentimentoMedicao = jaAceito;
    setAceito(jaAceito);
    if (!jaAceito) {
      const t = window.setTimeout(() => setVisivel(true), 1200);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, []);

  const aceitar = () => {
    window.consentimentoMedicao = true;
    window.dispatchEvent(new Event("consentimento-medicao"));
    try {
      localStorage.setItem(CHAVE, "1");
    } catch {
      /* ignore */
    }
    setAceito(true);
    setVisivel(false);
  };

  return { aceito, visivel, aceitar };
}
