# Sreekara Rao — Interactive Resume Flipbook

A modern, interactive resume presented as a flipbook with 5 pages, AI-generated video introduction, and an intelligent chatbot. Built with vanilla HTML, CSS, and JavaScript — no framework, no build step, no external dependencies.

## ✨ Features

### 📄 5 Interactive Pages
- **Page 1:** About — Professional introduction with AI video presentation
- **Page 2:** Experience — Timeline of roles and key achievements
- **Page 3:** Skills — Technical expertise grouped by category
- **Page 4:** Projects — Featured work with descriptions and tech stacks
- **Page 5:** Credentials — Education and certifications

### 🎥 AI Video Introduction
- Web Speech API text-to-speech synthesis
- Synchronized animated captions
- Professional video player UI
- High-quality narration with natural pacing

### 💬 Intelligent Chatbot
- Floating chat widget (bottom-right)
- Keyword-based smart responses
- Covers: Databricks, Snowflake, experience, skills, projects, education, certifications
- No backend required — everything runs in the browser

### ⌨️ Navigation
- Previous / Next buttons on each page
- Keyboard support (← and → arrow keys)
- Page indicator (1/5, 2/5, etc.)
- Smooth page transitions
- Mobile-responsive design

### 🎨 Design
- Clean white theme with blue accents (#1e40af)
- Professional typography (Syne, Geist, JetBrains Mono)
- Responsive layout for all screen sizes
- Accessible semantic HTML and ARIA labels

## 🚀 Quick Start

### Option 1: Open Directly
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2: Run a Local Server
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

## 📦 Files

```
resume-flipbook-vanilla/
├── index.html       # Main HTML (5 pages, video intro, chat widget)
├── styles.css       # All styling (1000+ lines)
├── app.js          # Navigation, video, and chatbot logic
└── README.md       # This file
```

## 🛠️ Customization

### Edit Your Information
1. Open `index.html`
2. Update each page with your content:
   - Page 1: About section text and AI intro script
   - Page 2: Experience timeline
   - Page 3: Skills grid
   - Page 4: Projects cards
   - Page 5: Education and certifications

### Change the AI Introduction
Edit the `INTRO_SCRIPT` in `app.js` (line 7) to customize what the AI voice says about you.

### Update Chatbot Responses
Edit the `CHATBOT_RESPONSES` object in `app.js` (lines 19-31) to add or modify bot responses for different topics.

### Customize Colors
Edit CSS variables in `styles.css` (lines 1-18):
```css
--accent: #1e40af           /* Primary blue */
--accent-dark: #1e3a8a      /* Dark blue */
--bg-primary: #ffffff        /* White background */
--text-primary: #1a1a1a      /* Dark text */
```

## 🚢 Deploy

Since it's pure HTML/CSS/JS with no build step:

### GitHub Pages
1. Push to GitHub: `git push origin main`
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch
5. Your site is live at `https://username.github.io/resume-flipbook`

### Netlify
1. Drag and drop the folder into Netlify
2. Auto-deployed in seconds
3. Custom domain optional

### Any Static Host
- Upload files to any web host (Firebase, Vercel, AWS S3, etc.)
- No server-side code needed
- Works everywhere

## ✅ Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Stack

- **HTML5:** Semantic markup
- **CSS3:** Grid, Flexbox, animations, gradients
- **JavaScript (ES6+):** Vanilla (no libraries)
- **Web APIs:** Web Speech API, DOM APIs
- **Fonts:** Google Fonts (Syne, Geist, JetBrains Mono)

## 🎯 What You Get

✅ Fully functional, production-ready resume  
✅ Unique, interactive presentation  
✅ AI voice introduction (Web Speech API)  
✅ Intelligent chatbot (no backend)  
✅ Mobile-responsive design  
✅ SEO-friendly HTML  
✅ Fast (no build, no npm, instant load)  
✅ Easy to customize  
✅ Free to host (GitHub Pages, Netlify, etc.)  

## 📄 License

Open source. Use and modify freely.

---

**Built by:** Sreekara Rao  
**Email:** karanamsreekara273@gmail.com  
**Location:** Chandler, Arizona
