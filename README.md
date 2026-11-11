# TEMANPORSI

Website prototipe TEMANPORSI dengan Next.js App Router. Keranjang disimpan di browser; checkout hanya simulasi dan tidak menerima pesanan atau pembayaran.

## Menjalankan lokal

Gunakan Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Periksa build produksi dengan `npm run build`, lalu jalankan dengan `npm start`.

## Deploy ke Vercel

Impor repositori proyek di Vercel. Vercel akan mendeteksi Next.js secara otomatis; gunakan perintah build `npm run build` dan jangan memilih output folder statis.

Rute situs: `/`, `/menu`, `/jadwal`, `/langganan`, `/perbandingan`, dan `/testimoni`.
