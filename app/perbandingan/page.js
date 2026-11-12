
import Link from "next/link";

export const metadata = {
  title: "Info Pemesanan | TEMANPORSI",
  description:
    "Informasi harga makanan, biaya pengantaran, dan detail layanan TEMANPORSI."
};

export default function TransparencyPage() {
  return (
    <>
      {/* HEADER */}
      <section
        className="book-spread transparency-spread"
        aria-labelledby="transparency-title"
      >
        <div className="spread-page spread-copy">
          <div>
            <h1 id="transparency-title">
              Pesan makanan tanpa bingung soal biaya.
            </h1>

            <p>
              Kenali harga makanan dan informasi pengantaran
              sebelum kamu menentukan pesanan.
            </p>

            <div className="hero-actions">
              <Link
                className="btn"
                href="/menu"
                prefetch={false}
              >
                Lihat menu
              </Link>

              <Link
                className="btn btn-secondary"
                href="/jadwal"
                prefetch={false}
              >
                Atur jadwal
              </Link>
            </div>
          </div>
        </div>

        <div className="spread-page schedule-panel">
          <h2>Informasi harga</h2>

          <dl className="data-list">
            <div className="data-row">
              <dt>Harga makanan</dt>
              <dd>
                Rp10.000–Rp15.000 per porsi,
                tergantung pilihan menu.
              </dd>
            </div>

            <div className="data-row">
              <dt>Pengantaran ke titik temu</dt>
              <dd>
                Gratis.
              </dd>
            </div>

            <div className="data-row">
              <dt>Pengantaran ke pintu kos</dt>
              <dd>
                Tambahan biaya Rp2.000.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* DETAIL LAYANAN */}
      <section
        className="page-section home-flow"
        aria-labelledby="service-title"
      >
        <h2 id="service-title">
          Sebelum kamu memesan.
        </h2>

        <p>
          Beberapa informasi yang perlu kamu ketahui
          sebelum menikmati menu TEMANPORSI.
        </p>

        <dl className="data-list">
          <div className="data-row">
            <dt>Porsi makanan</dt>
            <dd>
              Setiap porsi dirancang dengan perkiraan
              nasi sekitar 150 gram, lauk 80–100 gram,
              dan sayur 50–80 gram.
            </dd>
          </div>

          <div className="data-row">
            <dt>Informasi gizi</dt>
            <dd>
              Estimasi nilai gizi mengacu pada Tabel
              Komposisi Pangan Indonesia (TKPI), bukan
              hasil pengujian laboratorium.
            </dd>
          </div>

          <div className="data-row">
            <dt>Informasi pesanan</dt>
            <dd>
              Periksa kembali pilihan menu, jumlah
              pesanan, dan jadwal pengantaran sebelum
              melanjutkan pemesanan.
            </dd>
          </div>
        </dl>

        <div className="hero-actions">
          <Link
            className="btn"
            href="/menu"
            prefetch={false}
          >
            Pilih makanan sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
