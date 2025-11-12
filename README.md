# Guru Digi AI - Asisten Guru AI

## Pendahuluan
Asisten Guru AI adalah aplikasi web full-stack yang dirancang untuk membantu para guru dalam tugas-tugas administratif dan kreatif. Aplikasi ini menyediakan berbagai generator berbasis AI untuk membuat modul ajar, LKPD, bank soal (termasuk upload gambar), rubrik penilaian, dan banyak lagi.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **AI**: Google Gemini
- **Platform Deploy**: Vercel

## Struktur Folder Proyek
```bash
GURU-DIGI-AI/                           (Folder Root)
├── client/                             (Frontend React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── components/
│   │   │   ├── ModulAjarForm.jsx
│   │   │   ├── LkpdForm.jsx
│   │   │   └── ... (semua komponen form)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── store/
│   │   │   ├── authSlice.js
│   │   │   └── generatorSlice.js
│   │   ├── firebase.config.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── 
│   ├── package.json
│   └── vite.config.js
│
├── api/                                 (Backend Node.js + Express)
│   ├── controllers/
│   │   ├── auth.js
│   │   └── generator.js
│   ├── .env                             (Gemini API key + password statik untuk login)
│   ├── index.js                         (File server utama)
│   └── package.json
│
├── .gitignore                           (Untuk mengabaikan semua file .env dan file lain yang tidak perlu di push ke repo)
├── package.json                         (Hanya untuk script 'concurrently')
└── vercel.json                          (Vercel file untuk setup)
```

## Prerequisite (Prasyarat)
1. Node.js (v20 atau lebih baru).
2. Akun GitHub (atau GitLab/Bitbucket) untuk menyimpan kode dari folder projek.
3. Akun Vercel (bisa login dengan GitHub).
4. Kunci API Google Gemini (dari [Google AI Studio](https://aistudio.google.com/)).
5. Proyek Firebase (dibuat di [Firebase Console](https://console.firebase.google.com/)) dengan Authentication (Google) diaktifkan. (Jika ingin mengaktifkan fitur login dengan google)

## Setup untuk Lokal Environment (Development)
### Kloning/Donwload & Instalasi Awal
1. Kloning repositori dari GitHub.
2. Instal `concurrently` di folder root (GURU-DIGI-AI/):
```bash
npm install concurrently
```
3. Cek isi file `package.json` yang ada di folder root.

### Konfigurasi Backend (`api/`)
1. Masuk ke folder `api`:
```bash
cd api
```
2. Instal dependensi backend:
```bash
npm install
```
3. Buat file `.env` di dalam folder api:
```bash
GEMINI_API_KEY=AIzaSy...
STATIC_PASSWORD=password-statis-yang-kamu-inginkan
```

### Konfigurasi Frontend (`client/`)
1. Masuk ke folder client (dari root):
```bash
cd client
```
2. Instal dependensi frontend:
```bash
npm install
```
3. Setup file `client/vite.config.js` seperti berikut:
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

```

### Menjalankan di Lokal Environment
1. Kembali ke folder root (`GURU-DIGI-AI/`).
2. Jalankan perintah berikut:
```bash
npm start
```
3. `concurrently` akan menjalankan dua server:
   - Backend di `http://localhost:5000`
   - Frontend di `http://localhost:5173`
4. Buka `http://localhost:5173` di browser app (misal: google chrome).
5. Saat kita login atau generate, proxy Vite akan meneruskan panggilan /api ke `localhost:5000` secara otomatis.

## Proses Deploy ke Vercel (Production)
### Persiapan Kode
1. Buka File `vercel.json` yang ada di folder root:
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```
### Proses Deploy di Vercel
1. Push seluruh kode (termasuk vercel.json dan folder api & client) ke repositori GitHub.
2. Masuk ke website vercel (vercel.com), kemudian masuk ke dashboard vercel.
3. Klik **"Add New... > Project"**.
4. Pilih repositori GitHub yang ingin di deploy, lalu klik "import".
5. Vercel akan otomatis mendeteksi folder projek kita di github repository sebagai Root Directory.
6. Untuk Root directory, biarkan default: `./`
7. Untuk build and output settings:
   - Build Command: Kosong saja (sudah di handle di vercel.json)
   - Output Directory: Kosong saja (sudah di handle di vercel.json)
8. Untuk Environment Variables, isi dengan variabel yang ada di file `.env`
9. Lalu klik "Deploy"
10. Tunggu sebentar, vercel akan secara otomatis men-deploy projek tersebut ke internet. Kemudian akan muncul link URL dari domain web app tersebut (contoh: `guru-digi-ai.vercel.app`).
<img width="1907" height="2310" alt="image" src="https://github.com/user-attachments/assets/f626879d-2ae6-4f67-8415-bc13cb215baa" />

### Konfigurasi Firebase (Jika menggunakan login dengan google)
1. Setelah deploy berhasil, salin domain baru Anda (misal: guru-digi-ai.vercel.app).
2. Buka Firebase Console > Authentication > Settings > Authorized domains.
3. Klik "Add domain".
4. Tempel domain Vercel Anda: `guru-digi-ai.vercel.app`
5. Klik "Add".

## Screenshot Web App
- Login Page
<img width="1912" height="961" alt="image" src="https://github.com/user-attachments/assets/ed38b079-9b9e-4644-8625-b2e2d18db193" />

- Dashboard Page
<img width="1920" height="1301" alt="image" src="https://github.com/user-attachments/assets/0abbfbf9-1040-462d-a3ca-6af2ee454627" />

