import type { ReactNode } from 'react';

export function SectionLabel({ children, accent = 'amber' }: { children: ReactNode; accent?: 'amber' | 'violet' | 'blue' }) {
  return (
    <p className={`label label--${accent}`}>
      <span className="label__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
