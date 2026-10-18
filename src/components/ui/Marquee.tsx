import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';
import { useRef } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Kinetic type band. Drifts constantly, accelerates and leans with scroll
 * velocity, and flips direction with scroll direction. Decorative only.
 */
export function Marquee({ items, speed = 2.5, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = reverse ? 1 : -1;
    else if (f > 0) dir.current = reverse ? -1 : 1;
    let move = -dir.current * speed * (delta / 1000);
    move += move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="marquee__group">
      {items.map((it, i) => (
        <span key={i} className={`marquee__item ${i % 2 ? 'marquee__item--outline' : ''}`}>
          {it}
          <span className="marquee__dot" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee__track" style={reduce ? undefined : { x, skewX: skew }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}
