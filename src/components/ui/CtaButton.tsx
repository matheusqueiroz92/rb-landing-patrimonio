import type { MouseEvent, ReactNode } from "react";
import type { CtaOrigem } from "@/content/cta";
import { useTracking } from "@/hooks/useTracking";

type Props = {
  origem: CtaOrigem;
  href?: string;
  className?: string;
  children: ReactNode;
};

export function CtaButton({ origem, href = "#fechamento", className = "btn", children }: Props) {
  const { onCtaClick } = useTracking();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onCtaClick(event, origem);
  };

  return (
    <a className={className} href={href} data-origem={origem} onClick={handleClick}>
      {children}
    </a>
  );
}
