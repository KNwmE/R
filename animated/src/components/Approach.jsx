import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check, MagnifyingGlass, PenNib, Handshake } from '@phosphor-icons/react';
import Reveal from './Reveal';
import BlurWords from './BlurWords';
import { ease } from '../lib/motion';

const steps = [
  { icon: MagnifyingGlass, title: 'We research you first',
    body: "We don't pitch companies we haven't already researched. By the time we call, we've read the filings, walked the numbers and formed a real view. If we don't believe it, we don't call.",
    point: 'Then a deep dive: business model, financials, founder vision, competition' },
  { icon: PenNib, title: 'We write the equity story',
    body: 'A single, defensible growth narrative, not a deck of adjectives. Then we shortlist the exact investor categories that story is built to win.',
    point: 'Built from your filings up, never a reused template' },
  { icon: Handshake, title: 'We get you in the room, and keep you there',
    body: 'Proactive outreach, quarterly concalls, management meetings, plant visits and perception management. A wider investor base becomes better valuation and durable loyalty.',
    point: 'Monthly sector letters keep investors engaged between results' },
];

export default function Approach() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="approach" aria-labelledby="approach-title" className="paper border-t border-paper-line bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="grid content-start gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-accent-paper">Approach</p>
          <h2 id="approach-title" className="heading-2 phone-heading-4"><BlurWords text="How a mandate runs, from first look to compounding." inView stagger={0.04} /></h2>
          <p className="body-3 text-ink-2">Three stages, run by the same senior partners from start to finish.</p>
        </div>

        <div ref={listRef} className="relative">
          <span className="absolute bottom-8 left-6 top-8 w-0.5 rounded-full bg-paper-line" aria-hidden="true" />
          <motion.span style={{ scaleY: fill }} className="absolute bottom-8 left-6 top-8 w-0.5 origin-top rounded-full bg-accent-paper" aria-hidden="true" />
          <ol className="grid gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[48px_1fr] gap-4 md:gap-6">
                <motion.span className="relative z-10 grid size-12 place-items-center overflow-hidden rounded-full border border-paper-line bg-card text-ink-3" aria-hidden="true"
                  initial="hide" whileInView="show" viewport={{ once: true, margin: '0px 0px -40% 0px' }}>
                  <s.icon size={20} />
                  <motion.span className="absolute inset-0 grid place-items-center rounded-full bg-accent-paper text-white"
                    variants={{ hide: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                    transition={{ duration: 0.5, ease }}>
                    <s.icon size={20} weight="duotone" />
                  </motion.span>
                </motion.span>
                <Reveal className="grid gap-4 rounded-3xl border border-paper-line bg-card p-6">
                  <p className="caption-3 text-ink-3">Step 0{i + 1}</p>
                  <h3 className="heading-5">{s.title}</h3>
                  <p className="body-6 text-ink-2">{s.body}</p>
                  <p className="body-5 flex gap-2 border-t border-paper-line pt-4">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-paper" aria-hidden="true" />{s.point}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
