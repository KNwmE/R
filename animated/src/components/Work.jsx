import { motion } from 'framer-motion';
import { UsersThree } from '@phosphor-icons/react';
import Reveal from './Reveal';
import BlurWords from './BlurWords';
import { ease } from '../lib/motion';

const mandates = ['V‑Marc (India) Ltd', 'Bharat Parenterals Ltd', 'Qualitek Labs Ltd', 'Logica Infoway Ltd', 'Sugs Lloyd Ltd', 'Paradeep Parivahan Ltd'];
const CAP = 10;

/** The live roster: the cap made visible. Slots fill one by one when the card comes into view. */
export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-bg py-20 lg:py-24">
      <div className="glow pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="grid content-start gap-6">
          <p className="eyebrow text-accent">Work</p>
          <h2 id="work-title" className="heading-2 phone-heading-4"><BlurWords text="Companies we're in the room for, right now." inView stagger={0.05} wordClass="text-hero" /></h2>
          <p className="title-2 text-fg-2">A deliberately short list. That's the point.</p>
          <p className="body-6 text-fg-3">6 active corporate mandates · practising since 2024</p>
        </div>

        <Reveal as="aside" aria-labelledby="roster-title" className="rounded-3xl border border-line bg-[rgba(19,18,9,0.75)] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* outer 24 − gap 8 = 16 */}
          <div className="rounded-2xl border border-line bg-black/60 p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p id="roster-title" className="caption-3 text-fg-3">Current roster</p>
                <p className="flex items-baseline gap-2"><span className="heading-2">6</span><span className="body-5 text-fg-2">of a maximum of 10</span></p>
              </div>
              <span className="caption-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-accent">
                <motion.span className="size-2 rounded-full bg-accent" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease }} aria-hidden="true" />
                Live mandates
              </span>
            </div>
            <motion.div className="mb-6 grid grid-cols-10 gap-1" role="img" aria-label={`6 of a maximum of ${CAP} mandate slots in use`}
              initial="hide" whileInView="show" viewport={{ once: true }}>
              {Array.from({ length: CAP }, (_, i) => (
                <span key={i} className="h-2 overflow-hidden rounded-full bg-surface-2">
                  {i < mandates.length && (
                    <motion.span className="block h-full w-full origin-left rounded-full bg-accent"
                      variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }}
                      transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }} />
                  )}
                </span>
              ))}
            </motion.div>
            <ol>
              {mandates.map((m, i) => (
                <motion.li key={m} className="flex items-center justify-between gap-4 border-t border-line py-3 first:border-t-0"
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.4 + i * 0.08 }}>
                  <span className="title-3">{m}</span>
                  <span className="caption-5 text-fg-3">0{i + 1}</span>
                </motion.li>
              ))}
            </ol>
            <p className="caption-2 mt-4 flex items-center gap-2 border-t border-line pt-4 text-fg-2">
              <UsersThree size={16} className="text-accent" aria-hidden="true" /> Capped at 8 to 10 companies, ever.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
