import { PackageChooser } from "../../components/cart-provider";

export const metadata = {
  title: "Paket makan | TEMANPORSI",
  description: "Lihat pilihan paket makan dan diskon TEMANPORSI."
};

export default function SubscriptionPage() {
  return (
    <>
      <header className="page-intro">
        <h1>Pola makan, pilih sendiri.</h1>
        <p>Paket hemat untuk yang makan rutin. Diskon dihitung per porsi dari harga menu.</p>
      </header>
      <PackageChooser />
    </>
  );
}
