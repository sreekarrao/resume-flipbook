# Resume Flipbook (Vanilla HTML/CSS/JS)

A simple, lightweight resume flipbook with 5 pages. No build step, no framework — just vanilla HTML, CSS, and JavaScript.

## Features

✅ **5 Pages:**
- Page 1: About
- Page 2: Experience
- Page 3: Skills
- Page 4: Projects
- Page 5: Credentials

✅ **Navigation:**
- Previous / Next buttons
- Page indicator (e.g., "1 / 5")
- Arrow keys (← and →) for keyboard navigation
- Buttons disable at first/last page

✅ **Accessible:**
- Semantic HTML (`<button>`, `<section>`)
- ARIA labels for screen readers
- Focus indicators on buttons
- Keyboard support

✅ **Responsive:**
- Mobile-friendly layout
- Touch-friendly buttons
- Scales on all screen sizes

✅ **Styled:**
- Dark theme with accent colors
- Smooth page transitions
- Professional fonts (Fraunces, Hanken Grotesk, JetBrains Mono)

## Quick Start

1. **Open the file directly:**
   ```bash
   # On Windows
   start index.html
   
   # Or open in your browser:
   # File → Open → index.html
   ```

2. **Or run a local server:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

## File Structure

```
resume-flipbook-vanilla/
├── index.html       # HTML structure (5 placeholder pages)
├── styles.css       # Styling & layout
├── app.js          # Navigation logic
├── assets/         # Images folder
│   └── me.jpg      # Your headshot (add this)
└── README.md       # This file
```

## Add Your Photo

1. Place your headshot in the `assets/` folder
2. Name it `me.jpg` (or update the path in your HTML)
3. Reference it in Page 1

## Customize Content

Edit the `<section class="page">` blocks in `index.html` to add your actual resume content.

## Deploy

Since it's pure HTML/CSS/JS:
- **GitHub Pages:** Push to repo, enable Pages
- **Netlify:** Drag & drop the folder
- **Any static host:** Upload the files

No build step needed!
