import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, UsersThree } from '@phosphor-icons/react';
import { ease, t } from '../lib/motion';

const lines = ['The right investors,', "for India's small and", 'mid cap founders.'];
const mandates = ['V‑Marc (India) Ltd', 'Bharat Parenterals Ltd', 'Qualitek Labs Ltd', 'Logica Infoway Ltd', 'Sugs Lloyd Ltd', 'Paradeep Parivahan Ltd'];
const CAP = 10;

const fadeUp = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { ...t.reveal, delay } });

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-20 pt-24 lg:pb-24 lg:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-6 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-12">
        <div className="grid gap-6">
          <motion.p {...fadeUp(0.15)} className="caption-2 flex flex-wrap items-center gap-2 text-ink-2">
            <span>Investor relations</span><span className="size-1 rounded-full bg-line" aria-hidden="true" />
            <span>Equity advisory</span><span className="size-1 rounded-full bg-line" aria-hidden="true" />
            <span>Est. 2024</span>
          </motion.p>

          <h1 id="hero-title" className="heading-1 phone-heading-3 max-w-hero">
            {lines.map((line, i) => (
              <span key={line} className="-mb-3 block overflow-hidden">
                <motion.span
                  className="text-hero block pb-3"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.09 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...fadeUp(0.55)} className="body-3 max-w-hero text-ink-2">
            Independent investor relations and equity advisory. We take eight to ten companies at a time,
            and only senior partners touch your account.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="grid justify-items-start gap-4">
            <motion.a whileTap={{ scale: 0.98 }} href="#contact" className="btn-gold button-md group">
              Tell us about your company
              <ArrowRight size={20} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1" />
            </motion.a>
            <p className="caption-2 flex max-w-lg gap-2 text-ink-2">
              <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              Led by a cofounder of the Investor Relations Society of India, with roughly fifty years of combined desk experience.
            </p>
          </motion.div>
        </div>

        {/* Hero visual: the live roster */}
        <motion.aside
          aria-labelledby="roster-title"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          className="rounded-3xl border border-line bg-surface p-2 shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
        >
          {/* outer 24 − gap 8 = 16 */}
          <div className="rounded-2xl border border-line bg-bg p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p id="roster-title" className="caption-3 text-ink-3">Current roster</p>
                <p className="flex items-baseline gap-1"><span className="heading-3">6</span><span className="body-5 text-ink-2">active mandates</span></p>
              </div>
              <span className="caption-5 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-gold">
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" /> Since 2024
              </span>
            </div>

            <div className="mb-6 grid grid-cols-10 gap-1" role="img" aria-label={`6 of a maximum of ${CAP} mandate slots in use`}>
              {Array.from({ length: CAP }, (_, i) => (
                <span key={i} className="h-2 overflow-hidden rounded-full bg-surface-2">
                  {i < mandates.length && (
                    <motion.span
                      className="block h-full w-full origin-left rounded-full bg-gold"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.9 + i * 0.08 }}
                    />
                  )}
                </span>
              ))}
            </div>

            <ul>
              {mandates.map((m, i) => (
                <motion.li
                  key={m}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.layout, delay: 1.0 + i * 0.06 }}
                  className="flex items-center justify-between gap-4 border-t border-line py-3 first:border-t-0"
                >
                  <span className="body-5">{m}</span>
                  <span className="caption-5 text-ink-3">0{i + 1}</span>
                </motion.li>
              ))}
            </ul>

            <p className="caption-2 mt-4 flex items-center gap-2 border-t border-line pt-4 text-ink-2">
              <UsersThree size={16} className="text-gold" aria-hidden="true" /> Capped at 8 to 10 companies, ever.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
