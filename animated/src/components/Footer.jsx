import { ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react';
import BlurWords from './BlurWords';
import Chrome from './LazyChrome';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="glow-bottom relative overflow-hidden pt-24">
      <div className="mx-auto grid max-w-6xl justify-items-center gap-6 px-4 text-center md:px-8">
        <p className="heading-1 phone-heading-4"><BlurWords text="Have questions? Let's talk." inView wordClass="text-hero" /></p>
        <a href="mailto:admin@washuvi.com" className="btn-outline button-sm"><EnvelopeSimple size={16} aria-hidden="true" />admin@washuvi.com</a>
      </div>
      <Chrome variant="small" className="mx-auto -my-8 h-80 w-full max-w-lg md:h-96" label="Chrome rings" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-12 md:grid-cols-4 md:px-8">
        <div className="grid content-start gap-4">
          <a href="#top" className="flex min-h-11 items-center gap-2" aria-label="Washuvi, back to top"><Logo /><span className="title-3">Washuvi</span></a>
          <p className="caption-2 text-fg-2">Capital follows conviction. We create it.</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2">
          <p className="caption-3 text-fg-3">Firm</p>
          {[['#position', 'Position'], ['#approach', 'Approach'], ['#difference', 'Difference'], ['#services', 'Services'], ['#people', 'People'], ['#work', 'Current work'], ['#faq', 'FAQ'], ['#contact', 'Enquire']].map(([h, l]) => (
            <a key={h} href={h} className="body-6 inline-flex min-h-8 items-center text-fg-2 transition-colors hover:text-fg">{l}</a>
          ))}
        </nav>
        <div className="grid content-start gap-2">
          <p className="caption-3 text-fg-3">Contact</p>
          <address className="body-6 text-fg-2">06, 9th Floor, NPX Urbtech, Sector 153, Noida 201304, Uttar Pradesh</address>
          <a href="tel:+918796529416" className="body-6 inline-flex min-h-8 items-center text-fg-2 hover:text-fg">+91 87965 29416</a>
          <a href="mailto:admin@washuvi.com" className="body-6 inline-flex min-h-8 items-center text-fg-2 hover:text-fg">admin@washuvi.com</a>
          <a href="mailto:shailesh@washuvi.com" className="body-6 inline-flex min-h-8 items-center text-fg-2 hover:text-fg">shailesh@washuvi.com</a>
        </div>
        <div className="grid content-start gap-2">
          <p className="caption-3 text-fg-3">Network</p>
          <a href="http://ir-india.com/" target="_blank" rel="noopener" className="body-6 inline-flex min-h-8 items-center gap-1 text-fg-2 hover:text-fg">IR Society of India<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
        </div>
        <p className="caption-5 border-t border-line pt-6 text-fg-3 md:col-span-4">
          © {new Date().getFullYear()} Washuvi Financial Advisory LLP. For information only; not investment advice. Opinions offered in good faith. Washuvi Financial Advisory LLP accepts no liability for reliance on this material. Redistribution requires prior written consent.
        </p>
      </div>
    </footer>
  );
}
