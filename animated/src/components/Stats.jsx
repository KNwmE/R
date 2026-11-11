import Reveal from './Reveal';

const stats = [
  ['Combined desk experience', '50+ yrs'],
  ['Institutional equity research', '15+ yrs'],
  ['Companies at any time', '8 to 10'],
  ['Practising since', '2024'],
];

export default function Stats() {
  return (
    <section aria-label="Washuvi in numbers" className="pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-4">
          {stats.map(([label, value], i) => (
            <Reveal key={label} delay={i * 0.06} className="grid content-start gap-2 p-6 shadow-[inset_1px_0_0_var(--line),inset_0_1px_0_var(--line)]">
              <dt className="caption-2 text-ink-2">{label}</dt>
              <dd className="heading-4 tabular-nums">{value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
