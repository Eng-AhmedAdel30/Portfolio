# Ahmed Adel: Portfolio

A static portfolio site (HTML, CSS, vanilla JavaScript) for a BI / Data Analyst / Junior Data Engineer profile. No build step, no dependencies.

## Features
Responsive layout, sticky nav with active-section highlight, mobile menu, dark/light toggle (saved in the browser), project filter, scroll reveals, back-to-top, mailto contact form, SEO and Open Graph metadata.

## Structure
```text
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── Ahmed_Adel-BI.pdf   (resume download)
│   ├── images/             (project screenshots)
│   └── icons/favicon.svg
└── README.md
```

## Run locally
Open `index.html` in a browser.

## Customize
All text lives in `index.html`. Colors and fonts are CSS variables at the top of `css/style.css`.

## Replace project images
Each project card has a `<div class="shot">` placeholder. Save one screenshot per project in `assets/images/` (e.g. `restaurant-analytics.png`) and replace the placeholder's `<span>` with:
```html
<img src="assets/images/restaurant-analytics.png" alt="Restaurant analytics dashboard">
```
Also update each card's "View on GitHub" link to the exact repository URL.

## Deploy on GitHub Pages
Push the folder to a repository, then Settings → Pages → deploy from the `main` branch, root folder.

## Credits
No external libraries, fonts or images. Fonts are the visitor's system fonts.
