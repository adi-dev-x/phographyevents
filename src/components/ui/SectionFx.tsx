import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

type GlowColor = 'violet' | 'blue' | 'amber';
type Glow = { color: GlowColor; x: string; y: string; size?: number };

type Props = {
  glows?: Glow[];
  /** Huge outlined watermark word that drifts sideways while scrolling. */
  word?: string;
  particles?: boolean;
  /** Perspective "stage floor" grid along the bottom. */
  grid?: boolean;
  /** Vertical LED strips with travelling light pulses. */
  strips?: boolean;
  /** LED-wall dot matrix with a sweeping light. */
  dots?: boolean;
  className?: string;
};

/** Decorative ambient layer for otherwise flat section backgrounds. */
export function SectionFx({ glows = [], word, particles, grid, strips, dots, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wordX = useTransform(scrollYProgress, [0, 1], ['12%', '-22%']);
  const glowY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <div ref={ref} className={`fx ${className}`} aria-hidden="true">
      {dots && <div className="fx__dots" />}
      {grid && <div className="fx__grid"><span /></div>}
      {strips && (
        <div className="fx__strips">
          <span /><span /><span /><span />
        </div>
      )}
      <motion.div className="fx__glows" style={reduce ? undefined : { y: glowY }}>
        {glows.map((g, i) => (
          <span
            key={i}
            className={`fx__glow fx__glow--${g.color}`}
            style={{ left: g.x, top: g.y, width: g.size ?? 560, height: g.size ?? 560, animationDelay: `${i * -6}s` }}
          />
        ))}
      </motion.div>
      {word && (
        <motion.p className="fx__word" style={reduce ? undefined : { x: wordX }}>
          {word}
        </motion.p>
      )}
      {particles && <Particles />}
    </div>
  );
}

/** Slow haze motes, like dust drifting through stage light. Pauses off-screen. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colors = ['244,184,96', '139,92,246', '245,243,239', '79,124,255'];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; s: number; c: string };
    let ps: P[] = [];

    const make = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.22 + 0.04),
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.02 + 0.006,
      c: colors[(Math.random() * colors.length) | 0],
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.round((w * h) / 22000));
      ps = Array.from({ length: count }, (_, i) => ps[i] ?? make());
      if (!running) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const o = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(p.a));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${o * 0.12})`;
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${o})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.s;
        if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="fx__particles" />;
}
