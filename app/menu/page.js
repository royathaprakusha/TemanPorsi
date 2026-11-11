import { MenuList } from "../../components/cart-provider";

export const metadata = {
  title: "Menu | TEMANPORSI",
  description: "Lihat empat pilihan menu makan siang TEMANPORSI beserta harganya."
};

export default function MenuPage() {
  return (
    <>
      <header className="page-intro">
        <h1>Menu makan siang.</h1>
        <p>Empat menu makan siang dengan harga tetap.</p>
      </header>
      <section className="page-section" aria-label="Daftar menu">
        <MenuList />
      </section>
    </>
  );
}
