import { useEffect } from "react";

export function useComBarraClass() {
  useEffect(() => {
    document.body.classList.add("com-barra");
    return () => document.body.classList.remove("com-barra");
  }, []);
}
