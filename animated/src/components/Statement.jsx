import { useRef } from 'react';
import { cubicBezier, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Funnel, UserCircleCheck, Handshake } from '@phosphor-icons/react';

const curve = cubicBezier(0.22, 1, 0.36, 1);
// Tokens: plain words, or an inline icon chip.
const tokens = [
  'An', 'investor', 'relations', 'firm', 'that', 'takes', { icon: Funnel }, 'fewer', 'companies,',
  'puts', { icon: UserCircleCheck }, 'senior', 'partners', 'on', 'every', 'one,', 'and', 'builds', { icon: Handshake }, 'shareholders', 'who', 'stay.',
];

function Tok({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.22, 1], { ease: curve });
  return <motion.span style={{ opacity }} className="inline-block">{children}</motion.span>;
}

/** B11 tagline reveal: words go from muted to full as they cross the trigger line, and stay lit. */
export default function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const reached = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => { if (v > reached.get()) reached.set(v); });
  const n = tokens.length;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-24 text-center md:px-8 lg:pb-24 lg:pt-24">
      <p className="eyebrow mb-8 text-accent-paper">The whole strategy</p>
      <h2 ref={ref} className="heading-1 phone-heading-4 text-ink">
        {tokens.map((tok, i) => {
          const content = typeof tok === 'string'
            ? tok
            : <span className="mx-1 inline-grid size-12 translate-y-[-4px] place-items-center rounded-full bg-accent-paper align-middle text-paper max-md:size-8"><tok.icon size={24} weight="duotone" aria-hidden="true" /></span>;
          return (
            <span key={i}>
              {reduce ? content : <Tok progress={reached} range={[i / n, (i + 1) / n]}>{content}</Tok>}{i < n - 1 ? ' ' : ''}
            </span>
          );
        })}
      </h2>
    </div>
  );
}
