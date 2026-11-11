(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Footer year ───────────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ── Mobile menu ───────────────────────────────────────── */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    // Stagger: 60ms per item, whole sequence capped at 400ms
    const items = menu.querySelectorAll('li');
    const step = Math.min(60, items.length > 1 ? 400 / (items.length - 1) : 60);
    items.forEach((li, i) => li.style.setProperty('--delay', `${Math.round(i * step)}ms`));

    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', (mq) => { if (mq.matches) setOpen(false); });
  }

  /* ── Current section in navigation ─────────────────────── */
  const navLinks = [...document.querySelectorAll('.nav-links a, .mobile-menu a.menu-link')];
  const sectionIds = [...new Set(navLinks.map((a) => a.getAttribute('href').slice(1)))];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const visible = new Map();
    const setCurrent = (id) => {
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
      const current = sections.find((s) => visible.get(s.id));
      setCurrent(current ? current.id : null);
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ── Scroll reveals: once per element ──────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── Tagline reveal (B11): word by word on scroll ──────── */
  const tagline = document.querySelector('[data-reveal-words]');
  if (tagline) {
    tagline.querySelectorAll('.line').forEach((line) => {
      const words = line.textContent.trim().split(/\s+/);
      line.textContent = '';
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = w;
        line.appendChild(span);
        if (i < words.length - 1) line.appendChild(document.createTextNode(' '));
      });
    });
    const words = [...tagline.querySelectorAll('.w')];

    if (reduceMotion.matches) {
      words.forEach((w) => w.classList.add('is-on'));
    } else {
      let ticking = false;
      let active = false;
      const update = () => {
        ticking = false;
        const trigger = window.innerHeight * 0.62; // the trigger line
        const rect = tagline.getBoundingClientRect();
        const progress = (trigger - rect.top) / Math.max(rect.height, 1);
        const count = Math.round(Math.min(Math.max(progress, 0), 1) * words.length * 1.15);
        // Words stay lit once revealed, so the moment never replays on scroll back up
        for (let i = 0; i < Math.min(count, words.length); i++) words[i].classList.add('is-on');
        if (count >= words.length) { active = false; window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); }
      };
      const onScroll = () => { if (active && !ticking) { ticking = true; requestAnimationFrame(update); } };
      // Only listen while the section is near the viewport
      const io = new IntersectionObserver((entries) => {
        active = entries[0].isIntersecting;
        if (active) onScroll();
      }, { rootMargin: '20% 0px 20% 0px' });
      io.observe(tagline);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
  }

  /* ── Image skeletons ───────────────────────────────────── */
  document.querySelectorAll('.person-photo img').forEach((img) => {
    const done = () => {
      img.classList.add('is-loaded');
      const sk = img.nextElementSibling;
      if (sk && sk.classList.contains('skeleton')) sk.classList.add('is-done');
    };
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ── Enquiry form ──────────────────────────────────────── */
  const form = document.getElementById('enquiry-form');
  if (form) {
    const status = document.getElementById('form-status');
    const btn = form.querySelector('[type="submit"]');
    const label = btn.querySelector('.btn-label');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRe = /^\+?[0-9 ]{7,16}$/;

    const rules = {
      fname: (v) => v.trim().length > 0,
      lname: (v) => v.trim().length > 0,
      email: (v) => emailRe.test(v.trim()),
      phone: (v) => v.trim() === '' || phoneRe.test(v.trim()),
    };

    const check = (input) => {
      const rule = rules[input.id];
      if (!rule) return true;
      const ok = rule(input.value);
      const field = input.closest('.field');
      field.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };

    Object.keys(rules).forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', () => { if (input.value.trim() !== '' || input.closest('.field').classList.contains('has-error')) check(input); });
      input.addEventListener('input', () => { if (input.closest('.field').classList.contains('has-error')) check(input); });
    });

    const showStatus = (type, html) => {
      status.className = `form-status body-5 is-${type}`;
      const icon = type === 'success' ? '#i-check-circle' : '#i-warn';
      status.innerHTML = `<svg class="icon" aria-hidden="true"><use href="${icon}"/></svg><span>${html}</span>`;
    };
    const clearStatus = () => { status.className = 'form-status body-5'; status.innerHTML = ''; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearStatus();

      const inputs = Object.keys(rules).map((id) => document.getElementById(id)).filter(Boolean);
      const invalid = inputs.filter((input) => !check(input));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      btn.disabled = true;
      btn.classList.add('is-loading');
      btn.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending enquiry';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success) {
          const name = document.getElementById('fname').value.trim();
          form.reset();
          form.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'));
          showStatus('success', `Thank you, ${escapeHtml(name)}. Your enquiry has reached our team, and we will reply within one business day.`);
        } else {
          showStatus('error', 'Your enquiry was not sent. Please try again, or email <a href="mailto:admin@washuvi.com">admin@washuvi.com</a>.');
        }
      } catch (_) {
        showStatus('error', 'Your enquiry was not sent because the connection failed. Check your connection and try again, or email <a href="mailto:admin@washuvi.com">admin@washuvi.com</a>.');
      } finally {
        btn.disabled = false;
        btn.classList.remove('is-loading');
        btn.removeAttribute('aria-busy');
        label.textContent = 'Send enquiry';
        status.scrollIntoView({ block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();
