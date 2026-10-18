import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { galleryItems } from '../../data/content';
import { isDemoImagery } from '../../data/images';
import { ease } from '../../lib/animations/easing';
import { gsap, ScrollTrigger } from '../../lib/animations/gsap';
import { DESKTOP_MOTION_QUERY } from '../../lib/animations/useMediaQuery';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  // Desktop: vertical scroll drives the horizontal track. Mobile: native swipe.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      DESKTOP_MOTION_QUERY,
      () => {
        const track = root.current!.querySelector<HTMLElement>('.gallery__track')!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.gallery__pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Cards lean with scroll speed, then settle.
        const proxy = { skew: 0 };
        const setSkew = gsap.quickSetter('.gallery__btn', 'skewX', 'deg');
        const clamp = gsap.utils.clamp(-9, 9);
        ScrollTrigger.create({
          trigger: '.gallery__pin',
          start: 'top bottom',
          end: () => `+=${distance() + window.innerHeight * 2}`,
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -350);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, { skew: 0, duration: 0.9, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.skew) });
            }
          },
        });

        gsap.utils.toArray<HTMLElement>('.gallery__item img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -6 }, {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: '.gallery__pin',
              start: 'top top',
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section className="gallery" id="work" ref={root} aria-labelledby="gallery-title">
      <div className="gallery__pin">
        <SectionFx
          strips
          glows={[{ color: 'violet', x: '50%', y: '-20%', size: 760 }, { color: 'blue', x: '-10%', y: '50%', size: 600 }]}
        />
        <div className="container gallery__head">
          <div>
            <Reveal><SectionLabel accent="violet">Our work</SectionLabel></Reveal>
            <RevealHeading id="gallery-title" className="h-display" lines={['A look at the', 'atmosphere.']} />
          </div>
          <Reveal delay={0.15}>
            <p className="gallery__hint">
              <span className="gallery__hint-desktop">Keep scrolling to explore</span>
              <span className="gallery__hint-mobile">Swipe to explore</span>
              <span aria-hidden="true"> →</span>
            </p>
          </Reveal>
        </div>

        <ul className="gallery__track" aria-label="Gallery">
          {galleryItems.map((item, i) => (
            <li className={`gallery__item gallery__item--${i % 3}`} key={item.id}>
              <button
                type="button"
                className="gallery__btn"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`View larger: ${item.title}`}
              >
                <span className="gallery__frame"><Img src={item.image} alt={item.alt} /></span>
                <span className="gallery__meta">
                  <span className="gallery__cat">{item.category}</span>
                  <span className="gallery__title">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
          <li className="gallery__end" aria-hidden="true">
            <p>Your celebration<br />could be next.</p>
          </li>
        </ul>

        {isDemoImagery && (
          <p className="container demo-note">Demonstration imagery shown for visual reference only.</p>
        )}
      </div>

      <Lightbox index={open} onClose={close} onNav={setOpen} />
    </section>
  );
}

function Lightbox({ index, onClose, onNav }: { index: number | null; onClose: () => void; onNav: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = galleryItems.length;

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % count);
      if (e.key === 'ArrowLeft') onNav((index - 1 + count) % count);
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, count, onClose, onNav]);

  const item = index !== null ? galleryItems[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              className="lightbox__figure"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              <Img src={item.image} alt={item.alt} loading="eager" />
              <figcaption>
                <span className="gallery__cat">{item.category}</span>
                <span>{item.title}</span>
                <span className="lightbox__count">{index + 1} / {count}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="lightbox__nav">
            <button type="button" onClick={() => onNav((index - 1 + count) % count)} aria-label="Previous image">←</button>
            <button type="button" onClick={() => onNav((index + 1) % count)} aria-label="Next image">→</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
