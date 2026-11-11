import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="book-spread hero-spread" aria-labelledby="home-title">
        <div className="spread-page spread-copy">
          <div>
            <h1 id="home-title">Makan siang di sela kuliah.</h1>
            <p>Pilih menu, lalu atur waktu antar.</p>
            <div className="hero-actions">
              <Link className="btn" href="/menu" prefetch={false}>Lihat menu</Link>
              <Link className="btn btn-secondary" href="/jadwal" prefetch={false}>Atur waktu antar</Link>
            </div>
          </div>
        </div>
        <div className="spread-page hero-menu-page">
          <img
            className="spread-photo"
            src="/assets/images/meal-rice.jpg"
            alt="Hidangan nasi dan lauk, foto makanan stand-in"
            width="1400"
            height="1000"
            fetchPriority="high"
          />
          <div className="hero-menu">
            <p className="hero-menu-label">Menu kami</p>
            <ul className="hero-menu-list">
              <li><span>Nasi ayam panggang</span><span>Ayam</span></li>
              <li><span>Gado-gado komplit</span><span>Sayur</span></li>
              <li><span>Nasi tempe orek dan telur</span><span>Telur</span></li>
            </ul>
            <Link className="text-link" href="/menu" prefetch={false}>Lihat semua menu</Link>
          </div>
        </div>
      </section>
      <section className="page-section home-flow" aria-labelledby="survey-title">
        <h2 id="survey-title">Kendala makan mahasiswa.</h2>
        <p>Survei Google Form, 26 responden:</p>
        <dl className="data-list">
          <div className="data-row"><dt>Waktu memasak</dt><dd>16 dari 26 mahasiswa yang disurvei menyebut tidak punya waktu untuk memasak.</dd></div>
          <div className="data-row"><dt>Harga makanan bergizi</dt><dd>14 dari 26 menyebut harganya terasa mahal.</dd></div>
          <div className="data-row"><dt>Makanan cepat saji</dt><dd>10 dari 26 memilihnya saat waktu atau budget terbatas.</dd></div>
        </dl>
      </section>
    </>
  );
}
