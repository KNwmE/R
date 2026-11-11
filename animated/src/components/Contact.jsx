import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import BlurWords from './BlurWords';
import { t } from '../lib/motion';

const ACCESS_KEY = 'a5d57cc9-2856-4944-b503-a1768ce161ce'; // same Web3Forms key as the live site
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^\+?[0-9 ]{7,16}$/;
const rules = {
  name: [(v) => v.trim().length > 0, 'Enter your name.'],
  email: [(v) => emailRe.test(v.trim()), 'Enter an email address like name@company.com.'],
  phone: [(v) => v.trim() === '' || phoneRe.test(v.trim()), 'Use digits only, with an optional + and spaces.'],
};

function Field({ id, label, type = 'text', required, error, textarea, ...rest }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="caption-3 text-ink-3">{label}{required ? <span className="text-accent-paper"> *</span> : <span className="font-normal normal-case tracking-normal"> (optional)</span>}</label>
      <Tag id={id} name={id} type={textarea ? undefined : type} rows={textarea ? 3 : undefined} required={required}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        className={`min-h-11 w-full resize-none rounded-none border-0 border-b bg-transparent px-0 py-2 text-[16px] leading-6 text-ink outline-none transition-colors duration-300 placeholder:text-ink-3 focus:border-ink focus-visible:outline-none ${error ? 'border-[#B42318] focus:border-[#B42318]' : 'border-paper-line hover:border-ink-3'}`}
        {...rest} />
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t.color}
            className="caption-2 flex items-start gap-1 text-[#B42318]"><WarningCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const form = useRef(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ kind: 'idle' });

  const validate = (fd) => {
    const e = {};
    Object.entries(rules).forEach(([k, [ok, msg]]) => { if (!ok(String(fd.get(k) ?? ''))) e[k] = msg; });
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const fd = new FormData(form.current);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) { form.current.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus(); return; }
    setState({ kind: 'sending' });
    fd.append('access_key', ACCESS_KEY);
    fd.append('subject', 'New client enquiry from washuvi.com');
    fd.append('from_name', 'Washuvi Website');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) { setState({ kind: 'sent', name: String(fd.get('name')).trim() }); form.current.reset(); }
      else setState({ kind: 'error', msg: 'Your enquiry was not sent. Please try again, or email admin@washuvi.com.' });
    } catch {
      setState({ kind: 'error', msg: 'Your enquiry was not sent because the connection failed. Try again, or email admin@washuvi.com.' });
    }
  };

  const onBlur = (ev) => {
    const { name, value } = ev.target;
    if (!rules[name] || (value.trim() === '' && !errors[name])) return;
    setErrors((e) => { const n = { ...e }; if (rules[name][0](value)) delete n[name]; else n[name] = rules[name][1]; return n; });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="paper border-t border-paper-line bg-paper py-20 text-ink lg:py-24">
      <div className="mx-auto grid max-w-4xl gap-12 px-4 md:px-8">
        <div className="grid justify-items-center gap-4 text-center">
          <p className="eyebrow text-accent-paper">Enquire</p>
          <h2 id="contact-title" className="heading-3 phone-heading-5 max-w-2xl">
            <BlurWords text="Washuvi is always looking for founders worth backing. Tell us about your company." inView stagger={0.03} />
          </h2>
          <p className="body-6 text-ink-2">Listed SME, growing unlisted business, or corporate. We reply within one business day.</p>
        </div>

        <form ref={form} onSubmit={onSubmit} onBlur={onBlur} noValidate className="grid gap-8">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-8 md:grid-cols-2">
            <Field id="name" label="Name" required autoComplete="name" error={errors.name} />
            <Field id="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
            <Field id="email" label="Email" type="email" inputMode="email" required autoComplete="email" error={errors.email} />
            <Field id="company" label="Company" autoComplete="organization" />
          </div>
          <Field id="message" label="A few lines on your company" textarea />

          <div className="grid justify-items-center gap-4">
            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={state.kind === 'sending'} aria-busy={state.kind === 'sending'}
              className="btn-dark button-md group relative overflow-hidden px-6 disabled:cursor-not-allowed disabled:opacity-70">
              {state.kind === 'sending' ? 'Sending enquiry' : 'Send enquiry'}
              <ArrowRight size={20} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1" />
              {state.kind === 'sending' && (
                <motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-paper/70" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, repeat: Infinity, ease: t.layout.ease }} aria-hidden="true" />
              )}
            </motion.button>
            <div role="status" aria-live="polite" className="min-h-6">
              <AnimatePresence mode="wait">
                {state.kind === 'sent' && (
                  <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t.layout}
                    className="body-5 flex items-center gap-2 text-accent-paper"><CheckCircle size={20} aria-hidden="true" />Thank you, {state.name}. Your enquiry reached our team; we will reply within one business day.</motion.p>
                )}
                {state.kind === 'error' && (
                  <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t.layout}
                    className="body-5 flex items-center gap-2 text-[#B42318]"><WarningCircle size={20} aria-hidden="true" />{state.msg}</motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
