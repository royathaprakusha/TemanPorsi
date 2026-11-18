import { AREA, SLOT } from "../../lib/shipping";

export const metadata = { title: "Info Pengantaran | TEMANPORSI" };

export default function Antar() {
  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: 20, lineHeight: 1.6 }}>
      <h1>Info pengantaran</h1>

      <h2>Area antar</h2>
      <ul>{AREA.map((a) => <li key={a}>{a}</li>)}</ul>
      <p>Di luar area ini belum dilayani.</p>

      <h2>Tujuan antar dan ongkir</h2>
      <ul>
        <li><strong>Titik temu: gratis.</strong> Lokasi titik temu diinfokan admin setelah pesanan dikonfirmasi.</li>
        <li><strong>Pintu kos: +Rp2.000.</strong> Tulis alamat kos selengkap mungkin dan patokannya.</li>
      </ul>

      <h2>Jam antar</h2>
      <ul>
        {Object.entries(SLOT).map(([n, j]) => <li key={n}>{n}: {j.replace("-", " sampai ")} WIB</li>)}
      </ul>
      <p>Jam antar bisa berubah mengikuti kesiapan dapur dan jumlah pesanan. Admin akan mengabari lewat WhatsApp kalau ada perubahan.</p>

      <h2>Batas waktu pesan</h2>
      <p>Pesan paling lambat <strong>H-1 pukul 20.00 WIB</strong> untuk pengantaran besok.</p>

      <h2>Paket dan diskon</h2>
      <p>Diskon per porsi mengikuti paket yang kamu pilih di halaman <a href="/langganan">Paket</a>.</p>

      <h2>Cara pesan</h2>
      <ol>
        <li>Pilih menu atau paket, masukkan ke keranjang.</li>
        <li>Di checkout, isi tanggal, jam, area, dan tujuan antar.</li>
        <li>Kirim pesanan, kamu mendapat kode pesanan.</li>
        <li>Konfirmasi lewat WhatsApp dan selesaikan pembayaran.</li>
        <li>Pantau status di halaman <a href="/cek">Cek Pesanan</a>.</li>
      </ol>
    </main>
  );
}