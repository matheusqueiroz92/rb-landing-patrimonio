import { Link } from "react-router-dom";
import { LEGAL_NOTICE } from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="colunas">
          <div>
            <BrandMark to="/" className="mb-4 inline-block" />
            <p>Atendimento presencial mediante agendamento prévio e por videoconferência.</p>
          </div>
          <div>
            <p>
              José Ricardo de Souza Rebouças Bulhões
              <br />
              OAB/BA nº 30.336 e OAB/SP nº 532.073
            </p>
          </div>
        </div>
        <p className="rodape-links">
          <Link to="/politica-de-privacidade">Política de privacidade</Link>
        </p>
        <p className="aviso">{LEGAL_NOTICE}</p>
      </div>
    </footer>
  );
}
