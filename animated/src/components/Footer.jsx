import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-deep py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="#top" className="flex min-h-11 items-center gap-2" aria-label="Washuvi, back to top"><Logo /><span className="title-3">Washuvi Financial Advisory LLP</span></a>
          <p className="heading-6 text-ink">Capital follows conviction. We create it.</p>
        </div>
        <p className="caption-5 max-w-3xl border-t border-line pt-6 text-ink-3">
          © {new Date().getFullYear()} Washuvi Financial Advisory LLP. For information only; not investment advice. Opinions offered in good faith.
          Washuvi Financial Advisory LLP accepts no liability for reliance on this material. Redistribution requires prior written consent.
        </p>
      </div>
    </footer>
  );
}
