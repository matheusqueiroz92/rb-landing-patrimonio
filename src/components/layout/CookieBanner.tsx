import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { COOKIE_NOTICE } from "@/config/site";
import { pushEvent } from "@/lib/analytics";
import { useConsent } from "@/hooks/useConsent";

export function CookieBanner() {
  const { visivel, aceitar } = useConsent();
  const reduce = useReducedMotion();

  const onAccept = () => {
    aceitar();
    pushEvent({ event: "consentimento_concedido" });
  };

  return (
    <AnimatePresence>
      {visivel ? (
        <motion.div
          className="cookies visivel"
          id="cookies"
          role="region"
          aria-label="Aviso de cookies"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 8 }}
        >
          <p>
            {COOKIE_NOTICE} <Link to="/politica-de-privacidade">Política de privacidade</Link>.
          </p>
          <button className="btn" id="aceitar-cookies" type="button" onClick={onAccept}>
            Concordo
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
