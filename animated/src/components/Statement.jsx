import { useRef } from 'react';
import { cubicBezier, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const curve = cubicBezier(0.22, 1, 0.36, 1);

function Tok({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.22, 1], { ease: curve });
  return <motion.span style={{ opacity }} className="inline-block">{children}</motion.span>;
}

/**
 * B11 tagline reveal: words go from muted to full as they cross the trigger line, and stay lit.
 * tokens: strings, or { icon: Component } for an inline icon chip.
 */
export default function Statement({ tokens, eyebrow, note, tone = 'paper', align = 'center' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const reached = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => { if (v > reached.get()) reached.set(v); });
  const n = tokens.length;
  const dark = tone === 'dark';

  return (
    <div className={`mx-auto max-w-5xl px-4 py-24 md:px-8 lg:py-24 ${align === 'center' ? 'text-center' : ''}`}>
      <p className={`eyebrow mb-8 ${dark ? 'text-accent' : 'text-accent-paper'}`}>{eyebrow}</p>
      <h2 ref={ref} className={`heading-1 phone-heading-4 ${dark ? 'text-fg' : 'text-ink'}`}>
        {tokens.map((tok, i) => {
          const content = typeof tok === 'string'
            ? tok
            : <span className={`mx-1 inline-grid size-12 translate-y-[-4px] place-items-center rounded-full align-middle max-md:size-8 ${dark ? 'bg-accent text-on-accent' : 'bg-accent-paper text-paper'}`}><tok.icon size={24} weight="duotone" aria-hidden="true" /></span>;
          return (
            <span key={i}>
              {reduce ? content : <Tok progress={reached} range={[i / n, (i + 1) / n]}>{content}</Tok>}{i < n - 1 ? ' ' : ''}
            </span>
          );
        })}
      </h2>
      {note && <p className={`body-3 mx-auto mt-8 max-w-xl ${dark ? 'text-fg-2' : 'text-ink-2'}`}>{note}</p>}
    </div>
  );
}
