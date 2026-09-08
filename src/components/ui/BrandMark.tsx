import { Link } from "react-router-dom";

type Props = {
  to?: string;
  className?: string;
};

export function BrandMark({ to = "#topo", className }: Props) {
  const inner = (
    <>
      REBOUÇAS &amp; BULHÕES
      <em>ASSESSORIA EMPRESARIAL</em>
    </>
  );

  const classes = className ? `marca ${className}` : "marca";

  if (to.startsWith("/")) {
    return (
      <Link className={classes} to={to}>
        {inner}
      </Link>
    );
  }

  return (
    <a className={classes} href={to}>
      {inner}
    </a>
  );
}
