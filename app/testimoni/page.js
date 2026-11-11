export const metadata = {
  title: "Suara responden survei | TEMANPORSI",
  description: "Kutipan mahasiswa dari survei tentang konsep TEMANPORSI."
};

const quotes = [
  "Porsinya, kelengkapan gizi, dan harga terjangkau terutama buat anak kos.",
  "Kesesuaian deskripsi dan foto makanan dengan yang aslinya, layanan antar yang tepat waktu, menu makanan yang variatif dan gak boring.",
  "Saya berharap budget 10 sampai 15 ribu sudah termasuk ongkir."
];

export default function SurveyPage() {
  return (
    <>
      <header className="page-intro">
        <h1>Suara mahasiswa dari survei kami.</h1>
        <p>Kutipan dari 26 mahasiswa yang mengisi survei tentang konsep TEMANPORSI. Ini masukan terhadap konsep, bukan ulasan layanan, karena layanan belum berjalan.</p>
      </header>
      <section className="page-section quote-list" aria-label="Kutipan survei konsep">
        {quotes.map((quote) => (
          <article className="quote-row" key={quote}>
            <blockquote>{quote}</blockquote>
            <p className="quote-author">Responden survei, mahasiswa</p>
          </article>
        ))}
      </section>
      <p className="page-section">Dikutip anonim dari survei Google Form, 26 responden.</p>
    </>
  );
}
