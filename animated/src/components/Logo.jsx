export default function Logo({ className = '' }) {
  return (
    <span className={`grid size-8 place-items-center rounded-full bg-gold text-on-gold ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5,3.5 4.5,12.5 8,5.5 11.5,12.5 14.5,3.5" />
      </svg>
    </span>
  );
}
