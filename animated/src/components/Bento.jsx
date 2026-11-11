import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { t } from '../lib/motion';
import shailesh from '../assets/images/shailesh-kumar.webp';
import anand from '../assets/images/anand-ms.webp';

/** Proof cards. Every figure comes from the current washuvi.com. */
export default function Bento() {
  return (
    <section aria-labelledby="proof-title" className="paper bg-paper pb-20 pt-20 text-ink lg:pb-24 lg:pt-24">
    <Reveal className="mx-auto mb-12 grid max-w-6xl gap-4 px-4 md:px-8">
      <p className="eyebrow text-accent-paper">By the numbers</p>
      <h2 id="proof-title" className="heading-2 phone-heading-4">Small on purpose. Senior by design.</h2>
    </Reveal>
    <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
      <Reveal className="relative overflow-hidden rounded-3xl bg-paper-2 md:row-span-2">
        <motion.img src={shailesh} alt="Portrait of Shailesh Kumar, Managing Partner" width="480" height="600" loading="lazy"
          className="h-full min-h-[24rem] w-full object-cover" whileHover={{ scale: 1.03 }} transition={t.layout} />
        {/* outer 24 − gap 8 = 16 */}
        <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-[rgba(251,249,244,0.92)] p-4 backdrop-blur-md">
          <p className="heading-3 text-ink">15+</p>
          <p className="caption-2 text-ink-2">Years in institutional equity research. Shailesh Kumar, Managing Partner</p>
        </div>
      </Reveal>

      <Reveal delay={0.06} className="grid content-between gap-8 rounded-3xl border border-paper-line bg-card p-6">
        <p className="caption-3 text-ink-3">Companies at any time</p>
        <div><p className="display-2 phone-heading-1 text-ink tabular-nums">8–10</p><p className="body-6 mt-2 text-ink-2">A capped roster, ever. We turn down more mandates than we accept.</p></div>
      </Reveal>

      <Reveal delay={0.12} className="grid content-between gap-8 rounded-3xl bg-ink p-6 text-paper">
        <p className="caption-3 text-paper/60">Active mandates</p>
        <div><p className="display-2 phone-heading-1 tabular-nums">6</p><p className="body-6 mt-2 text-paper/70">Listed companies we are in the room for, right now.</p></div>
      </Reveal>

      <Reveal delay={0.18} className="grid content-between gap-8 rounded-3xl bg-accent-strong p-6 text-white md:col-span-2 lg:col-span-1 lg:row-span-2">
        <p className="caption-3 text-white/70">Combined desk experience</p>
        <div>
          <p className="display-2 phone-heading-1 tabular-nums">50+</p>
          <p className="body-6 mt-2 text-white/80">Years across institutional equity research, investor relations and financial journalism.</p>
        </div>
      </Reveal>

      <Reveal delay={0.24} className="flex items-center gap-4 rounded-3xl border border-paper-line bg-card p-6 md:col-span-2">
        <img src={anand} alt="" width="480" height="600" className="size-16 shrink-0 rounded-full object-cover object-top" loading="lazy" />
        <p className="title-2 text-ink">Led by a cofounder of the <span className="text-accent-paper">Investor Relations Society of India</span>, Anand M.S.</p>
      </Reveal>
    </div>
    </section>
  );
}
