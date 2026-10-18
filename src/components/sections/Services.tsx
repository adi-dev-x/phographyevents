import { services } from '../../data/content';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { RevealImage } from '../ui/RevealImage';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';
import { Tilt } from '../ui/Tilt';

const layouts = ['split', 'offset', 'wide', 'split-rev'] as const;

export function Services() {
  const { planEvent } = useBooking();

  return (
    <section className="services section section--alt" id="services" aria-labelledby="services-title">
      <SectionFx
        word="Services"
        strips
        glows={[
          { color: 'violet', x: '55%', y: '2%', size: 720 },
          { color: 'blue', x: '-15%', y: '38%', size: 640 },
          { color: 'amber', x: '60%', y: '72%', size: 600 },
        ]}
      />
      <div className="container">
        <header className="section-head">
          <Reveal><SectionLabel accent="violet">What we bring</SectionLabel></Reveal>
          <RevealHeading id="services-title" className="h-display" lines={['Four ways to', 'set the scene.']} />
        </header>

        <div className="services__list">
          {services.map((s, i) => (
            <article key={s.id} className={`service service--${layouts[i]}`} aria-labelledby={`service-${s.id}`}>
              <Tilt className="service__media" max={layouts[i] === 'wide' ? 2.5 : 5}>
                <RevealImage
                  className="fill"
                  src={s.image}
                  alt={s.alt}
                  from={i % 2 === 0 ? 'left' : 'right'}
                  parallax={layouts[i] === 'wide' ? 8 : 4}
                />
              </Tilt>
              <div className="service__body">
                <Reveal>
                  <span className="service__index">{s.index}</span>
                </Reveal>
                <RevealHeading as="h3" split="chars" className="service__title" id={`service-${s.id}`} lines={[s.title]} />
                <Reveal delay={0.15}>
                  <p className="service__desc">{s.description}</p>
                  <Button variant="link" arrow onClick={() => planEvent({ service: s.enquiryValue })}>
                    Enquire about {s.short.toLowerCase()}
                  </Button>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
