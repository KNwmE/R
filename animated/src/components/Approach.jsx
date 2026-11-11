import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { ease } from '../lib/motion';

const steps = [
  {
    title: 'We research you first',
    body: "We don't pitch companies we haven't already researched. By the time we call, we've read the filings, walked the numbers and formed a real view. If we don't believe it, we don't call.",
    point: 'Then a deep dive: model, financials, founder vision, competition',
  },
  {
    title: 'We write the equity story',
    body: 'A single, defensible growth narrative, not a deck of adjectives. Then we shortlist the exact investor categories that story is built to win.',
    point: 'Built from your filings up, never a reused template',
  },
  {
    title: 'We get you in the room, and keep you there',
    body: 'Proactive outreach, quarterly concalls, management meetings, plant visits and perception management. A wider investor base becomes durable loyalty.',
    point: 'Monthly sector letters keep investors engaged between results',
  },
];

export default function Approach() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="approach" aria-labelledby="approach-title" className="py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="grid content-start gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">Approach</p>
          <h2 id="approach-title" className="heading-3 phone-heading-4">How a mandate runs, from first look to compounding.</h2>
          <p className="body-3 text-ink-2">Three stages, run by the same senior partners from start to finish.</p>
        </Reveal>

        <div ref={listRef} className="relative">
          {/* progress rail */}
          <span className="absolute bottom-6 left-5 top-6 w-0.5 rounded-full bg-line" aria-hidden="true" />
          <motion.span style={{ scaleY: fill }} className="absolute bottom-6 left-5 top-6 w-0.5 origin-top rounded-full bg-gold" aria-hidden="true" />

          <ol className="grid gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[40px_1fr] gap-6">
                <span className="relative z-10 grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface title-3 tabular-nums text-ink-2" aria-hidden="true">
                  {i + 1}
                  <motion.span
                    className="absolute inset-0 grid place-items-center rounded-full bg-gold text-on-gold"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -40% 0px' }}
                    transition={{ duration: 0.5, ease }}
                  >
                    {i + 1}
                  </motion.span>
                </span>
                <Reveal className="card grid gap-4 p-6">
                  <h3 className="heading-6">{s.title}</h3>
                  <p className="body-6 text-ink-2">{s.body}</p>
                  <p className="body-6 flex gap-2 border-t border-line pt-4 text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />{s.point}
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
