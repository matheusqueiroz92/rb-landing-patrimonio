import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [pct, setPct] = useState(0);
  const [barraVisivel, setBarraVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const altura = document.body.scrollHeight - window.innerHeight;
      const next = altura > 0 ? Math.round((window.scrollY / altura) * 100) : 0;
      setPct(next);
      setBarraVisivel(window.scrollY > 520 && next < 92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { pct, barraVisivel };
}
