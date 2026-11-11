import { motion } from 'framer-motion';
import BlurWords from './BlurWords';
import { ease } from '../lib/motion';

const items = [
  ['Research first', "We don't pitch companies we haven't already researched. If we don't believe it, we don't call."],
  ['The equity story', 'A single, defensible growth narrative built from your filings up, not a deck of adjectives.'],
  ['Investor access', 'Direct lines to mutual funds, family offices, PE desks and serious HNIs. Concalls, meetings, plant visits.'],
  ['Always on', 'Monthly sector letters between results, and most present in a crisis, when it is hardest.'],
];

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="paper border-t border-paper-line bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <p className="eyebrow text-accent-paper">Approach</p>
          <div className="grid gap-6">
            <h2 id="approach-title" className="heading-2 phone-heading-4">
              <BlurWords text="Thoughtful work behind every mandate." inView stagger={0.05} />
            </h2>
            <a href="#services" className="btn button-sm justify-self-start border border-paper-line text-ink hover:bg-paper-2">See what we do</a>
          </div>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, body], i) => (
            <motion.li
              key={title}
              className="group grid content-start gap-8 bg-paper p-6 transition-colors duration-300 hover:bg-white"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <span className="caption-3 text-ink-3">0{i + 1}</span>
              <div className="grid gap-3">
                <h3 className="heading-5">{title}</h3>
                <p className="body-6 text-ink-2">{body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
