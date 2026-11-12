import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | TEMANPORSI",
  description:
    "Kenali TEMANPORSI, teman makan praktis dan hemat untuk mahasiswa."
};

export default function AboutPage() {
  return (
    <>
      {/* INTRO */}
      <header className="page-intro">
        <p className="hero-menu-label">TENTANG TEMANPORSI</p>

        <h1>
          Teman makan, teman berhemat.
        </h1>

        <p>
          TEMANPORSI hadir sebagai platform pemesanan makanan
          yang membantu mahasiswa menikmati makanan praktis
          dengan harga yang lebih ramah di kantong.
        </p>
      </header>

      {/* OUR STORY */}
      <section className="page-section home-flow">
        <h2>Berawal dari kebutuhan sederhana.</h2>

        <p>
          Kesibukan kuliah sering membuat mahasiswa harus
          mencari cara praktis untuk memenuhi kebutuhan makan
          sehari-hari. Di sisi lain, memilih makanan yang
          sesuai dengan budget juga menjadi pertimbangan.
        </p>

        <p>
          Dari kebutuhan tersebut, TEMANPORSI hadir untuk
          memberikan alternatif pemesanan makanan yang
          praktis, mudah diakses, dan sesuai dengan kebutuhan
          mahasiswa.
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="page-section home-flow">
        <h2>Apa yang bisa kamu temukan?</h2>

        <dl className="data-list">
          <div className="data-row">
            <dt>Pilihan menu makanan</dt>
            <dd>
              Temukan berbagai pilihan makanan untuk menemani
              aktivitas kuliah dan keseharianmu.
            </dd>
          </div>

          <div className="data-row">
            <dt>Paket makanan hemat</dt>
            <dd>
              Pilihan paket makanan yang dirancang untuk
              membantu mahasiswa menyesuaikan pengeluaran.
            </dd>
          </div>

          <div className="data-row">
            <dt>Pengaturan jadwal</dt>
            <dd>
              Atur waktu pengantaran sesuai pilihan jadwal
              yang tersedia.
            </dd>
          </div>
        </dl>
      </section>

      {/* OUR COMMITMENT */}
      <section className="page-section home-flow">
        <h2>Komitmen TEMANPORSI.</h2>

        <p>
          Kami ingin menghadirkan pengalaman pemesanan
          makanan yang sederhana dan nyaman bagi mahasiswa.
          Mulai dari informasi menu, harga, hingga pengaturan
          pengantaran, semuanya dibuat agar lebih mudah
          dipahami.
        </p>

        <div className="hero-actions">
          <Link className="btn" href="/menu" prefetch={false}>
            Jelajahi menu
          </Link>

          <Link
            className="btn btn-secondary"
            href="/perbandingan"
            prefetch={false}
          >
            Info pemesanan
          </Link>
        </div>
      </section>
    </>
  );
}
