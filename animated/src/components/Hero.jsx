import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import BlurWords from './BlurWords';
import Chrome from './LazyChrome';
import Marquee from './Marquee';
import { t } from '../lib/motion';

const stats = [['50+', 'Years combined desk experience'], ['15+', 'Years institutional equity research'], ['8–10', 'Companies at any time']];
const fade = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { ...t.reveal, delay: d } });

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="glow relative overflow-hidden">
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-rows-[auto_1fr_auto] px-4 pb-12 pt-24 md:px-8 lg:pt-24">
        <h1 id="hero-title" className="display-1 phone-display relative z-10 max-w-4xl pt-8 lg:pt-12">
          <BlurWords text="Capital follows" className="block" wordClass="text-hero" delay={0.2} />
          <BlurWords text="conviction." className="block text-fg-2" delay={0.45} />
        </h1>

        {/* Chrome rings: centre on desktop, in flow on phones */}
        <motion.div
          className="pointer-events-auto relative h-56 md:absolute md:right-0 md:top-20 md:my-0 md:h-[58vh] md:w-3/5"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: t.reveal.ease, delay: 0.3 }}
        >
          <Chrome className="h-full w-full" label="Two interlocking chrome rings, standing for a company and its investors" />
        </motion.div>

        <p className="display-2 phone-heading-3 relative z-10 hidden self-end justify-self-end pb-8 text-right text-fg-2 md:block" aria-hidden="true">
          <BlurWords text="We create it." delay={0.8} wordClass="text-hero" />
        </p>

        <div className="relative z-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.dl {...fade(1.0)} className="grid grid-cols-3 gap-4 md:flex md:gap-8">
            {stats.map(([v, l]) => (
              <div key={l} className="grid gap-1 border-l border-line pl-4 first:border-l-0 first:pl-0 md:pl-8">
                <dt className="caption-5 order-2 max-w-[9rem] text-fg-2">{l}</dt>
                <dd className="heading-2 phone-heading-4 order-1 tabular-nums">{v}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.div {...fade(1.15)} className="grid gap-4 lg:justify-items-end lg:text-right">
            <p className="title-2 max-w-md text-fg">Independent investor relations and equity advisory for India's small and mid cap founders.</p>
            <p className="body-6 max-w-md text-fg-2">We take eight to ten companies at a time, and only senior partners touch your account.</p>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <motion.a whileTap={{ scale: 0.98 }} href="#contact" className="btn-light button-sm group">
                Tell us about your company
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1" />
              </motion.a>
              <a href="#approach" className="body-5 text-fg underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">How we work</a>
            </div>
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
