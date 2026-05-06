# Chakraborty Enterprise — Digital Service Centre Web Application

A high-performance, Progressive Web Application (PWA) for **Chakraborty Enterprise**, an authorised Common Service Centre (CSC) and Digital Banking Point serving Chhoto Jagulia and the wider North 24 Parganas district, West Bengal.

---

## Overview

This application provides citizens with a modern, mobile-first digital platform to learn about, enquire, and book appointments for government and banking digital services — including Aadhaar updates, PAN card applications, AEPS banking, scholarship assistance, and more.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Animation | Motion (Framer Motion) |
| PWA | vite-plugin-pwa |
| Icons | Lucide React |
| SEO | react-helmet-async |
| Runtime | Node.js 20+ |

---

## Project Structure

```
chakraborty-enterprise/
├── public/
│   ├── logo.png              # Brand logo (high-res)
│   ├── manifest.webmanifest  # PWA manifest (Android/iOS splash)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Layout.tsx        # Header, footer, mobile nav, theme toggle
│   │   ├── LoadingScreen.tsx # Splash/loading overlay
│   │   ├── Logo.tsx          # Reusable logo component
│   │   ├── SEO.tsx           # Page-level meta tags
│   │   ├── ReviewMarquee.tsx # Animated testimonial carousel
│   │   ├── WhatsAppButton.tsx
│   │   ├── PWAInstall.tsx
│   │   ├── Skeletons.tsx
│   │   └── DatePicker.tsx
│   ├── pages/
│   │   ├── Home.tsx          # Landing page (bento grid layout)
│   │   ├── Services.tsx      # Full service catalogue + booking
│   │   ├── Contact.tsx       # Contact form + map
│   │   ├── About.tsx         # About page
│   │   └── Legal.tsx         # Terms, Privacy Policy, Refund Policy
│   ├── hooks/
│   │   └── usePWA.ts         # PWA install prompt hook
│   ├── constants.tsx         # Business data, services, testimonials
│   ├── types.ts
│   ├── App.tsx               # Router, global effects
│   ├── main.tsx              # Entry point
│   └── index.css             # Design tokens, Tailwind theme
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v20 or higher
- npm v10 or higher

### Installation

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### GitHub Pages / Any Static Host

```bash
npm run build
# Upload the contents of /dist to your hosting provider
```

---

## PWA / Android

This application is a fully compliant Progressive Web App. On Android Chrome, users will receive an "Add to Home Screen" prompt. The splash screen uses the brand logo on a white background as configured in `public/manifest.webmanifest`.

To generate a signed Android APK from this PWA, use **PWABuilder** (pwabuilder.com) with the deployed URL.

---

## Environment Variables

Create a `.env` file in the root based on `.env.example`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

---

## Legal

© 2026 Chakraborty Enterprise. All Rights Reserved.  
Unauthorized copying, reproduction, or distribution of this software or its UI is strictly prohibited.

This project is proprietary software developed exclusively for Chakraborty Enterprise.
