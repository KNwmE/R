import { useRef } from 'react';
import { cubicBezier, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const lines = ['We turn down more mandates', 'than we accept. Attention is', 'the only thing we sell, and', "it doesn't divide well."];
const curve = cubicBezier(0.22, 1, 0.36, 1);

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.3, 1], { ease: curve });
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** B11: each word goes from 30% to full as it crosses the trigger line. Lit words stay lit. */
export default function Tagline() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const reached = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => { if (v > reached.get()) reached.set(v); });

  const words = lines.flatMap((l, li) => l.split(' ').map((w, wi) => ({ w, key: `${li}-${wi}`, line: li })));
  const n = words.length;

  return (
    <section aria-label="Our strategy in one line" className="bg-surface py-24 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:py-12">
        <p className="eyebrow">The whole strategy, in one line</p>
        <p ref={ref} className="heading-2 phone-heading-4 mt-6 max-w-4xl">
          {lines.map((line, li) => (
            <span key={line} className="md:block">
              {words.filter((x) => x.line === li).map((x) => {
                const i = words.indexOf(x);
                return (
                  <span key={x.key}>
                    {reduce ? x.w : <Word progress={reached} range={[i / n, (i + 1) / n]}>{x.w}</Word>}{' '}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <p className="body-3 mt-8 max-w-xl text-ink-2">
          Every investor relations firm wants more logos. We want fewer, because a capped roster is the only way senior partners stay on every account.
        </p>
      </div>
    </section>
  );
}
