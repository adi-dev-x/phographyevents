import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Booking } from './components/booking/Booking';
import { BookingProvider } from './components/booking/BookingContext';
import { Footer } from './components/layout/Footer';
import { Nav } from './components/layout/Nav';
import { Preloader } from './components/layout/Preloader';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { About } from './components/sections/About';
import { FinalCta } from './components/sections/FinalCta';
import { Gallery } from './components/sections/Gallery';
import { Hero } from './components/sections/Hero';
import { Intro } from './components/sections/Intro';
import { Packages } from './components/sections/Packages';
import { Services } from './components/sections/Services';
import { Story } from './components/sections/Story';
import { Why } from './components/sections/Why';
import { Marquee } from './components/ui/Marquee';
import { site } from './config/site';
import { ScrollTrigger } from './lib/animations/gsap';
import { IntroContext } from './lib/animations/IntroContext';

const INTRO_KEY = 'pec-intro-seen';

/** Skip the preloader for reduced motion, and after the first view in a session. */
function shouldSkipIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

export function App() {
  const [ready, setReady] = useState(shouldSkipIntro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable — fine */
    }
    setReady(true);
  }, []);

  // Recalculate pinned sections once fonts, images and the intro have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);
  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={ready}>
        <BookingProvider>
          <AnimatePresence>{!ready && <Preloader key="preloader" onDone={finishIntro} />}</AnimatePresence>
          <a href="#main" className="skip-link">Skip to content</a>
          <div className="grain" aria-hidden="true" />
          <ScrollProgress />
          <Nav />
          <main id="main">
            <Hero />
            <Marquee items={['Sound', 'Lighting', 'LED Wall', 'Decoration', `Packages from ${site.startingPrice}`]} />
            <Intro />
            <Services />
            <Packages />
            <Story />
            <Gallery />
            <Why />
            <About />
            <Marquee reverse speed={2} items={['Birthdays', 'Holy Communion', 'Weddings', 'Engagements', 'Cultural', 'Corporate', 'Mega Events']} />
            <Booking />
            <FinalCta />
          </main>
          <Footer />
        </BookingProvider>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
