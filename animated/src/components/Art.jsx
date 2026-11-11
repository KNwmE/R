import { motion, useReducedMotion } from 'framer-motion';

/** Abstract card artwork drawn in code (no stock images). Strokes follow the palette accent. */
export default function Art({ kind }) {
  const reduce = useReducedMotion();
  const spin = reduce ? {} : { animate: { rotate: 360 }, transition: { duration: 90, repeat: Infinity, ease: 'linear' } };
  return (
    <div className="glow relative h-full min-h-[16rem] overflow-hidden rounded-2xl">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {kind === 0 && (
          <motion.g style={{ originX: '200px', originY: '150px' }} {...spin}>
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse key={i} cx="200" cy="150" rx={30 + i * 18} ry={18 + i * 11} fill="none" stroke="var(--accent)" strokeOpacity={0.9 - i * 0.09} strokeWidth="1" transform={`rotate(${i * 9} 200 150)`} />
            ))}
            <circle cx="200" cy="150" r="6" fill="var(--accent)" />
          </motion.g>
        )}
        {kind === 1 && (
          <motion.g initial={reduce ? false : 'hide'} whileInView="show" viewport={{ once: true }}>
            <rect x="0" y="0" width="400" height="300" fill="transparent" />
            {Array.from({ length: 14 }, (_, i) => {
              const h = 24 + Math.pow(i, 1.35) * 7; // tallest bar stays inside the card
              return (
                <motion.rect key={i} x={40 + i * 23} width="12" rx="6" fill="var(--accent)" fillOpacity={0.35 + i * 0.045}
                  y={260 - h} height={h} style={{ originY: 1 }}
                  variants={{ hide: { scaleY: 0 }, show: { scaleY: 1 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }} />
              );
            })}
          </motion.g>
        )}
        {kind === 2 && (
          <g>
            {Array.from({ length: 48 }, (_, i) => {
              const a = (i / 48) * Math.PI * 2, r = 70 + (i % 4) * 22;
              const x = 200 + Math.cos(a) * r * 1.4, y = 150 + Math.sin(a) * r * 0.8;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2="200" y2="150" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" />
                  <circle cx={x} cy={y} r={2 + (i % 3)} fill="var(--accent)" fillOpacity="0.8" />
                </g>
              );
            })}
            <circle cx="200" cy="150" r="14" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="5" fill="var(--accent)" />
          </g>
        )}
      </svg>
    </div>
  );
}
