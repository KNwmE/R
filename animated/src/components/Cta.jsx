import { motion } from 'framer-motion';
import { ArrowRight, EnvelopeSimple, Phone } from '@phosphor-icons/react';
import Reveal from './Reveal';

export default function Cta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-surface p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="grid gap-4">
            <p className="eyebrow">Enquire</p>
            <h2 id="contact-title" className="heading-2 phone-heading-4">Tell us about your company.</h2>
            <p className="body-3 max-w-xl text-ink-2">Listed SME, growing unlisted business, or a corporate that wants its investor engagement to finally work. We reply within one business day.</p>
          </div>
          <div className="grid gap-3 lg:justify-items-end">
            <motion.a whileTap={{ scale: 0.98 }} href="mailto:admin@washuvi.com?subject=Enquiry%20from%20washuvi.com" className="btn-gold button-md group w-full sm:w-auto">
              Tell us about your company
              <ArrowRight size={20} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1" />
            </motion.a>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a href="mailto:admin@washuvi.com" className="btn-ghost button-sm"><EnvelopeSimple size={16} aria-hidden="true" />admin@washuvi.com</a>
              <a href="tel:+918796529416" className="btn-ghost button-sm"><Phone size={16} aria-hidden="true" />+91 87965 29416</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
