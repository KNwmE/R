import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check } from '@phosphor-icons/react';
import Art from './Art';
import BlurWords from './BlurWords';

const services = [
  { title: 'Investor relations, tailored', body: 'The whole investor engagement programme, assembled around your sector, your stage and your story.',
    points: ['Bespoke investor communication strategy', 'Quarterly presentations and earnings concalls', 'Management meetings and plant visits', 'Perception management and crisis support'] },
  { title: 'Strategic advisory', body: 'Aligning your business narrative with capital market expectations, and building the credibility that commands a premium.',
    points: ['Equity story and growth narrative', 'Valuation enhancement strategy', 'Capital structure advisory', 'IPO preparation and listing readiness'] },
  { title: 'Stock placement', body: 'Our network, put to work: placing equity with credible, long term investors at the right valuation.',
    points: ['Access to marquee institutional investors', 'Pre IPO placement for unlisted companies', 'Building a long term shareholder base', 'Reach across MF, FO, PE and HNI networks'] },
];

function Card({ s, i, progress, total }) {
  // Each card shrinks slightly as the next one slides over it.
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04]);
  return (
    <div className="sticky top-24 h-[min(36rem,calc(100svh-8rem))]" style={{ paddingTop: `${i * 16}px` }}>
      <motion.article style={{ scale }} className="grid h-full origin-top gap-6 rounded-3xl border border-line bg-surface p-2 shadow-[0_-24px_64px_rgba(0,0,0,0.5)] md:grid-cols-2">
        <div className="grid content-between gap-6 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <span className="caption-3 text-fg-3">0{i + 1} / 0{total}</span>
            <a href="#contact" className="btn-outline button-sm min-h-10">Enquire <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="grid gap-4">
            <h3 className="heading-3 phone-heading-5">{s.title}</h3>
            <p className="body-6 text-fg-2">{s.body}</p>
            <ul className="grid gap-2 border-t border-line pt-4">
              {s.points.map((p) => <li key={p} className="body-6 flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{p}</li>)}
            </ul>
          </div>
        </div>
        <div className="hidden md:block"><Art kind={i} /></div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="services" aria-labelledby="services-title" className="bg-bg py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-12 grid justify-items-center gap-4 text-center">
          <p className="eyebrow text-accent">What we do</p>
          <h2 id="services-title" className="heading-1 phone-heading-4"><BlurWords text="Three mandates." inView wordClass="text-hero" /></h2>
          <p className="body-3 max-w-md text-fg-2">Each one built around a single company.</p>
        </div>
        <div ref={ref} className="grid gap-12">
          {services.map((s, i) => <Card key={s.title} s={s} i={i} total={services.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
