import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { site } from '../../config/site';
import { images } from '../../data/images';
import { ButtonLink } from '../ui/Button';
import { useSpotlight } from '../../lib/animations/useSpotlight';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className="final-cta" id="contact" ref={ref} aria-labelledby="final-title" {...spotlight}>
      <motion.div className="final-cta__bg" style={reduce ? undefined : { scale, y }} aria-hidden="true">
        <Img src={images.cta} alt="" />
      </motion.div>
      <div className="final-cta__shade" aria-hidden="true" />
      <div className="spotlight spotlight--violet" aria-hidden="true" />

      <div className="container final-cta__inner">
        <RevealHeading id="final-title" className="final-cta__title" lines={['Let’s make your next', 'celebration special.']} split="chars" gradientLine={1} />
        <Reveal delay={0.2}>
          <p className="final-cta__copy">
            Tell us what you’re planning and ask about a package tailored to your event and budget.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="final-cta__actions">
          <ButtonLink href="#plan">Plan Your Event</ButtonLink>
          {site.contacts.map((c) => (
            <ButtonLink key={c.id} href={c.phoneHref} variant="ghost" arrow={false} aria-label={`Call ${c.initials}, ${c.role}, on ${c.phoneDisplay}`}>
              Call {c.initials}
            </ButtonLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
