import { motion } from 'framer-motion';
import Reveal from './Reveal';
import BlurWords from './BlurWords';
import { ease } from '../lib/motion';

const rows = [
  ['The problem', 'A good company that the investors who move valuations have never heard explained properly.'],
  ['What we do', 'Make your company impossible to overlook for mutual funds, family offices, PE desks and serious HNIs, and keep them engaged through every phase of the cycle.'],
  ['The end state', 'A loyal, long term shareholder base, not a one quarter spike. We also handhold unlisted companies all the way to listing.'],
];
const chips = ['Equity research', 'Investor relations', 'Financial media', 'IPO readiness'];

/** Problem to solution. The rows "translate" in sequence: the problem dims as the answer arrives. */
export default function Position() {
  return (
    <section id="position" aria-labelledby="position-title" className="paper bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="grid content-start gap-6">
          <p className="eyebrow text-accent-paper">Position</p>
          <h2 id="position-title" className="heading-2 phone-heading-4">
            <BlurWords text="The market isn't ignoring your company. It was never handed a reason to care." inView stagger={0.04} />
          </h2>
          <Reveal className="grid gap-4 text-ink-2">
            <p className="body-3">Most small and mid cap businesses don't have a performance problem. They have a translation problem: a genuinely good company that the right investors have simply never heard articulated properly.</p>
            <p className="body-3">Washuvi was built by people who spent decades on the other side of that table, in institutional equity research, investor relations and financial journalism. Roughly <strong className="font-semibold text-ink">fifty years between us</strong>, spent deciding which companies were worth backing, and why.</p>
          </Reveal>
          <ul className="flex flex-wrap gap-2" aria-label="Where our experience comes from">
            {chips.map((c, i) => (
              <motion.li key={c} className="caption-2 rounded-full border border-paper-line bg-card px-3 py-1 text-ink-2"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.06 }}>{c}</motion.li>
            ))}
          </ul>
        </div>

        <ol className="relative grid content-start gap-2 rounded-3xl border border-paper-line bg-card p-2">
          {rows.map(([label, text], i) => (
            <motion.li key={label}
              className={`grid gap-2 rounded-2xl p-6 ${i === 0 ? 'bg-paper' : i === 1 ? 'bg-accent-strong text-white' : 'bg-ink text-paper'}`}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.18 }}>
              <span className={`caption-3 ${i === 0 ? 'text-ink-3' : 'text-white/70'}`}>0{i + 1} · {label}</span>
              <p className={`title-2 ${i === 0 ? 'text-ink-2' : ''}`}>{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
