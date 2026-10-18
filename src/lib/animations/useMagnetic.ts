import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';

/** Element drifts toward the cursor and springs back on leave (mouse only). */
export function useMagnetic(strength = 0.28) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce) return {};

  return {
    style: { x: sx, y: sy },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}
