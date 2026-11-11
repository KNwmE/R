import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease, t } from '../lib/motion';
import { useActiveSection } from '../lib/useActiveSection';
import Logo from './Logo';

export const links = [
  { id: 'approach', label: 'Approach' },
  { id: 'difference', label: 'Difference' },
  { id: 'services', label: 'Services' },
  { id: 'people', label: 'People' },
  { id: 'work', label: 'Work' },
  { id: 'faq', label: 'FAQ' },
];
const ids = links.map((l) => l.id);
// 60ms per item, whole sequence capped at 400ms
const step = Math.min(0.06, 0.4 / Math.max(links.length - 1, 1));

export default function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const mq = window.matchMedia('(min-width: 1024px)'); const onMq = (e) => e.matches && setOpen(false); mq.addEventListener('change', onMq);
    return () => { window.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          aria-label="Primary"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t.layout, delay: 0.1 }}
          className="pointer-events-auto flex items-center gap-6 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(19,18,9,0.55)] py-1 pl-4 pr-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <a href="#top" className="flex min-h-11 items-center gap-2" aria-label="Washuvi, back to top">
            <Logo />
            <span className="title-3">Washuvi</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id} className="relative">
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" transition={t.layout} />
                )}
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`title-4 relative inline-flex min-h-10 items-center rounded-full px-3 py-2 transition-colors ${active === l.id ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <motion.a whileTap={{ scale: 0.98 }} href="#contact" className="btn-light button-sm min-h-10">Enquire</motion.a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="flex w-5 flex-col gap-1" aria-hidden="true">
                <motion.span className="block h-0.5 w-5 rounded-full bg-fg" animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={t.layout} />
                <motion.span className="block h-0.5 w-5 rounded-full bg-fg" animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }} transition={t.color} />
                <motion.span className="block h-0.5 w-5 rounded-full bg-fg" animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={t.layout} />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[rgba(0,0,0,0.94)] px-6 pb-8 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t.color}
          >
            <ol className="grid gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24, transition: { duration: 0.2, ease } }}
                  transition={{ ...t.layout, delay: i * step }}
                >
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className={`heading-4 flex min-h-11 items-baseline gap-4 py-3 ${active === l.id ? 'text-accent' : ''}`}>
                    <span className="caption-3 text-fg-3">0{i + 1}</span>{l.label}
                  </a>
                </motion.li>
              ))}
            </ol>
            <div className="grid gap-4">
              <a className="body-5 text-accent underline underline-offset-4" href="mailto:admin@washuvi.com">admin@washuvi.com</a>
              <a className="body-5 text-accent underline underline-offset-4" href="tel:+918796529416">+91 87965 29416</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
