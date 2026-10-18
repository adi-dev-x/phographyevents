import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '../../lib/animations/easing';

/** Gentle rise-in for supporting copy and controls. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}
