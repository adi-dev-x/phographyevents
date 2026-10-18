import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '../../lib/animations/easing';
import { Img } from './Img';

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Direction the mask opens from. */
  from?: 'bottom' | 'left' | 'right';
  /** Subtle vertical drift while scrolling (percent of image height). */
  parallax?: number;
  eager?: boolean;
};

const hiddenClip = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** Clip-path mask reveal with a restrained settle-in scale and optional parallax. */
export function RevealImage({ src, alt, className = '', from = 'bottom', parallax = 0, eager = false }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const usesParallax = parallax > 0 && !reduce;

  return (
    <motion.div
      ref={ref}
      className={`reveal-image ${className}`}
      initial={reduce ? false : { clipPath: hiddenClip[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.3, ease: ease.inOut }}
    >
      <motion.div
        className="reveal-image__inner"
        style={usesParallax ? { y, scale: 1 + parallax / 50 } : undefined}
      >
        <motion.div
          className="reveal-image__scale"
          initial={reduce ? false : { scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: ease.out }}
        >
          <Img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
