import { MotionConfig } from 'framer-motion';
import { Funnel, UserCircleCheck } from '@phosphor-icons/react';
import { PaletteProvider } from './lib/palette';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Position from './components/Position';
import Benefits from './components/Benefits';
import Statement from './components/Statement';
import Bento from './components/Bento';
import Approach from './components/Approach';
import Difference from './components/Difference';
import Services from './components/Services';
import People from './components/People';
import Work from './components/Work';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaletteSwitcher from './components/PaletteSwitcher';

const tagline = [
  'We', 'turn', 'down', 'more', 'mandates', 'than', 'we', 'accept.', { icon: Funnel },
  'Attention', 'is', 'the', 'only', 'thing', 'we', 'sell,', 'and', 'it', "doesn't", 'divide', 'well.', { icon: UserCircleCheck },
];

export default function App() {
  return (
    <PaletteProvider>
      {/* reducedMotion="user": movement is dropped under prefers-reduced-motion, fades remain */}
      <MotionConfig reducedMotion="user">
        <a href="#main" className="btn-light button-sm fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0">Skip to content</a>
        <Nav />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Position />
          <Benefits />
          <section aria-label="Our strategy in one line" className="relative overflow-hidden bg-bg">
            <div className="glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative">
              <Statement tokens={tagline} tone="dark" eyebrow="The whole strategy, in one line"
                note="Every investor relations firm wants more logos. We want fewer, because a capped roster is the only way senior partners stay on every account." />
            </div>
          </section>
          <Bento />
          <Approach />
          <Difference />
          <Services />
          <People />
          <Work />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <PaletteSwitcher />
      </MotionConfig>
    </PaletteProvider>
  );
}
