import { motion } from 'framer-motion';
import { Coins, TrendUp, ShieldCheck, UsersThree, Handshake } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { ease } from '../lib/motion';

const items = [
  [Coins, 'Capital, before you need it', 'The right investors arrive ahead of your raise, so growth is never held up by a funding round that came too late.'],
  [TrendUp, 'A valuation that holds', 'A live, credible investor relations programme helps the market price your business on what it actually is, not on silence.'],
  [ShieldCheck, 'Resilience under fire', 'A managed investor base and honest, proactive perception management protect value exactly when the business is tested.'],
  [UsersThree, 'Owners, not tourists', 'Informed, engaged investors become long term holders. They dampen volatility and stand with you across the cycle.'],
  [Handshake, 'Institutional trust', 'Consistent, transparent communication earns the confidence of funds and family offices. It is the slow asset that compounds.'],
];

export default function Benefits() {
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="paper border-t border-paper-line bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="mb-12 grid gap-4 lg:grid-cols-2 lg:items-end">
          <div className="grid gap-4">
            <p className="eyebrow text-accent-paper">What conviction buys you</p>
            <h2 id="benefits-title" className="heading-2 phone-heading-4">What a well run investor programme actually gets you.</h2>
          </div>
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {items.map(([Icon, title, body], i) => (
            <motion.li key={title}
              className={`group grid content-start gap-6 rounded-3xl border border-paper-line bg-card p-6 transition-colors duration-300 hover:border-ink-3 ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}>
              <span className="grid size-12 place-items-center rounded-2xl bg-paper text-accent-paper transition-colors duration-300 group-hover:bg-accent-strong group-hover:text-white">
                <Icon size={24} weight="duotone" aria-hidden="true" className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="grid gap-2">
                <h3 className="heading-6">{title}</h3>
                <p className="body-6 text-ink-2">{body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
