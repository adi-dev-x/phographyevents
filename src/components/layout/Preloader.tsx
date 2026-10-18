import { animate, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { site } from '../../config/site';
import { ease } from '../../lib/animations/easing';

/** Brand intro: wordmark build + 000→100 counter, then the curtain lifts. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    let timer = 0;
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, '0');
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        timer = window.setTimeout(() => {
          root.style.overflow = '';
          doneRef.current();
        }, 200);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(timer);
      root.style.overflow = '';
    };
  }, []);

  const letters = 'EVENTS CAIRNS'.split('');

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label={`Loading ${site.name}`}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1, ease: ease.inOut }}
    >
      <div className="preloader__glow" aria-hidden="true" />
      <div className="preloader__center" aria-hidden="true">
        <motion.span
          className="preloader__pro"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: ease.out }}
        >
          PRO
        </motion.span>
        <span className="preloader__word">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.25 + i * 0.035 }}
            >
              {l === ' ' ? ' ' : l}
            </motion.span>
          ))}
        </span>
      </div>
      <motion.p
        className="preloader__tag"
        aria-hidden="true"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {site.tagline}
      </motion.p>
      <div className="preloader__foot" aria-hidden="true">
        <span className="preloader__bar"><span ref={barRef} /></span>
        <span className="preloader__count" ref={countRef}>000</span>
      </div>
    </motion.div>
  );
}
