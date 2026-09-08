import type { ReactNode } from "react";

type Props = {
  chapeu: string;
  titulo: string;
  children?: ReactNode;
};

export function SectionHeading({ chapeu, titulo, children }: Props) {
  return (
    <>
      <span className="chapeu">{chapeu}</span>
      <h2 className="cabecalho-secao">{titulo}</h2>
      {children}
    </>
  );
}
