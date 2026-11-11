# Washuvi animated version: sample notes

This folder is a **sample**: hero, numbers, tagline, approach, people and a contact band.
Built with React, Tailwind CSS and Framer Motion, the stack 21st.dev components use.
No 21st.dev components are inside yet: 21st.dev is blocked from the build session and
no API key was provided. Any 21st.dev component can be dropped in later.

## New colour pattern: graphite and champagne gold

| Token | Value | Use |
|---|---|---|
| Background | `#181818` | Page |
| Surface | `#1F1F1F` / `#272727` | Cards, alternate sections |
| Line | `#313131` | Borders and dividers |
| Deep | `#131209` | Footer |
| Text | `#F2EFE8` | Headings and body |
| Muted text | `#A9A49B` / `#8C877F` | Supporting copy, captions |
| Accent | `#C9A96E` (hover `#D8BC86`) | Primary button, active states, highlights |

Why: dark graphite with one restrained metallic accent reads as senior and private,
which suits an advisory firm that caps its roster. Gold is used sparingly (button,
markers, progress), so it keeps meaning "this matters". All dark backgrounds come
from the landing-page-design skill's allowed list; text and accent pairs pass 4.5:1.

## Motion that is actually beneficial

Each one does a job beyond decoration.

1. **Hero headline lines rise in (0.9s, once).** Gives the first screen a clear reading
   order: headline, then subheadline, then the button. It finishes in about 1.2s, so
   the button is usable almost immediately.
2. **Roster slots fill one by one (6 of 10).** This is the firm's core claim ("we cap at
   8 to 10") made visible. The animation *is* the proof, not an ornament.
3. **Tagline words light up as you scroll.** Slows the reader down on the single most
   important sentence. Words stay lit once read, so it never replays.
4. **Approach progress rail and step markers.** Shows where the reader is in a three
   step process and that the steps are sequential.
5. **Sections rise 32px and fade in, once.** Paces a long page so it doesn't arrive as
   one wall of text. Never replays on scroll up.
6. **Floating nav with a sliding "you are here" pill.** Orientation on a long page; the
   pill slides between links instead of jumping.
7. **Button feedback:** arrow nudges on hover, slight press on tap. Confirms the
   element is clickable and that the tap registered.
8. **Full height mobile menu with staggered links (60ms apart, 400ms max).** Easier to
   hit on a phone than a small dropdown; the stagger shows the order quickly.

Rules applied to all of them: one easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`),
only `transform` and `opacity` are animated, nothing below 200ms, and
`prefers-reduced-motion` turns movement off and keeps only fades.

## Motion deliberately left out

- **Count‑up numbers.** They show "0" first, which undercuts the proof they carry.
- **Parallax and floating background shapes.** Cost performance on phones, add nothing.
- **Cursor followers, magnetic buttons, 3D tilt cards.** Read as playful, not senior.
- **Autoplaying marquees of client names.** Hard to read, and moving text is an
  accessibility problem. The six names sit still in the roster card instead.
- **Page loaders and splash screens.** Delay the content for no reason.

## Still to add (the "details" step)

- Enquiry form with validation and loading, success and error states (from the static site)
- Benefits, comparison table, services, current work, FAQ sections
- Privacy, terms and 404 pages, meta and share tags, FAQ schema
- Optional: swap selected pieces for 21st.dev components once access is available
- Bundle trim: load Framer Motion features lazily (`LazyMotion`) to cut the JavaScript size

## Run it

```bash
npm install
npm run dev          # local preview with hot reload
npm run build        # production build in dist/
npm run build:single # one self contained HTML in dist-single/
```
