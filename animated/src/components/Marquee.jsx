import { useReducedMotion } from 'framer-motion';

const names = ['V‑Marc (India) Ltd', 'Bharat Parenterals Ltd', 'Qualitek Labs Ltd', 'Logica Infoway Ltd', 'Sugs Lloyd Ltd', 'Paradeep Parivahan Ltd'];

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {names.map((n) => (
        <li key={n} className="title-3 flex items-center gap-3 whitespace-nowrap text-fg-2">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />{n}
        </li>
      ))}
    </ul>
  );
}

/** Current mandates. Pauses on hover; static under reduced motion. */
export default function Marquee() {
  const reduce = useReducedMotion();
  return (
    <div className="relative border-t border-line bg-black/40 py-6">
      <p className="sr-only">Current mandates</p>
      <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className={`flex ${reduce ? 'w-full flex-wrap justify-center gap-y-4 px-4' : 'w-max animate-marquee group-hover:[animation-play-state:paused]'}`}>
          <Row />
          {!reduce && <Row hidden />}
        </div>
      </div>
    </div>
  );
}
