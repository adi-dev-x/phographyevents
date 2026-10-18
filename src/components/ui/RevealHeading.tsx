import { motion } from 'framer-motion';
import { ease } from '../../lib/animations/easing';

type Props = {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  id?: string;
  /** Animate on mount (gated by `play`) instead of when scrolled into view. */
  immediate?: boolean;
  play?: boolean;
  delay?: number;
  /** 'lines' = masked line rise; 'chars' = 3D letter-by-letter build. */
  split?: 'lines' | 'chars';
  /** Index of a line whose letters shade from warm white to amber. */
  gradientLine?: number;
  decorative?: boolean;
};

const from = [245, 243, 239];
const to = [244, 184, 96];
const shade = (t: number) => {
  const k = Math.min(1, Math.max(0, (t - 0.25) / 0.75));
  return `rgb(${from.map((c, i) => Math.round(c + (to[i] - c) * k)).join(',')})`;
};

const lineVariants = {
  hidden: { y: '110%', rotate: 3 },
  shown: (d: number) => ({ y: '0%', rotate: 0, transition: { duration: 1.1, ease: ease.out, delay: d } }),
};

const charVariants = {
  hidden: { y: '115%', rotateX: -90, opacity: 0 },
  shown: (d: number) => ({
    y: '0%',
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.95, ease: ease.out, delay: d, opacity: { duration: 0.4, delay: d } },
  }),
};

/** Masked heading reveal. Full text stays available to assistive tech via aria-label. */
export function RevealHeading({
  lines, as = 'h2', className = '', id, immediate = false, play = true, delay = 0,
  split = 'lines', gradientLine, decorative = false,
}: Props) {
  const Tag = as;
  const trigger = immediate
    ? { animate: play ? ('shown' as const) : ('hidden' as const) }
    : { whileInView: 'shown' as const, viewport: { once: true, margin: '0px 0px -12% 0px' } };

  let n = 0;

  return (
    <Tag
      className={`reveal-heading ${className}`}
      id={id}
      aria-label={decorative ? undefined : lines.join(' ')}
      aria-hidden={decorative || undefined}
    >
      <motion.span initial="hidden" {...trigger} aria-hidden="true" className="reveal-heading__inner">
        {lines.map((line, i) => {
          if (split === 'lines') {
            return (
              <span className="reveal-line" key={i}>
                <motion.span className="reveal-line__text" variants={lineVariants} custom={delay + i * 0.1}>
                  {line}
                </motion.span>
              </span>
            );
          }
          const words = line.split(' ');
          const len = line.replace(/ /g, '').length;
          let inLine = 0;
          return (
            <span className="reveal-line reveal-line--chars" key={i}>
              {words.map((word, w) => (
                <span key={w}>
                  <span className="reveal-word">
                    {[...word].map((ch, c) => {
                      const d = delay + i * 0.08 + n * 0.022;
                      const t = inLine / Math.max(1, len - 1);
                      n++;
                      inLine++;
                      return (
                        <motion.span
                          key={c}
                          className="reveal-char"
                          variants={charVariants}
                          custom={d}
                          style={gradientLine === i ? { color: shade(t) } : undefined}
                        >
                          {ch}
                        </motion.span>
                      );
                    })}
                  </span>
                  {w < words.length - 1 && ' '}
                </span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
