import { useLayoutEffect, useRef } from 'react';
import { storySteps } from '../../data/content';
import { gsap } from '../../lib/animations/gsap';
import { DESKTOP_MOTION_QUERY } from '../../lib/animations/useMediaQuery';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

/**
 * Pinned, scrubbed production story (desktop + motion allowed only).
 * Each layer is a separate image; the venue is dimmed first, then each
 * stage wipes up over the last while lighting beams build in.
 * On mobile / reduced motion, the same markup renders as a vertical sequence.
 */
export function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      DESKTOP_MOTION_QUERY,
      () => {
        const steps = gsap.utils.toArray<HTMLElement>('.story__step');
        const media = steps.map((s) => s.querySelector('.story__img'));
        const captions = steps.map((s) => s.querySelector('figcaption'));
        const dots = gsap.utils.toArray<HTMLElement>('.story__dot');

        gsap.set(media.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(media[0], { filter: 'brightness(0.32) saturate(0.35)' });
        gsap.set(captions.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set('.story__beams', { autoAlpha: 0 });
        gsap.set(dots[0], { className: 'story__dot is-active' });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.story__pin',
            start: 'top top',
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(media[0], { filter: 'brightness(0.62) saturate(0.7)', duration: 0.8 });

        for (let i = 1; i < steps.length; i++) {
          const at = i + 0.2;
          tl.to(media[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, at)
            .fromTo(media[i]!.querySelector('img'), { scale: 1.25 }, { scale: 1.02, duration: 1.1 }, at)
            .to(captions[i - 1], { autoAlpha: 0, y: -40, duration: 0.3 }, at)
            .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.35)
            .set(dots[i - 1], { className: 'story__dot' }, at + 0.4)
            .set(dots[i], { className: 'story__dot is-active' }, at + 0.4);
        }
        // Lighting beams build up as the "atmosphere" stage arrives, peak at showtime.
        tl.to('.story__beams', { autoAlpha: 0.55, duration: 0.6 }, 2.2)
          .to('.story__beams', { autoAlpha: 1, duration: 0.6 }, 3.2)
          .to({}, { duration: 0.5 });
        const total = tl.duration();
        tl.to('.story__progress-fill', { scaleX: 1, duration: total }, 0)
          .fromTo('.story__stage', { scale: 1 }, { scale: 1.08, duration: total }, 0)
          .to('.story__intro', { yPercent: -30, autoAlpha: 0.35, duration: total }, 0);
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="story" id="story" ref={root} aria-labelledby="story-title">
      <div className="story__pin">
        <SectionFx
          className="fx--story"
          word="Showtime"
          glows={[{ color: 'blue', x: '50%', y: '0%', size: 700 }, { color: 'violet', x: '-10%', y: '60%', size: 600 }]}
        />
        <div className="story__intro container">
          <Reveal><SectionLabel accent="blue">The production</SectionLabel></Reveal>
          <RevealHeading id="story-title" className="h-display story__title" lines={['From setup', 'to showtime.']} />
        </div>

        <div className="story__stage">
          {storySteps.map((s, i) => (
            <figure className="story__step" key={s.label}>
              <div className="story__img">
                <Img src={s.image} alt={s.alt} />
              </div>
              <figcaption>
                <span className="story__step-num">0{i + 1}</span>
                <span className="story__step-label">{s.label}</span>
                <span className="story__step-caption">{s.caption}</span>
              </figcaption>
            </figure>
          ))}
          <div className="story__beams" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="story__vignette" aria-hidden="true" />
        </div>

        <div className="story__hud container" aria-hidden="true">
          <div className="story__dots">
            {storySteps.map((s) => <span className="story__dot" key={s.label}>{s.label}</span>)}
          </div>
          <div className="story__progress"><span className="story__progress-fill" /></div>
        </div>
      </div>
    </section>
  );
}
