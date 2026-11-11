import { motion } from 'framer-motion';
import { Check, X } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { ease } from '../lib/motion';

const rows = [
  ['Client roster', "Sign everyone who'll pay a retainer", 'Capped at 8 to 10 companies, ever'],
  ['Who services you', 'Junior staff run the account', 'Only senior partners touch it'],
  ['Before the mandate', 'Pitch first, learn later', 'Deep research before we approach'],
  ['The strategy', 'A reused template', 'Built from your filings up'],
  ['Investor demand', 'React to inbound queries', 'Proactively create it'],
  ['Between results', 'Go quiet for a quarter', 'Monthly sector letters, always on'],
  ['In a crisis', "Go missing when it's hardest", 'Most present when it matters'],
  ['Investor access', 'Email lists and hope', 'Direct lines to MFs, FOs and PE'],
  ['Pricing', 'Priced off you', 'Priced to grow with you'],
];

/** Line by line comparison. Rows arrive in sequence; each Washuvi tick pops in after its row. */
export default function Difference() {
  return (
    <section id="difference" aria-labelledby="difference-title" className="relative overflow-hidden bg-bg py-20 lg:py-24">
      <div className="glow-bottom pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="mb-12 grid gap-4 lg:grid-cols-2 lg:items-end">
          <div className="grid gap-4">
            <p className="eyebrow text-accent">Difference</p>
            <h2 id="difference-title" className="heading-2 phone-heading-4">Most investor relations firms, and us, line by line.</h2>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-3xl border border-line bg-[rgba(19,18,9,0.7)] backdrop-blur-md">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comparison of a typical investor relations firm and Washuvi</caption>
            <thead className="max-md:sr-only">
              <tr className="border-b border-line">
                <th scope="col" className="caption-3 w-1/4 px-6 py-4 text-fg-3">Parameter</th>
                <th scope="col" className="caption-3 px-6 py-4 text-fg-3">A typical IR firm</th>
                <th scope="col" className="caption-3 px-6 py-4 text-accent">Washuvi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([param, them, us], i) => (
                <motion.tr key={param}
                  className="border-b border-line last:border-b-0 max-md:grid max-md:gap-2 max-md:p-4"
                  initial="hide" whileInView="show" viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease, delay: Math.min(i, 4) * 0.05 }}>
                  <th scope="row" className="title-4 px-6 py-4 align-top text-fg max-md:p-0">{param}</th>
                  <td className="body-6 px-6 py-4 align-top text-fg-3 max-md:p-0">
                    <span className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-fg-3" aria-hidden="true" /><span><span className="sr-only">A typical IR firm: </span>{them}</span></span>
                  </td>
                  <td className="body-5 px-6 py-4 align-top text-fg max-md:p-0">
                    <span className="flex gap-2">
                      <motion.span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent text-on-accent"
                        variants={{ hide: { scale: 0 }, show: { scale: 1 } }}
                        transition={{ duration: 0.5, ease, delay: 0.25 + Math.min(i, 4) * 0.05 }} aria-hidden="true">
                        <Check size={10} weight="bold" />
                      </motion.span>
                      <span><span className="sr-only">Washuvi: </span>{us}</span>
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
