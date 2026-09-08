import {
  ChartPie,
  KeyRound,
  Lock,
  ScrollText,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type SceneProps = {
  reduce: boolean | null;
};

type Point = { x: number; y: number };

function curveTo(from: Point, to: Point) {
  const midY = from.y + (to.y - from.y) * 0.55;
  return `M${from.x} ${from.y} C${from.x} ${midY} ${to.x} ${midY} ${to.x} ${to.y}`;
}

function localRect(el: Element, root: DOMRect) {
  const box = el.getBoundingClientRect();
  return {
    x: box.left + box.width / 2 - root.left,
    top: box.top - root.top,
    bottom: box.bottom - root.top,
  };
}

const GOV_NODES = [
  { label: "acordo", Icon: ScrollText },
  { label: "protocolo", Icon: Lock },
  { label: "administradores", Icon: Users },
  { label: "lucros", Icon: ChartPie },
  { label: "quórum", Icon: Settings },
  { label: "ingresso", Icon: UserPlus },
] as const;

function SceneProtecao({ reduce }: SceneProps) {
  return (
    <div className="pilar-scene" aria-hidden="true">
      <motion.div
        className="pilar-panel pilar-panel--familia"
        initial={reduce ? false : { x: -18, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pilar-kicker">Família</span>
        <strong>Patrimônio</strong>
        <ul>
          <li>Imóveis</li>
          <li>Aplicações</li>
          <li>Participações</li>
        </ul>
      </motion.div>
      <motion.div
        className="pilar-slit"
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pilar-panel pilar-panel--operacao"
        initial={reduce ? false : { x: 18, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pilar-kicker">Operação</span>
        <strong>Risco</strong>
        <ul>
          <li>Contratos</li>
          <li>Empregados</li>
          <li>Tributos</li>
        </ul>
      </motion.div>
    </div>
  );
}

function SceneSucessao({ reduce }: SceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [tree, setTree] = useState<{ w: number; h: number; paths: string[] }>({
    w: 0,
    h: 0,
    paths: [],
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rootBox = root.getBoundingClientRect();
      const sealEl = sealRef.current;
      const avatars = avatarRefs.current;
      if (!sealEl || avatars.some((node) => !node) || rootBox.width < 8 || rootBox.height < 8) {
        return;
      }

      const seal = localRect(sealEl, rootBox);
      const [fundador, fundadora, ...herdeiros] = avatars.map((node) => localRect(node!, rootBox));
      const into = 4;
      const sealTop = { x: seal.x, y: seal.top + into };
      const sealBottom = { x: seal.x, y: seal.bottom - into };

      setTree({
        w: rootBox.width,
        h: rootBox.height,
        paths: [
          curveTo({ x: fundador.x, y: fundador.bottom - into }, sealTop),
          curveTo({ x: fundadora.x, y: fundadora.bottom - into }, sealTop),
          ...herdeiros.map((heir) => curveTo(sealBottom, { x: heir.x, y: heir.top + into })),
        ],
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    const frame = requestAnimationFrame(measure);
    const timers = [80, 280, 640, 1100].map((ms) => window.setTimeout(measure, ms));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const setAvatar = (index: number) => (el: HTMLSpanElement | null) => {
    avatarRefs.current[index] = el;
  };

  return (
    <div ref={rootRef} className="pilar-scene pilar-scene--sucessao" aria-hidden="true">
      {tree.paths.length > 0 ? (
        <svg className="sucessao-lines" viewBox={`0 0 ${tree.w} ${tree.h}`} fill="none">
          {tree.paths.map((d, i) => (
            <motion.path
              key={`line-${i}`}
              d={d}
              stroke="rgb(227 206 138 / 0.55)"
              strokeWidth="1.4"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {!reduce
            ? tree.paths.map((d, i) => (
                <path
                  key={`flow-${i}`}
                  className="sucessao-flow"
                  d={d}
                  stroke="var(--color-acao-clara)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              ))
            : null}
        </svg>
      ) : null}

      <div className="sucessao-layer">
        <div className="sucessao-founders">
          {["Fundador", "Fundadora"].map((label, i) => (
            <motion.div
              key={label}
              className="sucessao-person"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 320, damping: 24 }}
            >
              <span ref={setAvatar(i)} className="sucessao-avatar">
                <User size={18} strokeWidth={1.5} />
              </span>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={sealRef}
          className="sucessao-seal"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 280, damping: 20 }}
        >
          <span className="sucessao-seal-ring" />
          <span className="sucessao-seal-core">
            <KeyRound size={18} strokeWidth={1.5} />
            <strong>usufruto</strong>
            <small>reservado</small>
          </span>
          {!reduce ? (
            <>
              <span className="sucessao-spark sucessao-spark--a" />
              <span className="sucessao-spark sucessao-spark--b" />
              <span className="sucessao-spark sucessao-spark--c" />
            </>
          ) : null}
        </motion.div>

        <div className="sucessao-heirs">
          {["Herdeiro", "Herdeiro", "Herdeiro"].map((label, i) => (
            <motion.div
              key={`${label}-${i}`}
              className="sucessao-person"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={reduce ? undefined : { y: -4, scale: 1.04 }}
              transition={{ delay: 0.28 + i * 0.08, type: "spring", stiffness: 320, damping: 24 }}
            >
              <span ref={setAvatar(i + 2)} className="sucessao-avatar sucessao-avatar--heir">
                <User size={16} strokeWidth={1.5} />
              </span>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneTributacao({ reduce }: SceneProps) {
  return (
    <div className="pilar-scene pilar-scene--bars" aria-hidden="true">
      <div className="pilar-bars">
        <motion.div
          className="pilar-bar pilar-bar--alerta"
          initial={reduce ? false : { height: "12%" }}
          animate={{ height: "88%" }}
          whileHover={reduce ? undefined : { filter: "brightness(1.08)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>cenário atual</span>
          <small>pessoa física</small>
        </motion.div>
        <motion.div
          className="pilar-bar pilar-bar--tinta"
          initial={reduce ? false : { height: "12%" }}
          animate={{ height: "48%" }}
          whileHover={reduce ? undefined : { filter: "brightness(1.08)" }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>cenário projetado</span>
          <small>estrutura societária</small>
        </motion.div>
      </div>
      <p className="pilar-caption">ilustração do método, não de resultado</p>
    </div>
  );
}

function SceneGovernanca({ reduce }: SceneProps) {
  return (
    <div className="pilar-scene pilar-scene--governanca" aria-hidden="true">
      <div className="gov-stage">
        <svg className="gov-wire" viewBox="0 0 280 280" fill="none">
          <circle cx="140" cy="140" r="108" stroke="rgb(227 206 138 / 0.42)" strokeWidth="1" />
          <ellipse cx="140" cy="140" rx="108" ry="34" stroke="rgb(227 206 138 / 0.55)" strokeWidth="1" />
          <ellipse cx="140" cy="140" rx="108" ry="68" stroke="rgb(227 206 138 / 0.28)" strokeWidth="0.9" />
          <ellipse cx="140" cy="140" rx="108" ry="92" stroke="rgb(227 206 138 / 0.2)" strokeWidth="0.8" />
          <ellipse cx="140" cy="140" rx="38" ry="108" stroke="rgb(227 206 138 / 0.38)" strokeWidth="0.9" />
          <ellipse cx="140" cy="140" rx="72" ry="108" stroke="rgb(227 206 138 / 0.22)" strokeWidth="0.8" />
          <ellipse
            cx="140"
            cy="140"
            rx="52"
            ry="108"
            stroke="rgb(227 206 138 / 0.32)"
            strokeWidth="0.8"
            transform="rotate(28 140 140)"
          />
          <ellipse
            cx="140"
            cy="140"
            rx="52"
            ry="108"
            stroke="rgb(227 206 138 / 0.32)"
            strokeWidth="0.8"
            transform="rotate(-28 140 140)"
          />
          {[
            [140, 32],
            [140, 248],
            [32, 140],
            [248, 140],
            [78, 64],
            [202, 64],
            [78, 216],
            [202, 216],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="var(--color-acao-clara)" opacity="0.7" />
          ))}
        </svg>

        <motion.div
          className="gov-core"
          initial={reduce ? false : { scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <strong>Governança</strong>
          <span>acordo de sócios</span>
        </motion.div>

        <div className="gov-orbit">
          {GOV_NODES.map((node, i) => {
            const deg = i * 60;
            const Icon = node.Icon;
            return (
              <div
                key={node.label}
                className="gov-node-wrap"
                style={{ transform: `rotate(${deg}deg) translate(90px) rotate(${-deg}deg)` }}
              >
                <motion.div
                  className="gov-node"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.35 }}
                >
                  <div className="gov-node-face">
                    <Icon size={16} strokeWidth={1.6} />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="pilar-caption">acordo · protocolo · administradores · lucros · quórum · ingresso</p>
    </div>
  );
}

const scenes = {
  p1: SceneProtecao,
  p2: SceneSucessao,
  p3: SceneTributacao,
  p4: SceneGovernanca,
} as const;

type Props = {
  id: keyof typeof scenes;
};

export function PilarScene({ id }: Props) {
  const reduce = useReducedMotion();
  const Scene = scenes[id];
  return <Scene reduce={reduce} />;
}
