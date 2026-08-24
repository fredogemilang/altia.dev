# 🏛️ ALTIA DEV — Engineering & Architecture Studio

<p align="center">
  <img src="https://raw.githubusercontent.com/fredogemilang/altia.dev/main/public/images/logo.png" alt="ALTIA DEV" width="120" onerror="this.style.display='none'"/>
</p>

<p align="center">
  <strong>Polyglot Engineering Studio & Software Architecture</strong><br>
  Modern, high-performance web flagship built with <em>Astro 5</em>, <em>React Islands</em>, <em>GSAP ScrollTrigger</em>, <em>Lenis Smooth Scroll</em>, and a self-hosted <em>B10cks CMS / Laravel</em> backend.
</p>

<p align="center">
  <a href="https://altiadev.com"><img src="https://img.shields.io/badge/Production-altiadev.com-E34234?style=flat-square&logo=cloudflare" alt="Production"/></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5.3-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro 5"/></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19"/></a>
  <a href="https://greensock.com/gsap/"><img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
</p>

---

## 🌟 Key Architectural Highlights

- ⚡ **Zero-Jank SSG Performance**: 100% Static Site Generation with instant sub-second page loads edge-cached worldwide on Cloudflare Pages.
- 🏝️ **Selective React Islands**: Interactive components (3D Globe, Wizard, Filters, Mega-menu) only hydrate when needed (`client:load`, `client:visible`).
- 🎨 **Warm Architectural Minimalism**: Bespoke aesthetic crafted with Ivory (`#FFF6E8`), Vermilion Red (`#E34234`), Charcoal (`#2F2A26`), and Terracotta (`#C46B4E`).
- 🌐 **First-Class Bilingual i18n**: Fully localized English (`/`) and Indonesian (`/id`) paths with shared type-safe dictionaries.
- 🧮 **Deterministic Project Cost Estimator**: 5-step wizard calculating real-time budget ranges, scope breakdown, and lead qualification scores.
- 📨 **Transactional Email Integration**: Brevo (Sendinblue) API with resilient local mock fallback during development.
- 💼 **Modular Self-Hosted Backend**: B10cks CMS (Laravel Core + MySQL) easily deployable to standard cPanel shared hosting without Docker dependencies.

---

## 📁 Project Structure

├── functions/api/               # Cloudflare Pages Edge Functions (TypeScript)
│   ├── contact.ts               # Brevo transactional email & mock handler
│   ├── health.ts                # Edge health check endpoint
│   └── estimator/
│       ├── estimate.ts          # Deterministic pricing engine endpoint
│       └── lead.ts              # Lead capture & scoring endpoint
├── src/
│   ├── components/             # Reusable UI, Layout, & Island components
│   │   ├── contact/            # Contact form island
│   │   ├── effects/            # GSAP animations, 3D WebGL globe, cursors
│   │   ├── estimator/          # 5-step interactive pricing wizard
│   │   ├── layout/             # Navbar, Footer, Mega-menu
│   │   ├── portfolio/          # Portfolio filters & showcase items
│   │   ├── pricing/            # Rate card & FAQ accordion
│   │   ├── sections/           # Modular page sections & case study heroes
│   │   └── ui/                 # Buttons, Badges, Cards, Containers
│   ├── data/                   # Structured static data & fallback records
│   ├── domain/estimator/       # Pricing engine algorithms & normalizers
│   ├── i18n/                   # Type-safe translations & hooks (useI18n)
│   ├── layouts/                # Base Astro layout (Lenis + GSAP sync)
│   ├── lib/                    # Utilities, B10cks API client, GSAP config
│   ├── messages/               # Bilingual dictionaries (en.json, id.json)
│   ├── pages/                  # Astro file-based routes & dynamic static paths
│   │   ├── index.astro         # Homepage (EN)
│   │   ├── about.astro         # About Studio (EN)
│   │   ├── blog/               # Blog feed & post detail [slug] (EN)
│   │   ├── contact.astro       # Contact page (EN)
│   │   ├── estimator.astro     # Cost Estimator (EN)
│   │   ├── portfolio/          # Portfolio list & case studies [slug] (EN)
│   │   ├── pricing.astro       # Pricing & Rate Card (EN)
│   │   ├── services.astro      # Services Deep Dive (EN)
│   │   └── id/                 # All counterpart routes localized for ID
│   └── styles/
│       └── globals.css         # Tailwind directives & design tokens
├── astro.config.mjs            # Astro configuration (React, Tailwind, Vite)
├── tailwind.config.ts          # Extended color palette & typography tokens
├── tsconfig.json               # TypeScript strict configuration
└── DEPLOYMENT.md               # Step-by-step production deployment guide
```

---

## 🛠️ Tech Stack & Libraries

### Frontend
- **Framework**: [Astro 5](https://astro.build/) (Static Site Generator)
- **Component Layer**: [React 19](https://react.dev/) (Interactive Islands)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Design Tokens
- **Smooth Scroll**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Animations**: [GSAP 3.12](https://greensock.com/gsap/) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/)
- **3D WebGL**: [COBE](https://github.com/shuding/cobe) (Interactive lightweight globe)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Self-Hosted)
- **CMS**: [B10cks CMS](https://github.com/b10cks/cms) (Laravel 11 core + Vue admin)
- **Database**: MySQL / MariaDB
- **Email Service**: Brevo (Sendinblue) REST API v3
- **Hosting**: cPanel Shared Hosting (`serv.altiadev.com`)

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fredogemilang/altia.dev.git
   cd altia.dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

4. **Build & Preview Static Production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📦 Deployment

Comprehensive instructions for deploying both the frontend and backend are available in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

### Quick Summary:
- **Frontend**: Connect repository to **Cloudflare Pages**, set framework to `Astro`, build command `npm run build`, and output dir `dist`.
- **Backend**: Upload `backend-cpanel/` assets to cPanel File Manager on subdomain `serv.altiadev.com`.

---

## 📄 License

Proprietary © 2026 [ALTIA DEV](https://altiadev.com). All rights reserved.
