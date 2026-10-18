import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { site } from '../../config/site';
import { eventCategories } from '../../data/content';
import { ease } from '../../lib/animations/easing';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../ui/Button';
import { CountUp } from '../ui/CountUp';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

const categoryToEventType: Record<string, string> = {
  birthdays: 'Birthday',
  communion: 'Holy Communion',
  weddings: 'Wedding',
  cultural: 'Cultural event',
  corporate: 'Corporate program',
  mega: 'Mega event',
};

export function Packages() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const { planEvent } = useBooking();
  const cat = eventCategories[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const last = eventCategories.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="packages section" id="packages" aria-labelledby="packages-title">
      <SectionFx
        grid
        glows={[{ color: 'amber', x: '58%', y: '-4%', size: 640 }, { color: 'violet', x: '-18%', y: '55%', size: 620 }]}
      />
      <div className="container">
        <div className="packages__head">
          <div>
            <Reveal><SectionLabel>Packages</SectionLabel></Reveal>
            <RevealHeading id="packages-title" className="h-display" lines={['Your event.', 'Your vision.', 'Your package.']} />
          </div>

          <Reveal delay={0.15} className="price">
            <p className="price__kicker">Packages from</p>
            <p className="price__value">
              <span className="sr-only">{site.startingPrice} AUD</span>
              <span className="price__currency" aria-hidden="true">$</span>
              <span className="price__num" aria-hidden="true"><CountUp to={Number(site.startingPrice.replace(/\D/g, ''))} /></span>
              <span className="price__aud" aria-hidden="true">AUD</span>
            </p>
            <p className="price__copy">
              Packages for birthdays, Holy Communion, weddings, cultural events, corporate programs, mega events
              and more. Contact us for a customised package to suit your event, venue and budget.
            </p>
          </Reveal>
        </div>

        <Reveal className="packages__tabs-wrap">
          <div className="packages__tabs" role="tablist" aria-label="Event types" onKeyDown={onKeyDown}>
            {eventCategories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                type="button"
                id={`tab-${c.id}`}
                aria-selected={i === active}
                aria-controls="packages-panel"
                tabIndex={i === active ? 0 : -1}
                className={`tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {c.label}
                {i === active && <motion.span layoutId="tab-underline" className="tab__underline" transition={{ duration: 0.5, ease: ease.out }} />}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="packages__panel" role="tabpanel" id="packages-panel" aria-labelledby={`tab-${cat.id}`} tabIndex={0}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cat.id}
              className="pkg"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <motion.div
                className="pkg__media"
                initial={reduce ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.9, ease: ease.inOut }}
              >
                <motion.div
                  className="pkg__media-scale"
                  initial={reduce ? false : { scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: ease.out }}
                >
                  <Img src={cat.image} alt={cat.alt} />
                </motion.div>
              </motion.div>

              <div className="pkg__body">
                <p className="pkg__count">
                  {String(active + 1).padStart(2, '0')} / {String(eventCategories.length).padStart(2, '0')}
                </p>
                <RevealHeading as="h3" split="chars" immediate className="pkg__title" lines={[cat.title]} delay={0.1} />
                <p className="pkg__desc">{cat.description}</p>

                <p className="pkg__ideas-label">Custom package ideas</p>
                <ul className="pkg__ideas">
                  {cat.ideas.map((idea, i) => (
                    <motion.li
                      key={idea}
                      initial={reduce ? false : { opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: ease.out, delay: 0.25 + i * 0.07 }}
                    >
                      {idea}
                    </motion.li>
                  ))}
                </ul>

                <Button arrow onClick={() => planEvent({ eventType: categoryToEventType[cat.id] })}>
                  Request a custom quote
                </Button>
                <p className="pkg__note">
                  Packages start from {site.startingPrice}. Inclusions and final pricing depend on your event, venue and
                  requirements, and are confirmed after enquiry.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
