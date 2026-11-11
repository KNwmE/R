# Washuvi animated version: notes (v3)

## v3: full content restored, v2 look kept

v2 copied the reference's look but cut too much of Washuvi's content. v3 keeps the v2
art (glow, chrome rings, light display type, stacked cards) and brings back everything
from the static site, in this order:

Hero (specific headline + proof line) · client names strip · Position (problem to
solution) · five benefits · tagline · proof cards · three step approach · comparison
table (9 rows) · three services with all five points · team with full bios · current
work with the live roster card · 12 FAQs · enquiry form with office details · footer.

### Motion added for the investor relations context

- **Rings captioned "Your company · Its investors"** so the 3D object says something.
- **Problem to solution card**: the problem, our answer and the end state arrive one after
  another, so the section reads as an argument, not a list.
- **Comparison table**: rows arrive in sequence and each Washuvi tick pops in after its row.
- **Live roster**: the 10 slot bar fills to 6, a softly pulsing "Live mandates" dot.
- **Approach rail** fills as you scroll and each step marker lights up as you reach it.
- **Benefit cards** lift slightly and their icon tile fills with the accent on hover.
- **Valuation bars** grow in the Strategic advisory card.
- **FAQ** answers fade in; one open at a time; full keyboard support.

---

# v2 notes

v2 follows the reference video the client shared: dark hero with a coloured glow and a
chrome 3D object, light oversized type that comes into focus, a statement that lights up
on scroll, a proof card grid, stacked service cards, a minimal contact form and a glowing
footer. The content is Washuvi's own, the 3D object is our own (two interlocking rings: a
company and its investors), and the electric blue of the reference is replaced.

v1 (graphite and gold, no 3D) is in git history.

Built with React, Tailwind CSS, Framer Motion and React Three Fiber (three.js).
No 21st.dev components: 21st.dev is blocked from the build session and no key was given.

## Colour directions (switch live with the "Palette" control, sample only)

| Palette | Glow core / edge | Accent on dark | Accent on light | Feel |
|---|---|---|---|---|
| **Emerald** (default) | `#0F6B4F` / `#073B2C` | `#8FD3B6` | `#0F6B4F` | Private banking, calm, trustworthy |
| **Oxblood** | `#7B2D26` / `#3A1210` | `#E7B2A6` | `#7B2D26` | Heritage: Washuvi's current brand colour |
| **Bronze** | `#7A5A22` / `#34260C` | `#DCC08A` | `#7A5A22` | Warm, established, premium |

Shared: black `#000000` base, `#131209` cards, ivory paper sections `#F5F3EE`, ink `#0B0B0A`.
Pick one and the switcher is removed.

## Motion that is actually beneficial

1. **Headline words come into focus (blur to sharp).** Sets the reading order on the first
   screen and finishes in about 1.5s; the button is usable immediately.
2. **Chrome rings that turn slowly and follow the pointer.** One memorable image that
   carries the idea (company and investors, linked). Pauses when off screen.
3. **Statement lights up word by word on scroll.** Slows the reader on the core promise.
   Words stay lit once read.
4. **Proof cards rise in one after another.** Each real number (8 to 10, 6, 50+, 15+) gets
   its own beat instead of a crowded row.
5. **Stacked service cards.** Each mandate gets the full screen for a moment, and the
   stack shows there are exactly three.
6. **Floating nav with a sliding "you are here" pill.** Orientation on a long page.
7. **Form feedback:** inline errors that animate in under the field, a sending bar on the
   button, a calm confirmation. Reduces failed or duplicate enquiries.

## Left out on purpose

- Count‑up numbers (show "0" first), parallax backgrounds, cursor followers, 3D tilt cards
- Smooth scroll hijacking (feels laggy on trackpads and breaks keyboard scrolling)
- Page loaders and splash screens

## Where v2 departs from the landing-page-design skill, and why

The client's reference wins where the two conflict (the skill says the user's prompt wins).

- **Background glows** (B4 says flat backgrounds): the glow is the reference's signature.
  Used only in the hero, card art and footer; content sections stay flat.
- **Light (300) weight display type**: the reference's elegance comes from it. Sizes stay on
  the Tailwind type scale.
- **Blur in the word reveal** (B7 says only transform and opacity): short, one time, and
  dropped under reduced motion.
- **Client names marquee** moves at a constant (linear) speed; it pauses on hover and is
  static under reduced motion.

## Performance

- three.js is split into its own file (about 243 KB gzipped) and loads after the page text
  (main bundle about 104 KB gzipped).
- The 3D only renders while on screen; pixel ratio is capped at 1.75.
- Reflections are made from built in light panels, so no HDR image is downloaded.

## Still to add (the "details" step)

- Comparison table, current work, FAQ (from the static site)
- Privacy, terms and 404 pages, meta and share tags, FAQ schema
- Remove the palette switcher once a colour is chosen

## Run it

```bash
npm install
npm run dev          # local preview with hot reload
npm run build        # production build in dist/
npm run build:single # one self contained HTML in dist-single/
```
