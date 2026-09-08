import { Link } from "react-router-dom";
import { COOKIE_NOTICE, LEGAL_NOTICE } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { BrandMark } from "@/components/ui/BrandMark";

export function PoliticaPage() {
  return (
    <>
      <header className="topo">
        <div className="wrap">
          <BrandMark to="/" />
          <Link className="btn" to="/">
            Voltar à página
          </Link>
        </div>
      </header>
      <main className="politica">
        <div className="wrap">
          <span className="chapeu">LGPD</span>
          <h1>Política de privacidade</h1>
          <p>{COOKIE_NOTICE}</p>
          <p>{LEGAL_NOTICE}</p>
          <p>
            <Link to="/">Voltar à página sobre holding familiar e empresarial</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
