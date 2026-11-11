# Washuvi landing page

A static redesign of www.washuvi.com. The site is plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page |
| `privacy.html`, `terms.html` | Legal pages (drafts, marked for legal review) |
| `404.html` | Branded "page not found" page |
| `assets/css/styles.css` | All styles: design tokens, text styles, components |
| `assets/js/main.js` | Menu, current section in nav, scroll reveals, tagline reveal, form validation and submission |
| `assets/fonts/` | Self hosted Manrope (variable, SIL Open Font License) |
| `assets/images/` | Team photos (WebP), `og-image.png` (social share), `apple-touch-icon.png` |
| `favicon.svg`, `robots.txt`, `sitemap.xml` | Site basics |

## Enquiry form

The form posts to Web3Forms using the access key that is on the current live site, so enquiries keep arriving in the same inbox. To change where they go, replace the `access_key` value in `index.html` with a key from web3forms.com.

## Preview locally

```bash
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000. The legal and 404 pages use root paths (`/assets/...`), so preview them through a server, not by opening the file directly.

## Deploy

Any static host works. Upload the contents of `site/` as the site root.

**Netlify (simplest):** drag the `site` folder onto app.netlify.com/drop, then add `www.washuvi.com` under Domain settings. Netlify serves `404.html` automatically.

**Vercel:** import the repository, set the root directory to `site`, framework preset "Other", no build command.

**GitHub Pages:** publish the `site` folder (for example with an Actions workflow that uploads `site/` as the Pages artifact), then add the custom domain in the repository's Pages settings.

**Existing host (cPanel, S3, etc.):** replace the current files with the contents of `site/`. Set `404.html` as the error document.

After deploying, update DNS for `www.washuvi.com` only if you change hosts. Then check that the form delivers a test enquiry.
