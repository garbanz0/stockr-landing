# Stockr — Landing page

A single-page, mobile-first marketing site for Stockr. Static HTML/CSS/JS — no build step, no framework.

## Files

```
landing/
├── index.html         ← page markup, edit copy here
├── styles.css         ← brand tokens + responsive layout
├── script.js          ← sticky-nav shadow, single-open FAQ accordion, footer year
└── assets/
    ├── icon.png       ← Stockr app icon (real)
    └── screens/       ← real iPhone screenshots, used inside each phone mockup
```

## Local preview

From the project root:

```bash
python3 -m http.server 4173 --directory landing
# then open http://localhost:4173
```

## Adding your Waitlister embed

Inside `index.html`, find the block marked `BEGIN Waitlister embed` (it's inside the big blue card in the `#waitlist` section) and replace the placeholder with whatever Waitlister gives you — script tag, iframe, or HTML.

```html
<div id="waitlister-embed" class="embed-slot">
  <!-- BEGIN Waitlister embed -->
  <!-- Paste Waitlister's script/iframe HERE -->
  <!-- END Waitlister embed -->
</div>
```

The blue card around the embed handles all the surrounding design, so the embed can be plain. If Waitlister's form needs more room, the slot already grows with content.

## Deploying

Any static host works. Pick whichever is easiest:

- **Netlify Drop** — drag the `landing/` folder onto netlify.com/drop
- **Vercel** — `vercel deploy landing`
- **Cloudflare Pages** — connect repo, root directory `landing`
- **GitHub Pages** — push `landing/` to a repo, point Pages at it

Custom domain (e.g. `stockr.app`) — point the host's DNS at the deploy.

## What to edit when

- **Hero / sub-headline** — `index.html` near the top (`<section class="hero">`)
- **Features grid copy** — `<section id="features">`
- **Workflow rows** — `<section id="workflow">`, each row uses one screenshot
- **FAQ items** — `<section id="faq">`, each `<details>` is one Q/A
- **Footer links + contact** — bottom of `index.html`
- **Colors / fonts / spacing** — top of `styles.css`, all under `:root` CSS variables

## Replacing screenshots

To swap a screen, replace the file in `assets/screens/` (keep the same filename), or update the `<img src="...">` path in `index.html`. Screenshots should be portrait iPhone shots; the phone frame uses CSS `aspect-ratio: 9/19.5` so anything close to that ratio looks right.

## Tech notes

- Fonts: Inter + Inter Tight from Google Fonts (preconnected, woff2)
- No JS frameworks — total page weight is essentially HTML, CSS, fonts, and the screenshots
- Sticky nav uses `backdrop-filter` for the blurred-glass effect; falls back to a solid background where unsupported
- FAQ is built on native `<details>`/`<summary>` for zero-dependency accordion behaviour; `script.js` only adds single-open behaviour
- Accessibility: respects `prefers-reduced-motion`, all images have `alt`, focus-visible outlines on links/buttons/summaries

## Brand reference

Colors, type scale, and shape language all come from `../stockr-brand-pack.md`. The CSS variables in `styles.css` mirror those tokens directly — change them there if the brand evolves.
