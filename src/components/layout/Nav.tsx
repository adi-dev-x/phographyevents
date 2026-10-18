import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { navLinks, site } from '../../config/site';
import { ease } from '../../lib/animations/easing';
import { useIntroReady } from '../../lib/animations/IntroContext';
import { ButtonLink } from '../ui/Button';

export function Nav() {
  const ready = useIntroReady();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll, trap focus and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <motion.div
        className="nav__bar container"
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: ease.out, delay: 0.5 }}
      >
        <a href="#top" className="wordmark" aria-label={`${site.name} — back to top`}>
          <span className="wordmark__pro">PRO</span>
          <span className="wordmark__rest">EVENTS CAIRNS</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav__link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="#plan" className="nav__cta" arrow={false}>
          Plan Your Event
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: ease.inOut }}
          >
            <nav aria-label="Mobile" className="container">
              <ul className="mobile-menu__list">
                {[...navLinks, { label: 'Plan Your Event', href: '#plan' }].map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: ease.out, delay: 0.15 + i * 0.05 }}
                  >
                    <a href={l.href} onClick={() => setOpen(false)}>
                      <span className="mobile-menu__index">0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mobile-menu__contacts">
                {site.contacts.map((c) => (
                  <a key={c.id} href={c.phoneHref} onClick={() => setOpen(false)}>
                    <span>{c.initials} — {c.role}</span>
                    {c.phoneDisplay}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
