
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="book-spread hero-spread"
        aria-labelledby="home-title"
      >
        <div className="spread-page spread-copy">
          <div>
            <h1 id="home-title">
              Makan enak, tetap hemat di sela kuliah.
            </h1>

            <p>
              Temukan pilihan makanan praktis untuk menemani
              aktivitas kuliahmu. Pilih menu dan atur waktu
              pengantaran sesuai kebutuhan.
            </p>

            <div className="hero-actions">
              <Link className="btn" href="/menu" prefetch={false}>
                Lihat menu
              </Link>

              <Link
                className="btn btn-secondary"
                href="/jadwal"
                prefetch={false}
              >
                Atur waktu antar
              </Link>
            </div>
          </div>
        </div>

        <div className="spread-page hero-menu-page">
          <img
            className="spread-photo"
            src="/assets/images/meal-rice.jpg"
            alt="Hidangan nasi dan lauk"
            width="1400"
            height="1000"
            fetchPriority="high"
          />

          <div className="hero-menu">
            <p className="hero-menu-label">Menu pilihan</p>

            <ul className="hero-menu-list">
              <li>
                <span>Nasi ayam panggang</span>
                <span>Ayam</span>
              </li>
              <li>
                <span>Gado-gado komplit</span>
                <span>Sayur</span>
              </li>
              <li>
                <span>Nasi tempe orek dan telur</span>
                <span>Telur</span>
              </li>
            </ul>

            <Link
              className="text-link"
              href="/menu"
              prefetch={false}
            >
              Lihat semua menu
            </Link>
          </div>
        </div>
      </section>

      {/* CARA PEMESANAN */}
      <section
        className="page-section home-flow"
        aria-labelledby="steps-title"
      >
        <h2 id="steps-title">
          Pesan makanan jadi lebih praktis.
        </h2>

        <p>
          Hanya dengan beberapa langkah, makanan pilihanmu
          siap dipesan.
        </p>

        <dl className="data-list">
          <div className="data-row">
            <dt>01. Pilih menu favoritmu</dt>
            <dd>
              Jelajahi berbagai pilihan makanan dan tentukan
              menu yang ingin kamu nikmati.
            </dd>
          </div>

          <div className="data-row">
            <dt>02. Atur waktu pengantaran</dt>
            <dd>
              Tentukan jadwal pengantaran agar pesananmu
              sesuai dengan waktu yang kamu butuhkan.
            </dd>
          </div>

          <div className="data-row">
            <dt>03. Periksa pesananmu</dt>
            <dd>
              Cek kembali pilihan makanan dan jumlah pesanan
              melalui keranjang sebelum melanjutkan.
            </dd>
          </div>
        </dl>
      </section>

      {/* KEUNGGULAN TEMANPORSI */}
      <section
        className="page-section home-flow"
        aria-labelledby="benefit-title"
      >
        <h2 id="benefit-title">
          Teman makan, teman berhemat.
        </h2>

        <p>
          TemanPorsi hadir untuk membantu mahasiswa menikmati
          makanan dengan cara yang lebih praktis.
        </p>

        <dl className="data-list">
          <div className="data-row">
            <dt>Pilihan makanan beragam</dt>
            <dd>
              Temukan berbagai pilihan menu untuk menemani
              aktivitasmu sehari-hari.
            </dd>
          </div>

          <div className="data-row">
            <dt>Lebih praktis</dt>
            <dd>
              Pilih makanan dan atur jadwal pengantaran
              melalui satu platform.
            </dd>
          </div>

          <div className="data-row">
            <dt>Informasi transparan</dt>
            <dd>
              Kenali informasi menu dan harga sebelum
              menentukan pesanan.
            </dd>
          </div>
        </dl>

        <div className="hero-actions">
          <Link className="btn" href="/menu" prefetch={false}>
            Mulai pilih menu
          </Link>
        </div>
      </section>
    </>
  );
}
