# Sarthak Kulshrestha — Portfolio

A static, multi-page personal portfolio with a **HUD + neon-noir** theme (WayneTech / Arkham
influence): sharp interface panels, corner brackets, live readouts and an amber clearance
accent over a dark, rain-lit background with a bat-signal glow.

**Plain HTML / CSS / JS. No build step, no framework, no npm, no `node_modules`.**
Every page works by opening it directly (`file://`) and when served from the GitHub Pages
project subpath `https://sarthak044.github.io/my-portfolio/`. All asset and link paths are
relative, and every HTML file is flat at the repo root (no folders) so paths never change.

## Pages

```
index.html            Hub — hero + 6 section portals (brief, atmospheric)
about.html            About
experience.html       Experience — 5 roles, timeline
skills.html           Skills — 7 groups
certifications.html   Certifications — Security + DevOps & Cloud
education.html        Education — IIT Patna, JECRC University
contact.html          Contact — email, LinkedIn, GitHub, Medium, résumé
404.html              Themed "Signal Lost" page (GitHub Pages serves this for unknown URLs)

assets/css/style.css  One shared stylesheet for every page
assets/js/main.js     One shared script for every page
assets/img/favicon.svg   Angular "SK" system sigil
assets/img/og-image.png  1200x630 social share card
assets/sarthak-kulshrestha-resume.pdf   Downloadable résumé (phone-free)
.nojekyll             Tells GitHub Pages to serve the repo as-is (do not delete)
```

Every page shares the same HUD top bar, footer dock, ambient background layer, `<head>`
asset references, and per-page `<title>` / description / absolute canonical + `og:url`.
The active nav link is marked with `aria-current="page"`.

## Behaviour & accessibility

- Fully usable with JavaScript disabled. JS only adds: the HUD clock, the page-enter wipe,
  the mobile nav toggle, scroll reveals, heading "decode-in", and the hero typing effect.
- Below ~760px the HUD nav collapses to a hamburger. The closed menu is `inert` and out of
  the tab order; `Esc` closes it and returns focus to the toggle.
- `prefers-reduced-motion: reduce` disables the wipe, decode scramble, ambient animation,
  hover glitch, and reveal transforms — everything becomes static and instantly visible.
- Skip link, semantic landmarks, one `<h1>` per page, visible focus rings, AA body contrast.
- No phone number anywhere (no `tel:` link, not in the PDF). External links use
  `target="_blank" rel="noopener noreferrer"`.

## Local preview

Open any `.html` file in a browser, or run a static server from the repo root:

```
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repository to GitHub with the HTML files at the repo **root**
   (`git@github.com:Sarthak044/my-portfolio.git`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
5. The site publishes at `https://sarthak044.github.io/my-portfolio/`.

Notes:
- Keep `.nojekyll` at the root — it stops GitHub from running the content through Jekyll
  (which would otherwise skip files it doesn't recognize) and makes `404.html` work.
- Canonical / `og:url` values are already the final published URLs. If the repo or username
  changes, update those in each HTML file's `<head>`.
- Google Fonts (Chakra Petch, Inter, Share Tech Mono) load via `<link>`. There are no other
  external requests — no analytics, no trackers.
