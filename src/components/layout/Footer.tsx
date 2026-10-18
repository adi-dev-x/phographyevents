import { navLinks, site } from '../../config/site';
import { RevealHeading } from '../ui/RevealHeading';
import { SectionFx } from '../ui/SectionFx';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <SectionFx particles glows={[{ color: 'violet', x: '20%', y: '55%', size: 700 }, { color: 'amber', x: '70%', y: '70%', size: 520 }]} />
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#top" className="wordmark wordmark--lg" aria-label={`${site.name} — back to top`}>
            <span className="wordmark__pro">PRO</span>
            <span className="wordmark__rest">EVENTS CAIRNS</span>
          </a>
          <p className="footer__tagline">{site.tagline}</p>
          <p className="footer__services">{site.services.join(' • ')}</p>
        </div>

        <nav aria-label="Footer" className="footer__col">
          <h2 className="footer__heading">Explore</h2>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li><a href="#plan">Plan Your Event</a></li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Call us</h2>
          <ul>
            {site.contacts.map((c) => (
              <li key={c.id}>
                <a href={c.phoneHref}>
                  <span className="footer__muted">{c.initials}:</span> {c.phoneDisplay}
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__muted footer__loc">{site.location}</p>
        </div>
      </div>

      <div className="container footer__giant-wrap">
        <RevealHeading as="p" decorative split="chars" className="footer__giant" lines={['PRO EVENTS']} />
      </div>

      <div className="container footer__bottom">
        <p>{site.attribution}</p>
        <p>© {year} {site.name}</p>
      </div>
    </footer>
  );
}
