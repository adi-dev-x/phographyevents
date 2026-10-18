import { site } from '../../config/site';
import { images } from '../../data/images';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { RevealImage } from '../ui/RevealImage';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';

/**
 * Uses supplied facts only. When the client provides their story and team
 * photos, add the story paragraphs below and swap images.about for a team shot.
 */
export function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <SectionFx
        word="GM & LJ"
        grid
        glows={[{ color: 'violet', x: '62%', y: '6%', size: 640 }, { color: 'amber', x: '-10%', y: '58%', size: 520 }]}
      />
      <div className="container about__grid">
        <RevealImage className="about__image" src={images.about} alt="Audio mixing desk and equipment lit in warm and violet tones" from="right" />

        <div className="about__text">
          <Reveal><SectionLabel accent="violet">About</SectionLabel></Reveal>
          <RevealHeading id="about-title" className="h-display h-display--md" lines={['The people', 'behind the', 'celebration.']} />
          <Reveal delay={0.15}>
            <p className="about__copy">
              PRO EVENTS CAIRNS brings together sound, lighting, LED walls and decoration for celebrations across
              Cairns. Two specialists, one shared goal: to make every celebration special.
            </p>
          </Reveal>

          <div className="about__people">
            {site.contacts.map((c, i) => (
              <Reveal key={c.id} delay={0.2 + i * 0.08} className="person">
                <span className="person__mono" aria-hidden="true">{c.initials}</span>
                <div>
                  <p className="person__role">{c.role}</p>
                  <p className="person__by">by {c.initials}</p>
                  <a className="person__phone" href={c.phoneHref}>{c.phoneDisplay}</a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}><p className="about__attr">{site.attribution}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
