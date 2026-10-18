import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { ServiceOption } from '../../data/content';

export type Prefill = { eventType?: string; service?: ServiceOption; nonce: number };

type Ctx = {
  prefill: Prefill | null;
  /** Pre-select values in the enquiry form and scroll to it. */
  planEvent: (p: Omit<Prefill, 'nonce'>) => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  const planEvent = useCallback((p: Omit<Prefill, 'nonce'>) => {
    setPrefill({ ...p, nonce: Date.now() });
    document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return <BookingContext.Provider value={{ prefill, planEvent }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
