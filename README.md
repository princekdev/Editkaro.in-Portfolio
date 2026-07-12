# Editkaro.in — Premium Portfolio Website

A modern, responsive, production-ready portfolio website for **Editkaro.in**, a video editing & social media marketing agency. Built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

## 🚀 Quick Start

No installation needed. This is a static site.

1. Download / clone this folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience (some browsers restrict certain APIs on `file://`):
   ```bash
   # Python
   python3 -m http.server 8000

   # Node
   npx serve .
   ```
3. Visit `http://localhost:8000`.

To deploy, upload the whole `Editkaro-Portfolio/` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel, S3, etc.) — there is nothing to build or compile.

## 📁 Folder Structure

```
Editkaro-Portfolio/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   ├── style.css          → tokens, layout, and all component styles
│   │   ├── responsive.css     → every @media breakpoint, mobile-first
│   │   └── animations.css     → @keyframes + scroll-reveal + ripple system
│   │
│   ├── js/
│   │   ├── main.js            → boot sequence, testimonials, contact form, back-to-top, toast
│   │   ├── filter.js          → portfolio dataset + rendering + category filter + live search
│   │   ├── lightbox.js        → video preview popup (ESC / click-outside / close button)
│   │   ├── animation.js       → loading screen, scroll-reveal, animated counters, ripple
│   │   └── navbar.js          → sticky navbar, active-link highlight, mobile menu, smooth scroll
│   │
│   ├── images/
│   │   ├── logo/               → brand logo files
│   │   ├── hero/                → hero section imagery
│   │   ├── thumbnails/          → one sub-folder per portfolio category
│   │   │   ├── short-form/
│   │   │   ├── long-form/
│   │   │   ├── gaming/
│   │   │   ├── football/
│   │   │   ├── ecommerce/
│   │   │   ├── documentary/
│   │   │   ├── color-grading/
│   │   │   ├── anime/
│   │   │   └── ads/
│   │   ├── icons/               → optional custom icon assets
│   │   └── backgrounds/         → decorative background textures
│   │
│   ├── videos/
│   │   ├── previews/            → optional local hover-preview clips
│   │   └── demo/                 → optional self-hosted showreels
│   │
│   └── fonts/                    → only needed if you self-host fonts instead of Google Fonts
│
├── README.md
├── LICENSE
└── favicon.ico
```

Each `assets/images/...` and `assets/videos/...` sub-folder ships with a short `README.md` explaining what belongs there — they're placeholders so the structure is ready to receive real agency assets.

## 🎬 Portfolio Content — How It Works

Real Editkaro client footage wasn't available while building this template, so every portfolio card currently embeds a distinct, real, publicly licensed Creative Commons short film (Blender Foundation open movies) as stand-in footage. This keeps the **filter, search, and video-lightbox functionality fully working end-to-end** without any fake or duplicated media — every card has a unique thumbnail and a unique video.

To replace a project with real client work, open `assets/js/filter.js` and edit the `PORTFOLIO_DATA` array:

```js
{ id:1, title:'Your Project Title', desc:'Short one-line description.',
  cat:'short-form', catLabel:'Short Form', time:'00:00:24',
  video:'YOUR_YOUTUBE_VIDEO_ID' }
```

- `cat` must match one of the filter button `data-filter` values in `index.html` (`short-form`, `long-form`, `gaming`, `football`, `ecommerce`, `documentary`, `color-grading`, `anime`, `ads`).
- `video` is the YouTube video ID (the part after `v=` in a YouTube URL). The thumbnail is pulled automatically from YouTube's CDN (`img.youtube.com/vi/<id>/hqdefault.jpg`).
- Add as many objects as you like — the grid, filters, and search all read from this one array, so nothing else needs to change.
- To use locally-hosted thumbnails instead of YouTube's CDN, drop an image into the matching `assets/images/thumbnails/<category>/` folder and swap the `src` in the render function inside `filter.js`.

## ✨ Features

- Sticky navbar with scroll-based active-section highlighting
- Mobile hamburger menu
- Animated hero with gradient blobs, floating chips, and a scrolling marquee
- Scroll-reveal animations across every section
- Animated statistics counters
- Portfolio grid with category filtering + live search (title & category), no page reload
- Video lightbox with ESC key, click-outside, and close-button support
- Auto-sliding testimonials carousel
- Client-side validated contact form with inline errors and a success state
- Back-to-top button, button ripple micro-interaction, and a toast notification system
- Fully responsive (desktop, laptop, tablet, mobile) with a dedicated `responsive.css`
- Semantic HTML, ARIA labels, visible focus states, `prefers-reduced-motion` support
- SEO: meta description, keywords, Open Graph tags, Twitter card, favicon, proper heading hierarchy

## 🎨 Design Tokens

Colors, fonts, spacing, and radii are defined as CSS custom properties at the top of `assets/css/style.css` (`:root { ... }`) — change them once and the whole site updates.

## 🛠 Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses standard, widely-supported APIs: `IntersectionObserver`, CSS custom properties, CSS Grid/Flexbox, and `<template>`-free vanilla DOM rendering.

## 📄 License

See [`LICENSE`](./LICENSE). The code is provided under the MIT License. The placeholder Creative Commons films used for demo video previews are © their respective creators (Blender Foundation / Blender Studio) and are **not** covered by this project's license — replace them with licensed or original client media before commercial use.
