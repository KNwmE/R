import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { t } from '../lib/motion';
import shailesh from '../assets/images/shailesh-kumar.webp';
import diksha from '../assets/images/diksha-singh.webp';
import anand from '../assets/images/anand-ms.webp';

const people = [
  { name: 'Shailesh Kumar', role: 'Managing Partner · Research and IR', img: shailesh, edu: 'MBA (Finance) · University of Pune',
    bio: 'The brain behind Washuvi. About 15 years in institutional equity research across Fortune Finance, KR Choksey, Indsec and Sunidhi. A rated analyst with rare rapport among top mutual funds, family offices and buy side desks. Bottom up analysis, ground research, deep corporate contacts.' },
  { name: 'Diksha Singh', role: 'Research Analyst · Research and IR', img: diksha, edu: 'M.Sc Banking and Finance · QMUL, London',
    bio: 'An M.Sc in Banking and Finance from Queen Mary University of London. She brings a global lens to preliminary and deep dive research, and is the working link between the firm and its clients, reviewing business models, growth metrics and market positioning in deal evaluation.' },
  { name: 'Anand M.S.', role: 'Consultant · IR and PR', img: anand, edu: 'ICWAI · IIM Kozhikode · Certified IR Professional, London',
    bio: 'Cofounder of the Investor Relations Society of India and a genuine pioneer of the practice here. Built IR at Karvy Computershare (2008 to 2018) and served Avanti Feeds and Apollo Micro Systems. Over 20 years in strategy and financial journalism (Economic Times), and author of two landmark IR books for ICFAI.' },
];

export default function People() {
  return (
    <section id="people" aria-labelledby="people-title" className="paper bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="mb-12 grid gap-4 lg:grid-cols-2 lg:items-end">
          <div className="grid gap-4">
            <p className="eyebrow text-accent-paper">People</p>
            <h2 id="people-title" className="heading-2 phone-heading-4">The people who'll actually be in your meetings.</h2>
          </div>
          <p className="body-3 text-ink-2 lg:justify-self-end lg:text-right">Senior partners only. Nobody junior runs your account.</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {people.map((p, i) => (
            <Reveal as="article" key={p.name} delay={i * 0.08} className="group grid content-start gap-4 rounded-3xl border border-paper-line bg-white p-2">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
                <motion.img src={p.img} width="480" height="600" loading="lazy" alt={`Portrait of ${p.name}, ${p.role.split(' · ')[0]}`}
                  className="h-full w-full object-cover" whileHover={{ scale: 1.03 }} transition={t.layout} />
              </div>
              <div className="grid gap-2 px-4 pb-6 pt-2">
                <p className="caption-3 text-accent-paper">{p.role}</p>
                <h3 className="heading-5">{p.name}</h3>
                <p className="body-6 text-ink-2">{p.bio}</p>
                <p className="caption-5 mt-2 border-t border-paper-line pt-3 text-ink-3">{p.edu}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
