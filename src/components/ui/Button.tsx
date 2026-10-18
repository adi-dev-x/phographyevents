import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMagnetic } from '../../lib/animations/useMagnetic';

type Variant = 'primary' | 'ghost' | 'link';

type Common = { variant?: Variant; children: ReactNode; arrow?: boolean; className?: string };

function Inner({ children, arrow, roll }: { children: ReactNode; arrow?: boolean; roll: boolean }) {
  return (
    <>
      {roll && typeof children === 'string' ? (
        <span className="btn__label btn__roll" data-text={children}>
          <span>{children}</span>
        </span>
      ) : (
        <span className="btn__label">{children}</span>
      )}
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );
}

export function ButtonLink({ variant = 'primary', children, arrow = true, className = '', ...rest }: Common & Omit<HTMLMotionProps<'a'>, 'children'>) {
  const magnetic = useMagnetic(variant === 'link' ? 0 : 0.28);
  return (
    <motion.a className={`btn btn--${variant} ${className}`} {...(variant === 'link' ? {} : magnetic)} {...rest}>
      <Inner arrow={arrow} roll={variant !== 'link'}>{children}</Inner>
    </motion.a>
  );
}

export function Button({ variant = 'primary', children, arrow = false, className = '', type = 'button', ...rest }: Common & Omit<HTMLMotionProps<'button'>, 'children'>) {
  const magnetic = useMagnetic(variant === 'link' ? 0 : 0.28);
  return (
    <motion.button type={type} className={`btn btn--${variant} ${className}`} {...(variant === 'link' ? {} : magnetic)} {...rest}>
      <Inner arrow={arrow} roll={variant !== 'link'}>{children}</Inner>
    </motion.button>
  );
}
