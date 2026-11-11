import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import BlurWords from './BlurWords';
import Chrome from './LazyChrome';
import Marquee from './Marquee';
import { t } from '../lib/motion';

const fade = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { ...t.reveal, delay: d } });

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="glow relative overflow-hidden">
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-16 pt-24 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
        <div className="relative z-10 grid gap-6 pt-8">
          <motion.p {...fade(0.1)} className="caption-2 flex flex-wrap items-center gap-2 text-fg-2">
            <span>Investor relations</span><span className="size-1 rounded-full bg-fg-3" aria-hidden="true" />
            <span>Equity advisory</span><span className="size-1 rounded-full bg-fg-3" aria-hidden="true" />
            <span>Est. 2024</span>
          </motion.p>

          <h1 id="hero-title" className="heading-1 phone-heading-3 max-w-hero">
            <BlurWords text="The right investors," className="block" wordClass="text-hero" delay={0.2} />
            <BlurWords text="for India's small and" className="block" wordClass="text-hero" delay={0.4} />
            <BlurWords text="mid cap founders." className="block text-fg-2" delay={0.6} />
          </h1>

          <motion.p {...fade(0.9)} className="body-3 max-w-hero text-fg-2">
            Independent investor relations and equity advisory. We take eight to ten companies at a time,
            and only senior partners touch your account.
          </motion.p>

          <motion.div {...fade(1.05)} className="grid justify-items-start gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <motion.a whileTap={{ scale: 0.98 }} href="#contact" className="btn-light button-md group">
                Tell us about your company
                <ArrowRight size={20} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1" />
              </motion.a>
            </div>
            <p className="caption-2 flex max-w-lg gap-2 text-fg-2">
              <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              Led by a cofounder of the Investor Relations Society of India, with roughly fifty years of combined desk experience.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative h-72 lg:h-[34rem]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: t.reveal.ease, delay: 0.3 }}
        >
          <Chrome className="h-full w-full" label="Two interlocking chrome rings, standing for a company and its investors" />
          <motion.p {...fade(1.3)} className="caption-3 absolute inset-x-0 bottom-0 text-center text-fg-3">Your company · Its investors</motion.p>
        </motion.div>
      </div>
      <Marquee />
    </section>
  );
}
