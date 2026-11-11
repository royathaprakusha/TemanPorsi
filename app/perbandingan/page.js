import Link from "next/link";

export const metadata = {
  title: "Transparansi | TEMANPORSI",
  description: "Informasi harga dan rincian yang tersedia untuk konsep TEMANPORSI."
};

export default function TransparencyPage() {
  return (
    <>
      <section className="book-spread transparency-spread" aria-labelledby="transparency-title">
        <div className="spread-page spread-copy">
          <div>
            <h1 id="transparency-title">Harga dan rincian layanan.</h1>
            <p>Harga di bawah berlaku untuk semua menu TEMANPORSI.</p>
          </div>
          <p className="page-end">Perbandingan harga belum dapat dibuat.</p>
        </div>
        <div className="spread-page schedule-panel">
          <h2>Rincian layanan</h2>
          <dl className="data-list">
            <div className="data-row"><dt>Harga menu</dt><dd>Rp10.000 sampai Rp15.000 per porsi, tergantung menu.</dd></div>
            <div className="data-row"><dt>Biaya antar</dt><dd>Gratis ke titik temu. Antar ke pintu kos tambah Rp2.000.</dd></div>
            <div className="data-row"><dt>Nilai gizi</dt><dd>Estimasi dari TKPI, bukan hasil uji laboratorium. Angka per menu menyusul.</dd></div>
            <div className="data-row"><dt>Target porsi</dt><dd>Nasi sekitar 150 g, lauk sekitar 80 sampai 100 g, sayur sekitar 50 sampai 80 g.</dd></div>
          </dl>
        </div>
      </section>
      <section className="page-section home-flow" aria-labelledby="price-survey-title">
        <h2 id="price-survey-title">Kisaran pilihan responden.</h2>
        <p>Dari 26 responden survei konsep Google Form, 15 memilih kisaran Rp10.000 hingga Rp15.000 per porsi sebagai harga terjangkau.</p>
        <p><Link className="text-link" href="/menu" prefetch={false}>Lihat menu</Link></p>
      </section>
    </>
  );
}
