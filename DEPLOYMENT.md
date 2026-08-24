# 🚀 Panduan Deployment ALTIA DEV

Dokumen ini berisi panduan langkah-demi-langkah untuk mendeploy **ALTIA DEV**:
- **Frontend + API**: Astro 5 SSG + Cloudflare Pages Functions (Domain: `altia.dev`)

---

## 📑 Daftar Isi
1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Deploy ke Cloudflare Pages](#2-deploy-ke-cloudflare-pages)
3. [Setup Brevo (Email Transaksional)](#3-setup-brevo-email-transaksional)
4. [Setup Telegram Bot (Lead Notification)](#4-setup-telegram-bot-lead-notification)
5. [Setup Cloudflare Web Analytics](#5-setup-cloudflare-web-analytics)
6. [Konfigurasi Environment Variables](#6-konfigurasi-environment-variables)
7. [Pengujian & Verifikasi](#7-pengujian--verifikasi)

---

## 1. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                      PENGUNJUNG WEB                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                          │
│                    (altia.dev)                               │
├──────────────────────────────────────────────────────────────┤
│ STATIC (dist/)              │  FUNCTIONS (functions/api/)    │
│ • Astro 5 SSG HTML          │  • POST /api/contact           │
│ • React Client Islands      │    → Brevo transactional email │
│ • GSAP & Lenis Animations   │  • POST /api/estimator/estimate│
│ • Interactive WebGL Globe    │    → Deterministic calc        │
│ • Edge CDN Global Caching   │  • POST /api/estimator/lead    │
│                              │    → Telegram notification     │
└──────────────────────────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
  ┌──────────────────┐          ┌──────────────────┐
  │   Brevo (Email)  │          │  Telegram Bot    │
  │   Contact form   │          │  Lead alerts     │
  │   notifications  │          │  to your phone   │
  └──────────────────┘          └──────────────────┘
```

---

## 2. Deploy ke Cloudflare Pages

### Langkah 1: Hubungkan Repository ke Cloudflare
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) & login.
2. Pada menu navigasi, pilih **Compute (Workers & Pages)** → **Pages**.
3. Klik **Connect to Git** → pilih akun GitHub Anda.
4. Pilih repository `fredogemilang/altia.dev` (branch `main`).

### Langkah 2: Konfigurasi Build Settings
Isi pengaturan build:
- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: `20` (atau lebih baru)

### Langkah 3: Tambahkan Environment Variables
Pada tab **Environment variables (Advanced)**, tambahkan semua variabel yang tercantum di [Bagian 6](#6-konfigurasi-environment-variables).

### Langkah 4: Simpan & Deploy
Klik **Save and Deploy**. Cloudflare Pages akan menjalankan build dan memberikan live URL (misal: `altia-dev.pages.dev`).

### Langkah 5: Custom Domain
1. Di tab **Custom domains** pada project Pages, klik **Set up a custom domain**.
2. Masukkan `altia.dev` dan `www.altia.dev`.
3. Cloudflare akan otomatis mengkonfigurasi DNS dan SSL Certificate.

---

## 3. Setup Brevo (Email Transaksional)

Brevo digunakan untuk mengirimkan email notifikasi saat visitor mengirim pesan melalui Contact Form.

### Langkah 1: Buat Akun Brevo
1. Buka [brevo.com](https://www.brevo.com/) dan daftar akun gratis.
2. Free plan cukup (300 email/hari).

### Langkah 2: Verifikasi Domain Pengirim
1. Login Brevo → **Settings** → **Senders, Domains & Dedicated IPs**.
2. Klik **Add a sender** → masukkan:
   - **From name**: `ALTIA DEV Website`
   - **From email**: `hello@altia.dev`
3. Brevo akan mengirim email verifikasi. Klik link di email tersebut.
4. *(Opsional tapi recommended)* Klik **Add a domain** → tambahkan `altia.dev` dan ikuti instruksi DNS records (DKIM/SPF) untuk deliverability terbaik.

### Langkah 3: Generate API Key
1. Buka **Settings** → **SMTP & API** → **API Keys**.
2. Klik **Generate a new API key**.
3. Copy API key (format: `xkeysib-xxxxxxxxxxxx`).
4. Simpan sebagai environment variable `BREVO_API_KEY` di Cloudflare Pages.

### Langkah 4: Test
Setelah deploy, buka halaman `/contact` → kirim pesan uji coba → cek inbox email tujuan.

---

## 4. Setup Telegram Bot (Lead Notification)

Telegram Bot digunakan untuk mengirimkan notifikasi real-time ke HP Anda setiap ada lead baru dari Project Estimator.

### Langkah 1: Buat Bot di Telegram
1. Buka Telegram, cari **@BotFather**.
2. Kirim `/newbot`.
3. Ikuti instruksi:
   - **Name**: `ALTIA DEV Leads` (nama tampilan)
   - **Username**: `altiadev_leads_bot` (harus unik, akhiri `_bot`)
4. BotFather akan memberikan **Bot Token** (format: `123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`).
5. Simpan token ini sebagai environment variable `TELEGRAM_BOT_TOKEN`.

### Langkah 2: Dapatkan Chat ID
**Untuk notifikasi ke diri sendiri:**
1. Buka bot Anda di Telegram dan klik **Start**.
2. Kirim pesan apa saja ke bot.
3. Buka browser dan akses:
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Cari `"chat":{"id":123456789}` → angka `123456789` adalah Chat ID Anda.

**Untuk notifikasi ke grup:**
1. Buat grup Telegram → tambahkan bot ke grup.
2. Kirim pesan apa saja di grup.
3. Akses `getUpdates` URL di atas → Chat ID grup biasanya negatif (contoh: `-987654321`).

5. Simpan sebagai environment variable `TELEGRAM_CHAT_ID`.

### Langkah 3: Test
Setelah deploy, jalankan Project Estimator → isi form → submit → cek Telegram.

**Contoh notifikasi yang akan diterima:**
```
🔥 New Lead — HOT (Score: 80/100)

👤 John Doe
📧 john@example.com
📱 +62 821 4770 9084
🏢 PT Example Corp

🔧 Service: web
📋 Scope: mvp
💰 Estimate: $3,000 – $8,000
⏱ Timeline: 6 weeks
🌐 Locale: EN

🆔 lead_1724500000_abc123
```

---

## 5. Setup Cloudflare Web Analytics

Cloudflare Web Analytics adalah solusi analytics **gratis**, **privacy-friendly**, dan **zero JavaScript overhead** (tidak menambah bundle size).

### Langkah 1: Enable Web Analytics
1. Login [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Pilih domain `altia.dev` di sidebar.
3. Klik **Analytics & Logs** → **Web Analytics**.
4. Klik **Enable Web Analytics**.
5. Pilih metode: **Automatic setup** (recommended untuk Cloudflare Pages).

### Langkah 2: Verify
Setelah enable, Cloudflare akan otomatis menambahkan beacon. Buka situs web → refresh beberapa kali → kembali ke dashboard Analytics dalam 5-10 menit untuk melihat data.

### Data yang Tersedia (Gratis)
- Total visits & page views
- Top pages
- Top referrers
- Countries & browsers
- Core Web Vitals (LCP, FID, CLS)
- Performance metrics

> **Note:** Tidak perlu menambahkan kode apapun ke website. Cloudflare menangani semuanya di edge level.

---

## 6. Konfigurasi Environment Variables

Tambahkan variabel berikut di **Cloudflare Pages** → **Settings** → **Environment Variables**:

### Production Environment Variables

| Variable | Value | Type | Keterangan |
|----------|-------|------|------------|
| `NODE_VERSION` | `20` | Plain text | Node.js runtime build |
| `BREVO_API_KEY` | `xkeysib-xxxxx` | **🔒 Encrypt** | API key dari [Brevo](#3-setup-brevo-email-transaksional) |
| `BREVO_SENDER_EMAIL` | `hello@altia.dev` | Plain text | Email pengirim (harus terverifikasi di Brevo) |
| `BREVO_SENDER_NAME` | `ALTIA DEV Website` | Plain text | Nama pengirim yang tampil di email |
| `CONTACT_RECEIVER_EMAIL` | `hello@altia.dev` | Plain text | Email tujuan penerima inquiry |
| `TELEGRAM_BOT_TOKEN` | `123456789:ABCdef...` | **🔒 Encrypt** | Bot token dari [BotFather](#langkah-1-buat-bot-di-telegram) |
| `TELEGRAM_CHAT_ID` | `123456789` | Plain text | Chat ID dari [Langkah 2](#langkah-2-dapatkan-chat-id) |

> **⚠️ PENTING:** Untuk variabel bertipe **🔒 Encrypt**, pilih tombol **"Encrypt"** saat menambahkan di Cloudflare Pages. Value yang sudah di-encrypt tidak bisa dilihat lagi setelah disimpan, jadi pastikan Anda menyimpan backup di tempat aman (password manager).

### Local Development (.env.local)
```ini
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=hello@altia.dev
BREVO_SENDER_NAME=ALTIA DEV
CONTACT_RECEIVER_EMAIL=hello@altia.dev
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

---

## 7. Pengujian & Verifikasi

Setelah deployment selesai:

### Frontend
- [ ] Buka `https://altia.dev` → pastikan halaman load dengan benar.
- [ ] Navigasi semua halaman: Home, Services, Portfolio, Pricing, About, Blog, Contact, Estimator.
- [ ] Toggle bahasa EN (`/`) dan ID (`/id/`) → pastikan berfungsi.
- [ ] Animasi GSAP, Lenis Smooth Scroll, dan 3D Globe berjalan 60 FPS.
- [ ] Buka halaman 404 (misal `/nonexistent`) → pastikan custom 404 muncul.

### Contact Form
- [ ] Buka `/contact` → isi dan kirim pesan uji coba.
- [ ] Cek inbox email tujuan (harus ada email dari Brevo).

### Project Estimator
- [ ] Buka `/estimator` → jalankan wizard 5 langkah.
- [ ] Isi form lead → submit.
- [ ] Cek Telegram bot → harus ada notifikasi lead baru.

### SEO & Social
- [ ] Share URL di WhatsApp/Twitter → pastikan OG image muncul.
- [ ] Cek `https://altia.dev/sitemap-index.xml` → pastikan sitemap valid.
- [ ] View source → pastikan canonical + hreflang tags ada.

### Legal
- [ ] Buka `/privacy` dan `/terms` → pastikan konten tampil.
- [ ] Cek footer → pastikan link Privacy Policy dan Terms of Service ada.

### Analytics
- [ ] Buka Cloudflare Dashboard → Web Analytics → pastikan data mulai masuk.
