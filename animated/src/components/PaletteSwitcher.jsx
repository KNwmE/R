import { motion } from 'framer-motion';
import { palettes, usePalette } from '../lib/palette';
import { t } from '../lib/motion';

/** Sample only: lets you compare the three colour directions. Remove before launch. */
export default function PaletteSwitcher() {
  const { name, set } = usePalette();
  return (
    <div role="radiogroup" aria-label="Colour direction (sample only)"
      className="fixed bottom-4 right-4 z-50 md:bottom-auto md:top-24 flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(0,0,0,0.7)] p-1 pl-3 backdrop-blur-xl">
      <span className="caption-5 mr-1 hidden text-fg-2 md:inline">Palette</span>
      {Object.entries(palettes).map(([key, p]) => (
        <button key={key} type="button" role="radio" aria-checked={name === key} onClick={() => set(key)}
          aria-label={p.label} className="relative flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full px-3 transition-colors hover:bg-white/10">
          {name === key && <motion.span layoutId="pal" className="absolute inset-0 rounded-full bg-white/10" transition={t.layout} />}
          <span className="relative size-3 rounded-full ring-1 ring-white/40" style={{ background: p.swatch }} aria-hidden="true" />
          <span className="caption-5 relative hidden text-fg md:inline">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
