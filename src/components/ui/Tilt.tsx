import { motion, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

/** Subtle 3D tilt toward the cursor with a moving light glare. Mouse only. */
export function Tilt({ children, className = '', max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 140, damping: 18 });
  const ry = useSpring(0, { stiffness: 140, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    e.currentTarget.style.setProperty('--gx', `${px * 100}%`);
    e.currentTarget.style.setProperty('--gy', `${py * 100}%`);
    e.currentTarget.style.setProperty('--glare', '1');
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    rx.set(0);
    ry.set(0);
    e.currentTarget.style.setProperty('--glare', '0');
  };

  return (
    <motion.div
      className={`tilt ${className}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </motion.div>
  );
}
