import { MotionConfig } from 'framer-motion';
import { PaletteProvider } from './lib/palette';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Bento from './components/Bento';
import Approach from './components/Approach';
import Services from './components/Services';
import People from './components/People';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaletteSwitcher from './components/PaletteSwitcher';

export default function App() {
  return (
    <PaletteProvider>
      {/* reducedMotion="user": movement is dropped under prefers-reduced-motion, fades remain */}
      <MotionConfig reducedMotion="user">
        <a href="#main" className="btn-light button-sm fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0">Skip to content</a>
        <Nav />
        <main id="main" tabIndex={-1}>
          <Hero />
          <section aria-label="Why Washuvi" className="paper bg-paper">
            <Statement />
            <Bento />
          </section>
          <Approach />
          <Services />
          <People />
          <Contact />
        </main>
        <Footer />
        <PaletteSwitcher />
      </MotionConfig>
    </PaletteProvider>
  );
}
