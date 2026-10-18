import { motion } from 'framer-motion';
import { images } from '../../data/images';
import { ease } from '../../lib/animations/easing';
import { site } from '../../config/site';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { RevealImage } from '../ui/RevealImage';
import { ScrollWords } from '../ui/ScrollWords';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

export function Intro() {
  return (
    <section className="intro section" id="intro" aria-labelledby="intro-title">
      <SectionFx
        word="Elevated"
        particles
        glows={[{ color: 'amber', x: '-12%', y: '-10%', size: 620 }, { color: 'violet', x: '62%', y: '45%', size: 680 }]}
      />
      <div className="container intro__grid">
        <div className="intro__text">
          <Reveal><SectionLabel>Events, elevated</SectionLabel></Reveal>
          <RevealHeading id="intro-title" className="h-display" lines={['Big atmosphere.', 'Thoughtful details.']} />
          <ScrollWords
            className="intro__copy"
            text="From intimate celebrations to large-scale events, PRO EVENTS CAIRNS helps bring your occasion to life with sound, lighting, LED walls and decoration."
          />
        </div>

        <RevealImage className="intro__image" src={images.intro} alt="Guests raising glasses at a warmly lit celebration" parallax={6} />

        <Reveal delay={0.1} className="intro__aside">
          <ul className="intro__services" aria-label="Services">
            {site.services.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease: ease.out, delay: i * 0.08 }}
              >
                <span className="intro__num">0{i + 1}</span>
                <span className="intro__svc">{s}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
