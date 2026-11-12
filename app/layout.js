import "./globals.css";
import SiteFrame from "../components/site-frame";

export const metadata = {
  title: "TEMANPORSI | Makan siang untuk sela kuliah",
  description: "Konsep layanan katering makan siang untuk mahasiswa.",
  other: {
    "page-type": "service",
    "site-kind": "other"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-type="service">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
