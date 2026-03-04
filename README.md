# SwingView — swingview.ai

AI-powered golf swing analysis. Professional video breakdown at your local range.

## Quick Start (Local Dev)

```bash
npm install
npm run dev
```

Site runs at `http://localhost:5173`

## Deploy to Cloudflare Pages

### Option A: Connect GitHub (recommended)

1. Push this repo to GitHub
2. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages**
3. Click **Connect to Git** and select your repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 (set in Environment Variables: `NODE_VERSION` = `18`)
5. Click **Save and Deploy**
6. Go to **Custom Domains** tab and add `swingview.ai`

### Option B: Direct Upload

1. Run `npm run build` locally
2. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages**
3. Click **Upload Assets**
4. Drag and drop the entire `dist/` folder
5. Add custom domain `swingview.ai`

## Setup Checklist

- [ ] Replace `YOUR_FORMSPREE_ID` in `src/App.jsx` with your actual Formspree form ID
- [ ] Update App Store / Google Play links when app is published
- [ ] Add your phone number and email to the footer
- [ ] Replace placeholder testimonials with real ones
- [ ] Set up Google Business Profile for local SEO
- [ ] Add Google Analytics or Cloudflare Web Analytics

## Tech Stack

- React 18
- Vite 5
- Cloudflare Pages
- Formspree (forms)

## Project Structure

```
swingview/
├── public/
│   ├── favicon.svg        # SV logo favicon
│   ├── robots.txt         # SEO
│   └── _redirects          # SPA routing
├── src/
│   ├── App.jsx            # Main website (all sections)
│   └── main.jsx           # Entry point + global styles
├── index.html             # HTML shell with SEO meta tags
├── package.json
├── vite.config.js
└── .gitignore
```
