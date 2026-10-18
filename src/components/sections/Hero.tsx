import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { images } from '../../data/images';
import { ease } from '../../lib/animations/easing';
import { useIntroReady } from '../../lib/animations/IntroContext';
import { useSpotlight } from '../../lib/animations/useSpotlight';
import { ButtonLink } from '../ui/Button';
import { Img } from '../ui/Img';
import { RevealHeading } from '../ui/RevealHeading';

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const spotlight = useSpotlight();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(6px)']);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: ready ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 1, ease: ease.out, delay },
        };

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title" {...spotlight}>
      <motion.div
        className="hero__media"
        initial={reduce ? false : { clipPath: 'inset(18% 14% 18% 14% round 12px)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 0px)' } : undefined}
        transition={{ duration: 1.8, ease: ease.inOut, delay: 0.05 }}
      >
        <motion.div className="hero__media-inner" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
          <motion.div
            className="hero__media-scale"
            initial={reduce ? false : { scale: 1.35, filter: 'brightness(0.2) saturate(0.4)' }}
            animate={ready ? { scale: 1.06, filter: 'brightness(1) saturate(1)' } : undefined}
            transition={{ duration: 2.8, ease: ease.out, delay: 0.05 }}
          >
            <Img src={images.hero} alt="Stage lights cutting through haze above a celebrating crowd" loading="eager" fetchPriority="high" />
          </motion.div>
        </motion.div>
        <div className="hero__shade" aria-hidden="true" />
        <div className={`hero__beams ${ready ? 'is-on' : ''}`} aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="hero__glow" aria-hidden="true" />
        <div className="spotlight" aria-hidden="true" />
      </motion.div>

      <motion.div className="hero__content container" style={reduce ? undefined : { y: contentY, opacity: fade, filter: blur }}>
        <motion.p className="hero__eyebrow" {...rise(0.55)}>
          Cairns <i>•</i> Sound <i>•</i> Lighting <i>•</i> LED <i>•</i> Decoration
        </motion.p>

        <RevealHeading
          as="h1"
          id="hero-title"
          className="hero__title"
          lines={['Make every', 'celebration', 'special.']}
          split="chars"
          gradientLine={2}
          immediate
          play={ready}
          delay={0.45}
        />

        <div className="hero__bottom">
          <motion.p className="hero__lede" {...rise(1.25)}>
            Sound, lighting, LED walls and event decoration for moments worth celebrating.
          </motion.p>
          <motion.div className="hero__ctas" {...rise(1.4)}>
            <ButtonLink href="#packages">Explore Packages</ButtonLink>
            <ButtonLink href="#plan" variant="ghost" arrow={false}>Plan Your Event</ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#intro"
        className="hero__scroll"
        aria-label="Scroll to introduction"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
