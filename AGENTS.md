# altia.dev — konteks untuk agen

Situs utama ALTIA DEV. Astro 5 SSG + React 19, Tailwind, sitemap, blog
(`docs/blog`), GSAP/Lenis, mermaid. Backend ringan via **Cloudflare Pages
Functions** di `functions/` (form/email lewat Brevo). Produksi: `https://altia.dev`
di Cloudflare Pages — **bukan** dari VPS ini.

## Perintah

| Tujuan | Perintah |
|---|---|
| Install deps | `npm ci` |
| Dev server | `npm run dev` (port 4321) |
| Type/content check | `npm run check` |
| Build | `npm run build` → `dist/` |

## Struktur

- `src/` — halaman, komponen, layout
- `docs/blog/` — artikel blog (ID + EN), lihat pola penamaan artikel yang ada
- `functions/` — Cloudflare Pages Functions (API)
- `scripts/` — utilitas build/konten
- `DEPLOYMENT.md` — panduan deploy & setup Brevo. Baca sebelum menyentuh `functions/`.

## Lingkungan

### VPS (altiadev)
- Path: `/home/dev/workspace/altia.dev`
- `.env` ada dan di-gitignore — jangan dibaca ke chat. Functions butuh secret
  yang hanya ada di Cloudflare; di VPS hanya bisa build/preview statis.
- Tidak ada subdomain preview di Caddy untuk proyek ini.

### Laptop (Windows, Laragon)
- Path: `C:\laragon\www\altia.dev` (perkiraan — sesuaikan)

## Git

- Remote: `origin` = github.com/fredogemilang/altia.dev, branch `main`.
- Push ke `main` = **deploy otomatis ke produksi** oleh Cloudflare Pages.
  Karena itu: pekerjaan dari VPS masuk lewat branch `hermes/<tugas>` + PR,
  kecuali Fredo eksplisit minta langsung ke `main`.
- Protokol pull/push: `/home/dev/workspace/AGENTS.md`.

## Konvensi

- Artikel blog selalu berpasangan ID/EN dengan nomor urut (`005-...`).
- `npm run check` dan `npm run build` harus hijau sebelum push.
