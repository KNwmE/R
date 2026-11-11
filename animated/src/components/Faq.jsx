import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { ease, t } from '../lib/motion';

export const faqs = [
  ['Who do you work with?', "Listed SMEs, growing unlisted businesses and corporates in India's small and mid cap space that want their investor engagement to finally work."],
  ['How many companies do you take on at a time?', 'Eight to ten, at any time. Attention is what we sell, so we cap the roster and turn down more mandates than we accept.'],
  ['Who will actually handle our account?', 'Senior partners only. Junior staff do not run accounts at Washuvi.'],
  ['What services do you offer?', 'Three mandates: tailored investor relations, strategic advisory, and stock placement.'],
  ['Do you work with unlisted companies?', 'Yes. We handhold unlisted companies all the way to being ready to list, including IPO preparation and pre IPO placement.'],
  ['Which investors can you reach?', 'Mutual funds, family offices, PE desks and serious HNIs.'],
  ['What happens between results?', 'We stay on: monthly sector newsletters, management meetings, plant visits and ongoing perception management, so investors never go a quarter without hearing from you.'],
  ['What if we go through a difficult quarter?', 'Perception management and crisis support are part of every investor relations mandate. We aim to be most present when it is hardest.'],
  ['How does an engagement start?', 'We research your company before we approach you. Once mandated, we go deep into the business model, financials, your vision and the competitive landscape, then write the equity story.'],
  ['Where are you based?', '06, 9th Floor, NPX Urbtech, Sector 153, Noida 201304, Uttar Pradesh, India.'],
  ['How quickly will you reply to an enquiry?', 'Within one business day.'],
  ['Is anything on this site investment advice?', 'No. This site is for information only and is not investment advice. Opinions are offered in good faith.'],
];

function Item({ q, a, i, open, onToggle }) {
  const id = `faq-${i}`;
  return (
    <li className={`rounded-2xl border bg-card transition-colors duration-300 ${open ? 'border-ink-3' : 'border-paper-line hover:border-ink-3'}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={onToggle}
          className="title-3 flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-6 py-4 text-left">
          {q}
          <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-paper" aria-hidden="true">
            <span className="absolute h-0.5 w-3 rounded-full bg-ink" />
            <motion.span className="absolute h-0.5 w-3 rounded-full bg-ink" animate={{ rotate: open ? 0 : 90 }} transition={t.layout} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.2, ease } }} transition={t.layout}>
            <p className="body-6 max-w-2xl px-6 pb-6 text-ink-2">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="paper border-t border-paper-line bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="grid content-start gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-accent-paper">FAQ</p>
          <h2 id="faq-title" className="heading-2 phone-heading-4">Questions founders ask us first.</h2>
          <p className="body-3 text-ink-2">Something not covered here? Email <a className="text-accent-paper underline underline-offset-4" href="mailto:admin@washuvi.com">admin@washuvi.com</a> and we will reply within one business day.</p>
        </Reveal>
        <ul className="grid content-start gap-2">
          {faqs.map(([q, a], i) => <Item key={q} q={q} a={a} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
        </ul>
      </div>
    </section>
  );
}
