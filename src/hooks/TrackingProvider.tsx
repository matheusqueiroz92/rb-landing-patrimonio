import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { TrackingContext } from "@/hooks/useTracking";
import { pushEvent, trackThirdParty } from "@/lib/analytics";
import { destinoConfigurado, montarLink } from "@/lib/whatsapp";
import type { CtaOrigem } from "@/content/cta";

type Props = {
  children: ReactNode;
};

export function TrackingProvider({ children }: Props) {
  const [marcados, setMarcados] = useState(0);
  const inicio = useRef(Date.now());
  const percurso = useRef<string[]>([]);
  const ultimaSecao = useRef("abertura");
  const profundidade = useRef(0);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) {
            return;
          }
          const nome = e.target.getAttribute("data-secao");
          if (!nome) {
            return;
          }
          ultimaSecao.current = nome;
          if (!percurso.current.includes(nome)) {
            percurso.current.push(nome);
            pushEvent({ event: "secao_vista", secao: nome, ordem: percurso.current.length });
          }
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-secao]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const altura = document.body.scrollHeight - window.innerHeight;
      const pct = altura > 0 ? Math.round((window.scrollY / altura) * 100) : 0;
      if (pct > profundidade.current) {
        profundidade.current = pct;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCtaClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, origem: CtaOrigem) => {
      const dados = {
        event: "interesse_agendamento",
        origem_do_clique: origem,
        ultima_secao_lida: ultimaSecao.current,
        percurso: percurso.current.join(">"),
        profundidade_percentual: profundidade.current,
        segundos_na_pagina: Math.round((Date.now() - inicio.current) / 1000),
        marcados_no_diagnostico: marcados,
      };
      pushEvent(dados);
      trackThirdParty("interesse_agendamento", dados);
      try {
        sessionStorage.setItem("origem_interesse", JSON.stringify(dados));
      } catch {
        /* ignore */
      }
      if (destinoConfigurado()) {
        event.preventDefault();
        window.open(montarLink(origem, marcados, percurso.current), "_blank", "noopener");
      }
    },
    [marcados],
  );

  const value = useMemo(
    () => ({ marcados, setMarcados, onCtaClick }),
    [marcados, onCtaClick],
  );

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}
