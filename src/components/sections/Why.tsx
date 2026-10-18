import { motion } from 'framer-motion';
import { site } from '../../config/site';
import { ease } from '../../lib/animations/easing';
import { images } from '../../data/images';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { RevealImage } from '../ui/RevealImage';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

// Every point is grounded in client-supplied facts. No unsupported claims.
const points = [
  { title: 'Everything in one place', body: 'Sound, lighting, LED wall and decoration from one team, so your event looks and sounds like one idea.' },
  { title: `Packages from ${site.startingPrice}`, body: 'An approachable starting point, with packages shaped around what your event actually needs.' },
  { title: 'Made for every occasion', body: 'Birthdays, Holy Communion, weddings, engagements, cultural, corporate and mega events.' },
  { title: 'Customised to you', body: 'Your package is built around your event, your venue and your budget.' },
];

export function Why() {
  return (
    <section className="why section section--alt" aria-labelledby="why-title">
      <SectionFx
        word="One team"
        particles
        glows={[{ color: 'blue', x: '-14%', y: '8%', size: 620 }, { color: 'amber', x: '68%', y: '50%', size: 560 }]}
      />
      <div className="container why__grid">
        <div className="why__lead">
          <Reveal><SectionLabel accent="blue">Why PRO EVENTS</SectionLabel></Reveal>
          <RevealHeading id="why-title" className="h-display" lines={['One team.', 'Every detail.']} />
          <RevealImage className="why__image" src={images.why} alt="Performer with arm raised in stage haze and light" from="left" parallax={5} />
        </div>

        <ol className="why__list">
          {points.map((p, i) => (
            <li key={p.title} className="why__item">
              <motion.span
                className="why__rule"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.4, ease: ease.inOut, delay: i * 0.08 }}
              />
              <Reveal delay={0.15 + i * 0.05}>
                <span className="why__num">0{i + 1}</span>
                <h3 className="why__title">{p.title}</h3>
                <p className="why__body">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
