# 🚀 Panduan Deployment ALTIA DEV

Dokumen ini berisi panduan langkah-demi-langkah untuk mendeploy arsitektur **ALTIA DEV**:
- **Frontend**: Astro 5 + React Islands di **Cloudflare Pages** (Domain: `altiadev.com` / `altia.dev`)
- **Backend**: B10cks CMS & Custom Laravel Controllers di **cPanel Shared Hosting** (Domain: `serv.altiadev.com`)

---

## 📑 Daftar Isi
1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Deploy Frontend ke Cloudflare Pages](#2-deploy-frontend-ke-cloudflare-pages)
3. [Deploy Backend ke cPanel Shared Hosting](#3-deploy-backend-ke-cpanel-shared-hosting)
4. [Konfigurasi Environment Variables](#4-konfigurasi-environment-variables)
5. [Pengujian & Verifikasi](#5-pengujian--verifikasi)

---

## 1. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                      PENGUNJUNG WEB                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│       Cloudflare Pages       │       │    cPanel Shared Hosting     │
│       (altiadev.com)         │       │     (serv.altiadev.com)      │
├──────────────────────────────┤       ├──────────────────────────────┤
│ • Astro 5 Static HTML (SSG)  │       │ • B10cks CMS (Laravel Core)  │
│ • React Client Islands       │       │ • MySQL Database             │
│ • GSAP & Lenis Smooth Scroll │       │ • Brevo Email Integration    │
│ • Interactive WebGL Globe    │       │ • Deterministic Estimator    │
│ • Edge CDN Global Caching    │       │ • Local Storage for Media    │
└──────────────────────────────┘       └──────────────────────────────┘
```

---

## 2. Deploy Frontend ke Cloudflare Pages

Frontend ALTIA DEV dibangun menggunakan Astro Static Site Generation (SSG). Hasil build adalah pure static assets HTML/CSS/JS yang dapat dihosting secara gratis dengan performa global super cepat di Cloudflare Pages.

### Langkah 1: Hubungkan Repository ke Cloudflare
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) & login.
2. Pada menu navigasi sebelah kiri, pilih **Compute (Workers & Pages)** &rarr; **Pages**.
3. Klik tombol **Connect to Git** (Hubungkan ke akun GitHub Anda).
4. Pilih repository `fredogemilang/altia.dev` (atau pilih cabang `main` / `master`).

### Langkah 2: Konfigurasi Build Settings
Isi pengaturan build sebagai berikut:
- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: `20` (atau lebih baru)

### Langkah 3: Tambahkan Environment Variables di Cloudflare Pages
Pada tab **Environment variables (Advanced)**, tambahkan variabel berikut:

| Variable Name | Production Value | Keterangan |
|---|---|---|
| `PUBLIC_API_URL` | `https://serv.altiadev.com` | URL API Backend Laravel |
| `B10CKS_API_URL` | `https://serv.altiadev.com` | Endpoint REST Data API |
| `NODE_VERSION` | `20` | Versi Node.js runtime build |

### Langkah 4: Simpan & Deploy
Klik **Save and Deploy**. Cloudflare Pages akan menjalankan build dan memberikan live URL (misal: `altia-dev.pages.dev`).

### Langkah 5: Custom Domain (Opsional)
1. Di tab **Custom domains** pada project Pages Anda, klik **Set up a custom domain**.
2. Masukkan `altiadev.com` dan `www.altiadev.com`.
3. Cloudflare akan otomatis mengkonfigurasi DNS dan SSL Certificate secara instan.

---

## 3. Deploy Backend ke cPanel Shared Hosting

Backend bertempat di subdomain `serv.altiadev.com` pada shared hosting cPanel.

### Langkah 1: Persiapan Subdomain & Database di cPanel
1. Login ke **cPanel** hosting Anda.
2. **Buat Subdomain**:
   - Buka menu **Domains** / **Subdomains**.
   - Buat subdomain: `serv` (sehingga menjadi `serv.altiadev.com`).
   - Tentukan document root: misal `public_html/serv.altiadev.com/public` (atau `serv/public`).
3. **Buat Database MySQL**:
   - Buka menu **MySQL® Database Wizard**.
   - Buat nama database (contoh: `u123456_altiacms`).
   - Buat user database & password yang kuat.
   - Berikan hak akses **ALL PRIVILEGES** kepada user database tersebut.

### Langkah 2: Upload File Backend
1. Unduh atau clone repository project.
2. Salin isi folder `backend-cpanel/` atau project Laravel B10cks yang sudah terpasang dependensi `vendor/` lokal.
3. Buka **cPanel File Manager**, upload file ke folder subdomain Anda:
   - File direktori aplikasi Laravel (`app/`, `config/`, `routes/`, `storage/`, `vendor/`, dll.) diletakkan di folder root subdomain.
   - File public (`index.php`, `.htaccess`, `cpanel_symlink_helper.php`, aset web) berada di folder `public/`.

### Langkah 3: Konfigurasi File `.env`
Di File Manager cPanel, buat/edit file `.env` di direktori utama backend:

```ini
APP_NAME="ALTIA DEV Backend"
APP_ENV=production
APP_KEY=base64:GENERATE_VIA_LOCAL_ARTISAN
APP_DEBUG=false
APP_URL=https://serv.altiadev.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456_altiacms
DB_USERNAME=u123456_altiauser
DB_PASSWORD=PasswordDatabaseAndaDiSini

# Brevo (Sendinblue) Transactional Email
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_SENDER_EMAIL=hello@altiadev.com
BREVO_SENDER_NAME="ALTIA DEV Inquiries"
CONTACT_RECEIVER_EMAIL=hello@altiadev.com

# CORS Allowed Origins
CORS_ALLOWED_ORIGINS="https://altiadev.com,https://www.altiadev.com,https://altia-dev.pages.dev"
```

### Langkah 4: Buat Symlink Storage (1-Klik via Browser)
Karena shared hosting cPanel umumnya tidak menyediakan akses SSH terminal / artisan command:
1. Buka browser dan akses URL:
   ```
   https://serv.altiadev.com/cpanel_symlink_helper.php
   ```
2. Anda akan melihat pesan: `"Storage symlink successfully created!"`.
3. **PENTING**: Hapus file `cpanel_symlink_helper.php` dari cPanel File Manager setelah dijalankan demi keamanan.

### Langkah 5: Pasang Custom Controllers & Routes
Pastikan file berikut sudah berada di direktori backend:
- `app/Http/Controllers/ContactController.php` (Pengiriman email kontak via Brevo)
- `app/Http/Controllers/EstimatorController.php` (Kalkulasi estimasi biaya dan lead scoring)
- `routes/api.php` (Route endpoint `/api/contact`, `/api/estimator/estimate`, `/api/estimator/lead`)

---

## 4. Konfigurasi Environment Variables

### Frontend (.env)
```ini
PUBLIC_API_URL=https://serv.altiadev.com
B10CKS_API_URL=https://serv.altiadev.com
```

### Backend (.env)
```ini
APP_URL=https://serv.altiadev.com
DB_DATABASE=nama_database_cpanel
DB_USERNAME=nama_user_cpanel
DB_PASSWORD=password_user_cpanel
BREVO_API_KEY=api_key_dari_brevo
CONTACT_RECEIVER_EMAIL=email_tujuan@domain.com
```

---

## 5. Pengujian & Verifikasi

Setelah kedua layanan live:

1. **Test Frontend**: Buka `https://altiadev.com` dan pastikan:
   - Navigasi halaman cepat tanpa reload (Astro routing).
   - Animasi GSAP, Lenis Smooth Scroll, dan 3D Globe berjalan halus 60 FPS.
   - Toggle bahasa Inggris (`/`) dan Indonesia (`/id`) berfungsi normal.
2. **Test Contact Form**:
   - Kirim pesan uji coba dari halaman `/contact`.
   - Periksa inbox email tujuan penerima (Brevo).
3. **Test Cost Estimator**:
   - Jalankan wizard 5 langkah di `/estimator`.
   - Submit form kontak & WhatsApp, verifikasi estimasi biaya dan timeline terhitung dengan akurat.
