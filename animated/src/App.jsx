import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Tagline from './components/Tagline';
import Approach from './components/Approach';
import People from './components/People';
import Cta from './components/Cta';
import Footer from './components/Footer';

export default function App() {
  return (
    // reducedMotion="user": under prefers-reduced-motion, movement is dropped and only opacity animates (B7)
    <MotionConfig reducedMotion="user">
      <a href="#main" className="btn-gold button-sm fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Stats />
        <Tagline />
        <Approach />
        <People />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
