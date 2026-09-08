import { BrandMark } from "@/components/ui/BrandMark";
import { CtaButton } from "@/components/ui/CtaButton";

export function Header() {
  return (
    <header className="topo">
      <div className="wrap">
        <BrandMark />
        <CtaButton origem="menu_topo">Agendar conversa</CtaButton>
      </div>
    </header>
  );
}
